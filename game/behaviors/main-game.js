var MainGameBehavior = (function() {
	function gridToWorld(gridPos, tileSize, offset) {
		return [
			offset,
			Vector.make(gridPos.x * tileSize.x, gridPos.y * tileSize.y),
			Vector.mul(tileSize, 0.5)
		].reduce(Vector.add);
	}

	function getRenderList(world, time) {
		var result = [
			{ renderScript: { name: 'background', textures: ['grass'] } }
		].concat([
			world.entities.castle.with('renderScript', { name: 'castle', textures: ['castle'] })
		]).concat(world.entities.launchPads.map(function(launchPad) {
			return launchPad.with('renderScript', 'launch-pad');
		})).concat(world.entities.towers.map(function(tower) {
			return tower.with('renderScript', 'tower');
		})).concat(Object.keys(world.entities.monsters).map(function(id) {
			return world.entities.monsters[id].with('renderScript', 'monster');
		})).concat(world.entities.towers.map(function(tower) {
			return tower.with('renderScript', 'radar');
		})).concat([
			world.entities.monsterBlueprint.merge({
				renderScript: { name: 'monster', method: 'blueprint' },
				cooloff: (time - world.lastMonsterTime) / MONSTER_COOLOFF
			})
		]).concat(world.entities.projectiles.map(function(projectile) {
			return projectile.with('renderScript', 'projectile');
		}));

		return result;
	}

	function draw(world, context, time) {
		Renderer.draw(context, world.assets, getRenderList(world, time), time);
	}

	function inRange(pos, range) {
		return function(entity) {
			return (Point.dist(pos, entity.pos) <= range);
		};
	}

	function moveProjectile(projectile, monsters, deltaTime) {
		var pos = projectile.pos;
		var targetId = projectile.target;
		var target = monsters[targetId];

		if (!target) {
			return { disappear: true };
		}

		var delta = Vector.sub(target.pos, pos);
		var l = Vector.length(delta);
		if (l <= PROJECTILE_SPEED * deltaTime) {
			return { hit: targetId };
		}

		var dir = Vector.mul(delta, 1.0 / l);

		return { move: Vector.add(pos, Vector.mul(dir, PROJECTILE_SPEED * deltaTime)) };
	}

	function update(world, deltaTime, time) {
		var castlePos = world.entities.castle;

		var monsters = world.entities.monsters.map(function(monster) {
			var dir = Vector.normalize(Vector.sub(castlePos, monster.pos));
			var pos = Vector.add(monster.pos, Vector.mul(dir, MONSTER_SPEED * deltaTime));
			return monster.merge({
				pos: pos,
				dir: dir
			});
		});

		var towers = world.entities.towers.map(function(tower) {
			var testInRange = inRange(tower.pos, tower.range);

			var targets = tower.targets.filter(function(targetId) {
				var monster = monsters[targetId];
				return monster && testInRange(monster);
			});
			var targetMap = {};
			targets.forEach(function(targetId) { targetMap[targetId] = true; });

			var nonTargets = monsters.filter(function(monster, id) {
				return !(id in targetMap);
			});
			var newTargets = Object.keys(nonTargets.filter(testInRange));

			targets = targets.concat(newTargets);

			var dir = tower.dir;
			var shot = tower.shot;
			if (targets.length > 0) {
				var target = monsters[targets[0]];
				toTarget = Vector.sub(target.pos, tower.pos);
				var targetAngle = Math.atan2(toTarget.y, toTarget.x);
				var angle = Math.atan2(dir.y, dir.x);
				var deltaAngle = targetAngle - angle;

				if (deltaAngle > Math.PI) {
					deltaAngle -= 2 * Math.PI;
				}
				if (deltaAngle < -Math.PI) {
					deltaAngle += 2 * Math.PI;
				}

				if (Math.abs(deltaAngle) <= (TOWER_ANGULAR_SPEED * deltaTime)) {
					dir = Vector.normalize(toTarget);

					if ((time - shot) > tower.cooloff) {
						shot = time;
					}
				} else {
					var newAngle = angle + deltaAngle / Math.abs(deltaAngle) * TOWER_ANGULAR_SPEED * deltaTime;
					dir = { x: Math.cos(newAngle), y: Math.sin(newAngle) };
				}
			}

			return tower.merge({
				targets: targets,
				dir: dir,
				shot: shot
			});
		});

		var projectiles = world.entities.projectiles.map(function(projectile) {
			var updateResult = moveProjectile(projectile, monsters, deltaTime);
			if (updateResult.move) {
				return projectile.with('pos', updateResult.move);
			}
			return updateResult;
		});

		projectiles.forEach(function(projectile) {
			if (projectile.hit) {
				var targetId = projectile.hit;
				var target = monsters[targetId];
				if (target) {
					monsters = monsters.with(targetId, target.with('health', target.health - TOWER_POWER));
				}
			}
		});

		projectiles = projectiles.filter(function(projectile) {
			return ('target' in projectile);
		});

		towers.forEach(function(tower) {
			if (tower.shot === time) {
				var targetId = tower.targets[0];

				Sound.play('shoot');

				projectiles = projectiles.concat({
					pos: Point.clone(tower.pos),
					target: targetId
				});
			}
		});

		monsters = monsters.filter(function(monster) {
			if (monster.health <= 0) {
				Sound.play('monster_death');
				return false;
			}
			return true;
		});

		var win = monsters.some(function(monster) { return Point.dist(monster.pos, castlePos) < CASTLE_CRITICAL_DISTANCE; });

		var entities = world.entities.merge({
			monsters: monsters,
			towers: towers,
			projectiles: projectiles
		});

		return world.with('entities', entities).with('win', win ? time : undefined);
	}

	function getLaunchPadIndexBelowPoint(point, launchPads) {
		return launchPads.findIndex(function(launchPad) { return Rect.pointInside(launchPad.rect, point); });
	}

	function makeMonster(pos) {
		return {
			pos: Point.clone(pos),
			health: 1,
			seed: Math.random()
		};
	}

	function mouseDown(world, mousePos, time) {
		var monsters = world.entities.monsters;
		var nextMonsterId = world.nextMonsterId;
		var lastMonsterTime = world.lastMonsterTime;

		var launchPads = world.entities.launchPads;

		if (launchPads.length === 0) {
			monsters = world.entities.monsters.with(nextMonsterId, makeMonster(mousePos));
			nextMonsterId++;
			lastMonsterTime = time;

			Sound.play('monster');
		} else {
			var launchPadIndex = getLaunchPadIndexBelowPoint(mousePos, launchPads);
			if (launchPadIndex >= 0) {
				var launchPad = launchPads[launchPadIndex];
				if ((time - launchPad.lastMonsterTime) > launchPad.cooloff) {
					monsters = world.entities.monsters.with(nextMonsterId, makeMonster(mousePos));
					nextMonsterId++;
					lastMonsterTime = time;

					launchPads = launchPads.slice(0, launchPadIndex)
						.concat([launchPad.with('lastMonsterTime', time)])
						.concat(launchPads.slice(launchPadIndex + 1));

					Sound.play('monster');
				}
			}
		}

		return world.merge({
			entities: world.entities.merge({
				monsters: monsters,
				launchPads: launchPads
			}),
			nextMonsterId: nextMonsterId,
			lastMonsterTime: lastMonsterTime
		});
	}

	function mouseMove(world, mousePos, time) {
		var blueprint = world.entities.monsterBlueprint;
		if (getLaunchPadIndexBelowPoint(mousePos, world.entities.launchPads) >= 0) {
			blueprint = blueprint.with('pos', mousePos);
		}

		return world.with(['entities', 'monsterBlueprint'], blueprint);
	}

	function mouseUp(world, mousePos, time) {
		return world;
	}

	function nextLevel(index) {
		return (index + 1) % LEVELS.length;
	}

	function createWorld(assets, levels, index, time) {
		var desc = levels[index];

		return {
			assets: assets,
			entities: {
				towers: desc.towers.map(function(tower) {
					return tower.merge({
						shot: -100,
						targets: []
					});
				}),
				launchPads: desc.launchPads.map(function(launchPad) {
					return launchPad.merge({
						lastMonsterTime: -100
					});
				}),
				castle: desc.castle,
				monsters: {},
				projectiles: [],
				monsterBlueprint: {
					pos: Point.make(-100, -100)
				}
			},
			nextMonsterId: 0,
			lastMonsterTime: -100,
			levelIndex: index,
			startTime: time
		};
	}

	function handleGameState(world, eventType, data, time) {
		switch (eventType) {
			case 'mousedown': return mouseDown(world, data, time);
			case 'mousemove': return mouseMove(world, data, time);
			case 'mouseup': return mouseUp(world, data, time);
			case 'update': return update(world, data, time);

			case 'draw': draw(world, data, time); break;

			case 'keypress':
				// console.log(data);
				if (data.keyCode === 39) {
					return createWorld(world.assets, LEVELS, nextLevel(world.levelIndex), time);
				} else if (data.keyCode === 37) {
					return createWorld(world.assets, LEVELS, (world.levelIndex - 1 + LEVELS.length) % LEVELS.length, time);
				} else if (data.charCode === 119) {
					return world.with('win', time);
				}
				break;
		}

		return world;
	}

	return StatefulBehavior(function init(assets, levelIndex, startTime) {
		return createWorld(assets, LEVELS, levelIndex, startTime)/*.with('initial', 0)*/;
	}, function handleEvent(world, eventType, data, time) {
		var newWorld = handleGameState(world, eventType, data, time);

		return {
			state: newWorld,
			result: newWorld.win
		};
	});
})();