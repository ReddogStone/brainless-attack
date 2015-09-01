ScriptLoader.module(function() {
	var Colors = {
		BODY: 'rgba(255, 255, 255, 0.3)',
		OUTLINE: 'rgba(60, 60, 60, 0.7)'
	};

	return {
		'default': function(context, launchPad) {
			context.lineWidth = OUTLINE_WIDTH;
			context.strokeStyle = Colors.OUTLINE;

			context.fillStyle = Colors.BODY;
			context.beginPath();
			context.rect(launchPad.x, launchPad.y, launchPad.sx, launchPad.sy);
			context.fill();
			context.stroke();
		}
	};
});