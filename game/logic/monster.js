var MonsterLogic = (function() {
	return {
		update: function(monsters, castlePos, deltaTime) {
			return monsters.map(function(monster) {
				var dir = Vector.normalize(Vector.sub(castlePos, monster.pos));
				var pos = Vector.add(monster.pos, Vector.mul(dir, MONSTER_SPEED * deltaTime));
				return monster.merge({
					pos: pos,
					dir: dir
				});
			});
		},

		hitMonsters: function(monsters, projectiles) {
			projectiles.forEach(function(projectile) {
				if (projectile.hit) {
					var targetId = projectile.hit;
					var target = monsters[targetId];
					if (target) {
						monsters = monsters.with(targetId, target.with('health', target.health - TOWER_POWER));
					}
				}
			});

			return monsters;
		},

		getAlive: function(monsters) {
			return monsters.filter(function(monster) { return (monster.health > 0);	});
		}
	};
})();