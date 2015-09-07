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
		]).concat(world.entities.sandAreas.map(function(launchPad) {
			return launchPad.with('renderScript', 'sand');
		})).concat(world.entities.launchPads.map(function(launchPad) {
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

	function update(world, deltaTime, time) {
		var castlePos = world.entities.castle;

		var monsters = MonsterLogic.update(world.entities.monsters, world.entities.sandAreas, castlePos, deltaTime);
		var towers = TowerLogic.update(world.entities.towers, monsters, deltaTime, time);
		var projectiles = ProjectileLogic.update(world.entities.projectiles, monsters, deltaTime)

		monsters = MonsterLogic.hitMonsters(monsters, projectiles);
		projectiles = ProjectileLogic.getActive(projectiles).concat(TowerLogic.getNewProjectiles(towers, time));
		monsters = MonsterLogic.getAlive(monsters);

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
				sandAreas: (desc.sand || []).map(function(sand) {
					return sand.clone();
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