ScriptLoader.module(function() {

	var Colors = {
		BODY: '#606060',
		OUTLINE: '#202020',
		ARROW: '#202020'
	};

	var RADIUS = 10;
	var ARROW_LENGTH = 20;
	var ARROW_WIDTH = 4;

	var RECOIL_DURATION = 0.5;

	return {
		'default': function(context, tower, time) {
			var pos = tower.pos;
			var dir = tower.dir;
			var range = tower.range;

			// shadow
			RenderUtils.drawCylinderShadow(context, pos, RADIUS, 7);

			// body
			context.lineWidth = OUTLINE_WIDTH;
			context.fillStyle = Colors.BODY;
			context.strokeStyle = Colors.OUTLINE;
			context.beginPath();
			context.arc(pos.x, pos.y, RADIUS, 0, 2 * Math.PI);
			context.fill();
			context.stroke();

			// arrow
			var timeFromShot = time - tower.shot;
			if (timeFromShot > RECOIL_DURATION) {
				timeFromShot = 0;
			}

			var recoil = Math.sin(timeFromShot / RECOIL_DURATION * Math.PI);

			var arrowBegin = Vector.sub(pos, Vector.mul(dir, recoil * 0.3 * ARROW_LENGTH));

			context.beginPath();
			context.strokeStyle = Colors.ARROW;
			context.lineWidth = ARROW_WIDTH;
			context.moveTo(arrowBegin.x, arrowBegin.y);
			context.lineTo(arrowBegin.x + dir.x * ARROW_LENGTH, arrowBegin.y + dir.y * ARROW_LENGTH);
			context.stroke();
		}
	};
});