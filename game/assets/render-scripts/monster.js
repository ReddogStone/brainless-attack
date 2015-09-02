ScriptLoader.module(function() {

	var Colors = {
		BODY: 'brown',
		EYES: 'white',
		BODY_BLUEPRINT: 'rgba(190, 229, 153, 0.5)',
		OUTLINE: '#202020',
		HEALTH_GOOD: 'green',
		HEALTH_BAD: 'red'
	};

	var RADIUS = 10;
	var HEALTH_OFFSET = 20;
	var HEALTH_HEIGHT = 5;

	var EYE_OFFSET = 8;
	var EYE_RADIUS = 3;
	var EYE_ANGLE = 1;

	var ANIMATION_SPEED = 10;
	var ANIMATION_AMPLITUDE = 0.2;

	function drawMonster(context, monster, bodyColor, time) {
		var pos = monster.pos;
		var dir = monster.dir;
		var seed = monster.seed;

		context.lineWidth = OUTLINE_WIDTH;
		context.strokeStyle = Colors.OUTLINE;

		context.fillStyle = bodyColor;
		context.beginPath();
		context.arc(pos.x, pos.y, RADIUS, 0, 2 * Math.PI);
		context.fill();
		context.stroke();

		var eyeCount = Math.floor(seed * 3) + 1;
		var dirAngle = Math.atan2(dir.y, dir.x);

		var animOffset = Math.sin(time * ANIMATION_SPEED);

		for (var i = 0; i < eyeCount; i++) {
			var angle = (i - (eyeCount - 1) * 0.5) * EYE_ANGLE + dirAngle + animOffset * ANIMATION_AMPLITUDE;
			var currentDir = Point.make(Math.cos(angle), Math.sin(angle));
			var eyePos = Vector.add(pos, Vector.mul(currentDir, EYE_OFFSET));

			context.fillStyle = Colors.EYES;
			context.beginPath();
			context.arc(eyePos.x, eyePos.y, EYE_RADIUS, 0, 2 * Math.PI);
			context.fill();
			context.stroke();
		}
	}

	return {
		'default': function(context, monster, time) {
			var pos = monster.pos;
			var health = monster.health;

			RenderUtils.drawCircleShadow(context, pos, RADIUS, 15);
			drawMonster(context, monster, Colors.BODY, time);

			context.fillStyle = Colors.HEALTH_BAD;
			context.beginPath();
			context.rect(pos.x - RADIUS, pos.y - HEALTH_OFFSET, 2 * RADIUS, HEALTH_HEIGHT);
			context.fill();

			context.fillStyle = Colors.HEALTH_GOOD;
			context.beginPath();
			context.rect(pos.x - RADIUS, pos.y - HEALTH_OFFSET, 2 * RADIUS * health, HEALTH_HEIGHT);
			context.fill();

			context.lineWidth = OUTLINE_WIDTH;
			context.strokeStyle = Colors.OUTLINE;
			context.beginPath();
			context.rect(pos.x - RADIUS, pos.y - HEALTH_OFFSET, 2 * RADIUS, HEALTH_HEIGHT);
			context.stroke();
		},
		'blueprint': function(context, monster, time) {
			var pos = monster.pos;
			// var cooloff = monster.cooloff;

			// if (cooloff < 1) {
			// 	context.lineWidth = OUTLINE_WIDTH;
			// 	context.fillStyle = Colors.HEALTH_GOOD;
			// 	context.strokeStyle = Colors.OUTLINE;
			// 	context.beginPath();
			// 	context.arc(pos.x, pos.y, 2 * RADIUS, 0, cooloff * 2 * Math.PI);
			// 	context.lineTo(pos.x, pos.y);
			// 	context.closePath();
			// 	context.fill();
			// 	context.stroke();
			// }

			drawMonster(context, { pos: pos, dir: { x: 1, y: 0 }, seed: 0 }, Colors.BODY_BLUEPRINT, 0);
		}
	};
});