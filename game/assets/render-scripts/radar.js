ScriptLoader.module(function() {

	var Colors = {
		FILL: 'rgba(255, 240, 170, 0.15)',
		OUTLINE: '#AA9739'
	};

	var RADIUS = 10;
	var ARROW_LENGTH = 20;
	var ARROW_WIDTH = 4;

	var RECOIL_DURATION = 0.5;

	return {
		'default': function(context, tower) {
			var pos = tower.pos;
			var range = tower.range;

			context.beginPath();
			context.fillStyle = Colors.FILL;
			context.strokeStyle = Colors.OUTLINE;
			context.lineWidth = OUTLINE_WIDTH;
			context.arc(pos.x, pos.y, range, 0, 2 * Math.PI);
			context.fill();
			context.stroke();
		}
	};
});