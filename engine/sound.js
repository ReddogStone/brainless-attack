var Sound = (function(exports) {

	var DUPLICATES = 5;
	var pool = {};

	exports.init = function(sounds) {
		sounds.forEach(function(soundDesc, id) {
			pool[id] = [];
			for (var sourceIndex = 0; sourceIndex < soundDesc.sources.length; sourceIndex++) {
				var source = soundDesc.sources[sourceIndex];
				var variant = [];
				pool[id].push(variant);

				var count = soundDesc.noDuplicates ? 1 : DUPLICATES;
				for (var i = 0; i < count; i++) {
					var sound = new Audio(source.url);
					sound.volume = source.volume || soundDesc.volume;
					sound.load();

					sound.addEventListener('ended', (function(desc) {
						return function() {
							if (desc.onEnded) {
								exports.play(desc.onEnded);
							}
						};
					})(soundDesc));

					variant.push(sound);
				}
			}
		});
	};

	exports.play = function(id) {
		// console.log('Play "' + id + '"');

		var variants = pool[id];
		var variant = variants[Math.floor(Math.random() * variants.length)];

		var sound = variant.pop();
		variant.unshift(sound);

		sound.play();
	};

	exports.stopAll = function() {
		for (var id in pool) {
			pool[id].forEach(function(variants) {
				variants.forEach(function(sound) {
					sound.pause();
				});
			});
		}
	};

	return exports;
})(Sound || {});