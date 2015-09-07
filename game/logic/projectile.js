var ProjectileLogic = (function() {
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

	return {
		update: function(projectiles, monsters, deltaTime) {
			return projectiles.map(function(projectile) {
				var updateResult = moveProjectile(projectile, monsters, deltaTime);
				if (updateResult.move) {
					return projectile.with('pos', updateResult.move);
				}
				return updateResult;
			});
		},

		getActive: function(projectiles) {
			return projectiles.filter(function(projectile) { return ('target' in projectile); });
		}
	};
})();