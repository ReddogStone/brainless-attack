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
	}

	function main(next) {
		return function(eventType, data, time) {
			var result = next(eventType, data, time);
			return main(result.next);
		};
	}

	return {
		init: function() {
			loadScriptCache();

			return main(MainGameBehavior.init({
				renderScripts: renderScriptCache,
				textures: textureCache
			}, LEVELS.length - 1));
		}
	};
})();