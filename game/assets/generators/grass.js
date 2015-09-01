ScriptLoader.module(function() {
	var GROUND_COLOR = 'rgb(101, 153, 51)';

	var COLORS = [
		'rgb(66, 114, 19)',
		'rgba(66, 114, 19, 0)',
		'rgb(142, 191, 95)',
		'rgba(142, 191, 95, 0)'
	];

	var WIDTH = 800;
	var HEIGHT = 600;

	return function(seed) {
		var rand = new Math.seedrandom(seed);

		var canvas = document.createElement('canvas');
		canvas.width = WIDTH;
		canvas.height = HEIGHT;

		var context = canvas.getContext('2d');

		context.fillStyle = GROUND_COLOR;
		context.fillRect(0, 0, WIDTH, HEIGHT);

		var gradient = context.createRadialGradient(0, 0.5 * HEIGHT, 5, 0, 0.5 * HEIGHT, 500);
		gradient.addColorStop(0, COLORS[0]);
		gradient.addColorStop(1, COLORS[1]);

		context.fillStyle = gradient;
		context.fillRect(0, 0, WIDTH, HEIGHT);

		var gradient = context.createRadialGradient(WIDTH, HEIGHT, 5, WIDTH, HEIGHT, 500);
		gradient.addColorStop(0, COLORS[0]);
		gradient.addColorStop(1, COLORS[1]);

		context.fillStyle = gradient;
		context.fillRect(0, 0, WIDTH, HEIGHT);

		var gradient = context.createRadialGradient(WIDTH, 0, 5, WIDTH, 0, 700);
		gradient.addColorStop(0, COLORS[2]);
		gradient.addColorStop(1, COLORS[3]);

		context.fillStyle = gradient;
		context.fillRect(0, 0, WIDTH, HEIGHT);

		return canvas;
	};
});