var EffectLogic = (function() {
	return {
		playSounds: function(monsters, towers, time) {
			monsters = monsters.forEach(function(monster) {
				if (monster.health <= 0) {
					Sound.play('monster_death');
				}
			});

			towers.forEach(function(tower) {
				if (tower.shot === time) {
					Sound.play('shoot');
				}
			});
		}
	};
})();