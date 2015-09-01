ScriptLoader.module(function() {

	var Colors = {
		BODY: '#707070',
		OUTLINE: '#202020'
	};

	var RADIUS = 3;

	return {
		'default': function(context, projectile) {
			var pos = projectile.pos;

			context.lineWidth = OUTLINE_WIDTH;
			context.fillStyle = Colors.BODY;
			context.strokeStyle = Colors.OUTLINE;
			context.beginPath();
			context.arc(pos.x, pos.y, RADIUS, 0, 2 * Math.PI);
			context.fill();
			context.stroke();
		}
	};
});