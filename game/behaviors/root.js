var RootBehavior = (function() {
	function getScriptPath(scriptName) {
		return 'game/assets/render-scripts/' + scriptName + '.js';
	}

	function getGeneratorPath(scriptName) {
		return 'game/assets/generators/' + scriptName + '.js';
	}

	var renderScriptUrls = [
		'background',
		'castle',
		'tower',
		'monster',
		'projectile',
		'launch-pad',
		'win',
		'radar',
		'initial',
		'final'
	].map(getScriptPath);

	var textureGeneratorNames = [
		'grass',
		'castle'
	];

	var renderScriptCache = {};
	var textureGeneratorCache = {};
	var textureCache = {};

	var assets = {};

	function loadScriptCache() {
		renderScriptUrls.forEach(function(url) {
			ScriptLoader.load(url, {}, function(err, script, cache) {
				if (err) {
					return console.log(err);
				}
				Object.keys(cache).forEach(function(id) {
					renderScriptCache[id] = cache[id];
				});
			});
		});

		textureGeneratorNames.forEach(function(name) {
			var url = getGeneratorPath(name);
			ScriptLoader.load(url, {}, function(err, script, cache) {
				if (err) {
					return console.log(err);
				}
				Object.keys(cache).forEach(function(id) {
					textureGeneratorCache[id] = cache[id];
				});

				textureCache[name] = script(Math.random());
			});
		});

		assets = {
			renderScripts: renderScriptCache,
			textures: textureCache
		};
	}

	function getGrade(duration) {
		if (duration > 5 * 60) {
			return 0;
		} else if (duration > 2 * 60) {
			return 1;
		} else if (duration > 1 * 60) {
			return 2;
		} else if (duration > 30) {
			return 3;
		} else {
			return 4;
		}
	}

	function makeLevel(levelIndex, startTime, gameState) {
		return main({ index: levelIndex, startTime: startTime }, gameState || { level: true }, MainGameBehavior.init(assets, levelIndex));
	}

	function main(levelData, gameState, next) {
		return function(eventType, data, time) {
			if (gameState.initial !== undefined) {
				switch (eventType) {
					case 'draw': 
						next = next(eventType, data, time).next;
						Renderer.draw(data, assets, [{ renderScript: 'initial',	start: gameState.initial}], time);
						break;
					case 'mousedown': return main(levelData, { level: true }, next);
				}
			} else if (gameState.win !== undefined) {
				switch (eventType) {
					case 'draw':
						next = next(eventType, data, time).next;

						var renderList = [];

						if (levelData.index < LEVELS.length - 1) {
							var duration = gameState.win - levelData.startTime;

							renderList.push({
								renderScript: 'win',
								grade: getGrade(duration),
								duration: duration,
								winTime: gameState.win,
								seed: Math.random()
							});
						} else {
							renderList.push({
								renderScript: 'final',
								winTime: gameState.win
							});
						}

						Renderer.draw(data, assets, renderList, time);
						break;
					case 'mousedown':
						if (time - gameState.win > WIN_SHOW_TIME_MIN) {
							return makeLevel((levelData.index + 1) % LEVELS.length, time);
						}
						break;
					case 'update':
						if ((time - gameState.win > WIN_SHOW_TIME_MAX) && (levelData.index < LEVELS.length - 1)) {
							return makeLevel(levelData.index + 1, time);
						}
						break;
				}
			} else {
				if (eventType === 'keypress') {
					if (data.keyCode === 39) {
						return makeLevel((levelData.index + 1) % LEVELS.length, time);
					} else if (data.keyCode === 37) {
						return makeLevel((levelData.index - 1 + LEVELS.length) % LEVELS.length, time);
					} else if (data.charCode === 119) {
						Sound.play('win');
						return main(levelData, { win: time }, next);
					}
				}

				var answer = next(eventType, data, time);
				if (answer.result) {
					Sound.play('win');
					return main(levelData, { win: answer.result }, answer.next);
				}

				next = answer.next;
			}

			return main(levelData, gameState, next);
		};
	}

	return {
		init: function() {
/*			document.getElementById('btnReload').addEventListener('click', function() {
				loadScriptCache();
			}, false); */

			loadScriptCache();
			return makeLevel(LEVELS.length - 1, 0, { initial: 0 });
		}
	};
})();