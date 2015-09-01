ScriptLoader.module(function() {
	var Colors = {
		TEXT: '#FFF0AA',
		OUTLINE: '#303030'
	};

	var WIN_TEXTS = {
		0: 'Nice',
		1: 'Very Good',
		2: 'Outstanding',
		3: 'Glorious',
		4: 'Perfect!'
	};

	var ANIMATION_DURATION = 0.3;

	return {
		'default': function(context, winData, time) {
			var canvas = context.canvas;
			var width = canvas.width;
			var height = canvas.height;

			var timeDelta = time - winData.winTime;
			if (timeDelta > ANIMATION_DURATION) {
				timeDelta = ANIMATION_DURATION;
			}

			context.save();
			context.translate(0.5 * width, 0.5 * height);

			var rotation = timeDelta / ANIMATION_DURATION * 4 * Math.PI;
//			context.rotate(rotation);

			var scale = timeDelta / ANIMATION_DURATION;
			context.scale(scale, scale);

			RenderUtils.drawPennant(context, Point.make(0, 0), Size.make(300, 350), BANNER_COLOR, BANNER_OUTLINE, 10, 3);

			context.font = 'normal 3em Impact';
			context.fillStyle = Colors.TEXT;
			context.strokeStyle = Colors.OUTLINE;
			context.lineWidth = OUTLINE_WIDTH;
			context.textAlign = 'center';
			context.textBaseline = 'middle';

			var text = WIN_TEXTS[winData.grade];
			context.fillText(text, 0, -10);
			context.strokeText(text, 0, -10);

			var mins = Math.floor(winData.duration / 60);
			var secs = Math.floor(winData.duration % 60);

			if (('' + mins).length === 1) {
				mins = '0' + mins;
			}
			if (('' + secs).length === 1) {
				secs = '0' + secs;
			}

			var durationText = mins + ':' + secs;
			context.fillText(durationText, 0, 50);
			context.strokeText(durationText, 0, 50);

			context.restore();
		}
	};
});