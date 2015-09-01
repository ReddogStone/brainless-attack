ScriptLoader.module(function() {
	var Colors = {
		GRASS: '#70A060',
		CASTLE: '#606060',
		OUTLINE: '#303030'
	};

	var COLORS = [
		'rgb(64,128,32)',
		'rgba(64,128,32,0)',
		'rgb(144,176,112)',
		'rgba(144,176,112,0)'
	];

	var CASTLE_OUTER_SIZE = { x: 101, y: 101 };
	var CASTLE_WALL_SIZE = 5;
	var CASTLE_INNER_RADIUS = 20;
	var CASTLE_TOWER_RADIUS = 10;

	return function(seed) {
		var rand = new Math.seedrandom(seed);

		var width = CASTLE_OUTER_SIZE.x + 2 * CASTLE_TOWER_RADIUS - CASTLE_WALL_SIZE + OUTLINE_WIDTH;
		var height = CASTLE_OUTER_SIZE.y + 2 * CASTLE_TOWER_RADIUS - CASTLE_WALL_SIZE + OUTLINE_WIDTH;

		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		var context = canvas.getContext('2d');

		context.strokeStyle = Colors.OUTLINE;
		context.lineWidth = OUTLINE_WIDTH;

		context.save();
		context.translate(0.5 * width, 0.5 * height);

		context.save();
		context.translate(-0.5 * CASTLE_OUTER_SIZE.x, -0.5 * CASTLE_OUTER_SIZE.y);

		context.fillStyle = Colors.CASTLE;
		context.beginPath();
		context.rect(0, 0, CASTLE_OUTER_SIZE.x, CASTLE_OUTER_SIZE.y);
		context.fill();
		context.stroke();

		context.fillStyle = Colors.GRASS;
		context.beginPath();
		context.rect(CASTLE_WALL_SIZE, CASTLE_WALL_SIZE, CASTLE_OUTER_SIZE.x - 2 * CASTLE_WALL_SIZE, CASTLE_OUTER_SIZE.y - 2 * CASTLE_WALL_SIZE);
		context.fill();
		context.stroke();

		context.restore();

		context.fillStyle = Colors.CASTLE;

		context.beginPath();
		context.arc(0, 0, CASTLE_INNER_RADIUS, 0, 2 * Math.PI);
		context.fill();
		context.stroke();

		var towerX = 0.5 * (CASTLE_OUTER_SIZE.x - CASTLE_WALL_SIZE);
		var towerY = 0.5 * (CASTLE_OUTER_SIZE.y - CASTLE_WALL_SIZE);

		context.beginPath();
		context.arc(-towerX, -towerY, CASTLE_TOWER_RADIUS, 0, 2 * Math.PI);
		context.fill();
		context.stroke();

		context.beginPath();
		context.arc(towerX, -towerY, CASTLE_TOWER_RADIUS, 0, 2 * Math.PI);
		context.fill();
		context.stroke();

		context.beginPath();
		context.arc(-towerX, towerY, CASTLE_TOWER_RADIUS, 0, 2 * Math.PI);
		context.fill();
		context.stroke();

		context.beginPath();
		context.arc(towerX, towerY, CASTLE_TOWER_RADIUS, 0, 2 * Math.PI);
		context.fill();
		context.stroke();

		context.restore();

		return canvas;
	};
});