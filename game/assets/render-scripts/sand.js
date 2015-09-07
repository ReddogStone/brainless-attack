ScriptLoader.module(function() {

	var Colors = {
		BODY: '#EFDD6F',
		OUTLINE: 'rgba(239, 221, 111, 0.4)',
	};

	var SMOOTH_STRENGTH = 30;

	return {
		'default': function(context, sandArea, time) {
			var path = sandArea.path;

			context.fillStyle = Colors.BODY;
			context.strokeStyle = Colors.OUTLINE;
			context.lineWidth = OUTLINE_WIDTH;

			context.beginPath();

			var first = path.shift();
			context.moveTo(first.x, first.y);

			path.push(first);

			path = path.map(function(point, index) {
				var lastIndex = (index - 1 + path.length) % path.length;
				var nextIndex = (index + 1) % path.length;

				var last = path[lastIndex];
				var next = path[nextIndex];

				var dir = Vector.direction(last, next);

				var controlPoint1 = Vector.sub(point, Vector.mul(dir, SMOOTH_STRENGTH));
				var controlPoint2 = Vector.add(point, Vector.mul(dir, SMOOTH_STRENGTH));

				return {
					point: point,
					controlPoint1: controlPoint1,
					controlPoint2: controlPoint2
				};
			});

			path.forEach(function(current, index) {
				var last = path[(index - 1 + path.length) % path.length];

				var cp1 = last.controlPoint2;
				var cp2 = current.controlPoint1;
				var p = current.point;

				context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p.x, p.y);
			});

			context.fill();
			context.stroke();
		}
	};
});