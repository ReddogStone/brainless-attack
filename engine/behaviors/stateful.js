var StatefulBehavior = (function() {
	return function(init, handleEvent) {
		function main(world) {
			return function() {
				var newWorld = handleEvent.apply(null, [world].concat(Array.prototype.slice.call(arguments)));
				return main(newWorld);
			}
		}

		return {
			init: function() {
				var world = init.apply(null, arguments);
				return main(world);
			}
		};
	};
})();