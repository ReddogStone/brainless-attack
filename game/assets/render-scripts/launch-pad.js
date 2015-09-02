ScriptLoader.module(function() {
	var Colors = {
		BODY: 'white',
		LOADING: 'black',
		OUTLINE: 'rgba(60, 60, 60, 0.7)'
	};

	var ALPHA = 0.3;

	var backbuffer = document.createElement('canvas');

	return {
		'default': function(context, launchPad, time) {
			var rect = launchPad.rect;

			var percentage = Math.min((time - launchPad.lastMonsterTime) / launchPad.cooloff, 1.0);

			context.lineWidth = OUTLINE_WIDTH;
			context.strokeStyle = Colors.OUTLINE;

			backbuffer.width = rect.sx;
			backbuffer.height = rect.sy;
			var bc = backbuffer.getContext('2d');

			bc.globalCompositeOperation = 'source-over';
			bc.fillStyle = Colors.LOADING;
			bc.fillRect(0, 0, rect.sx, rect.sy);

			bc.globalCompositeOperation = 'source-in';
			bc.fillStyle = Colors.BODY;
			bc.beginPath();
			bc.moveTo(rect.sx * 0.5, rect.sy * 0.5);
			bc.arc(rect.sx * 0.5, rect.sy * 0.5, Math.max(rect.sx, rect.sy), 0, 2 * Math.PI * percentage);
			bc.lineTo(rect.sx * 0.5, rect.sy * 0.5);
			bc.fill();

			context.globalAlpha = ALPHA;
			context.drawImage(backbuffer, rect.x, rect.y);
			context.globalAlpha = 1;

			context.fillStyle = Colors.LOADING;
			context.beginPath();
			context.rect(rect.x, rect.y, rect.sx, rect.sy);
//			context.fill();
			context.stroke();

		}
	};
});