var TowerLogic = (function() {
	function inRange(pos, range) {
		return function(entity) {
			return (Point.dist(pos, entity.pos) <= range);
		};
	}

	return {
		update: function(towers, monsters, deltaTime, time) {
			return towers.map(function(tower) {
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
		},

		getNewProjectiles: function(towers, time) {
			var result = [];

			towers.forEach(function(tower) {
				if (tower.shot === time) {
					var targetId = tower.targets[0];

					Sound.play('shoot');

					result.push({
						pos: Point.clone(tower.pos),
						target: targetId
					});
				}
			});

			return result;
		}
	};
})();