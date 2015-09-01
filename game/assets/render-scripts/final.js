ScriptLoader.module(function() {
	var CASTLE_SIZE = Size.make(200, 150);

	var Colors = {
		CASTLE: '#606060',
		OUTLINE: '#303030'
	};

	var ANIMATION_DURATION = 1.0;

	return {
		'default': function(context, data, time) {
			var canvas = context.canvas;
			var width = canvas.width;
			var height = canvas.height;

			var timeDelta = time - data.winTime;
			if (timeDelta > ANIMATION_DURATION) {
				timeDelta = ANIMATION_DURATION;
			}

			context.save();
			context.translate(0.5 * width, 0.5 * height);

			var scale = timeDelta / ANIMATION_DURATION;
			context.scale(scale, scale);

			RenderUtils.drawPennant(context, Point.make(0, 0), Size.make(400, 550), BANNER_COLOR, BANNER_OUTLINE, 10, 3);

			context.font = 'normal 3em Impact';
			context.fillStyle = Colors.TEXT;
			context.strokeStyle = Colors.OUTLINE;
			context.lineWidth = OUTLINE_WIDTH;
			context.textAlign = 'center';
			context.textBaseline = 'middle';

			var text = 'Congratulations!';
			context.fillText(text, 0, -150);
			context.strokeText(text, 0, -150);

			var text = 'THE END';
			context.fillText(text, 0, -90);
			context.strokeText(text, 0, -90);

			context.save();
			context.translate(0, 40);

			var hsx = 0.5 * CASTLE_SIZE.x;
			var hsy = 0.5 * CASTLE_SIZE.y;

			context.fillStyle = Colors.CASTLE;
			context.strokeStyle = Colors.OUTLINE;
			context.lineWidth = 5;

			context.beginPath();
			context.moveTo(-hsx, -hsy);
			context.lineTo(-hsx, hsy);
			context.lineTo(-hsx / 3, hsy);
			context.lineTo(-hsx / 3, hsy / 3);
			context.lineTo(hsx / 3, hsy / 3);
			context.lineTo(hsx / 3, hsy);
			context.lineTo(hsx, hsy);
			context.lineTo(hsx, -hsy);

			var spikes = 4;
			var step = CASTLE_SIZE.x / (2 * spikes + 1);
			for (var i = 1; i <= spikes; i++) {
				context.lineTo(hsx - (2 * i - 1) * step, -hsy);
				context.lineTo(hsx - (2 * i - 1) * step, -hsy + CASTLE_SIZE.y / 9);
				context.lineTo(hsx - 2 * i * step, -hsy + CASTLE_SIZE.y / 9);
				context.lineTo(hsx - 2 * i * step, -hsy);
			}

			context.closePath();
			context.fill();
			context.stroke();

			context.restore();

			context.fillStyle = 'brown';
			context.strokeStyle = Colors.OUTLINE;
			context.lineWidth = 5;

			context.beginPath();
			context.arc(0, 170, 40, 0, 2 * Math.PI);
			context.fill();
			context.stroke();

			context.fillStyle = 'white';
			context.lineWidth = 2;

			context.beginPath();
			context.arc(-30, 160, 12, 0, 2 * Math.PI);
			context.fill();
			context.stroke();
			context.beginPath();
			context.arc(0, 160, 12, 0, 2 * Math.PI);
			context.fill();
			context.stroke();
			context.beginPath();
			context.arc(30, 160, 12, 0, 2 * Math.PI);
			context.fill();
			context.stroke();

			context.fillStyle = 'black';
			context.beginPath();
			context.arc(-30, 160, 5, 0, 2 * Math.PI);
			context.fill();
			context.beginPath();
			context.arc(0, 160, 5, 0, 2 * Math.PI);
			context.fill();
			context.beginPath();
			context.arc(30, 160, 5, 0, 2 * Math.PI);
			context.fill();

			context.fillStyle = 'brown';
			context.beginPath();
			context.arc(-30, 160, 12, 1.2 * Math.PI, 1.8 * Math.PI);
			context.closePath();
			context.fill();
			context.stroke();
			context.beginPath();
			context.arc(0, 160, 12, 1.2 * Math.PI, 1.8 * Math.PI);
			context.closePath();
			context.fill();
			context.stroke();
			context.beginPath();
			context.arc(30, 160, 12, 1.2 * Math.PI, 1.8 * Math.PI);
			context.closePath();
			context.fill();
			context.stroke();

			context.lineWidth = 5;

			context.beginPath();
			context.arc(0, 170, 30, 0.2 * Math.PI, 0.8 * Math.PI);
			context.stroke();	

			context.restore();
		}
	};
});