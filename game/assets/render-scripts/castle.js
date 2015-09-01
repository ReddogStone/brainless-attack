ScriptLoader.module(function() {

	var Colors = {
		CASTLE: '#606060',
		OUTLINE: '#303030'
	};

	var CASTLE_OUTER_SIZE = { x: 100, y: 100 };
	var CASTLE_WALL_SIZE = 5;
	var CASTLE_INNER_RADIUS = 20;
	var CASTLE_TOWER_RADIUS = 10;

	var INNER_MERLONS = 10;
	var CORNER_MERLONS = 4;

	function drawTower(context, pos, radius, merlons) {
		context.save();
		context.translate(pos.x, pos.y);

		context.beginPath();
		context.arc(0, 0, radius, 0, 2 * Math.PI);
		context.fill();
		context.stroke();

		for (var i = 0; i < merlons; i++) {
			var angle = (i + 0.5) / merlons * 2 * Math.PI;
			var dir = Point.make(Math.cos(angle), Math.sin(angle));
			var off = Vector.mul(dir, radius);

			context.save();
			context.translate(off.x, off.y);
			context.rotate(angle);
			context.beginPath();
			context.rect(-2, -4, 4, 8);
			context.fill();
			context.stroke();
			context.restore();
		}

		context.restore();
	}

	return {
		'default': function(context, castlePos, time, textures) {
			context.strokeStyle = Colors.OUTLINE;
			context.lineWidth = OUTLINE_WIDTH;

/*			if (textures.castle) {
				var tex = textures.castle;
				context.drawImage(tex, castlePos.x - tex.width * 0.5, castlePos.y - tex.height * 0.5);
			}
			return; */

			context.save();
			context.translate(castlePos.x, castlePos.y);

			var towerX = 0.5 * (CASTLE_OUTER_SIZE.x - CASTLE_WALL_SIZE);
			var towerY = 0.5 * (CASTLE_OUTER_SIZE.y - CASTLE_WALL_SIZE);

			// tower and wall shadows
			RenderUtils.drawCylinderShadow(context, { x: -towerX, y: towerY }, CASTLE_TOWER_RADIUS, 15);
			RenderUtils.drawCylinderShadow(context, { x: towerX, y: towerY }, CASTLE_TOWER_RADIUS, 15);
			RenderUtils.drawCylinderShadow(context, { x: -towerX, y: -towerY }, CASTLE_TOWER_RADIUS, 15);
			RenderUtils.drawCylinderShadow(context, { x: towerX, y: -towerY }, CASTLE_TOWER_RADIUS, 15);

			RenderUtils.drawRectangleShadow(context, { x: -towerX + CASTLE_TOWER_RADIUS, y: -towerY }, { x: towerX - CASTLE_TOWER_RADIUS, y: -towerY }, 15);
			RenderUtils.drawRectangleShadow(context, { x: -towerX, y: -towerY + CASTLE_TOWER_RADIUS }, { x: -towerX, y: towerY - CASTLE_TOWER_RADIUS }, 15);
			RenderUtils.drawRectangleShadow(context, { x: -towerX + CASTLE_TOWER_RADIUS, y: towerY }, { x: towerX - CASTLE_TOWER_RADIUS, y: towerY }, 15);
			RenderUtils.drawRectangleShadow(context, { x: towerX, y: -towerY + CASTLE_TOWER_RADIUS }, { x: towerX, y: towerY - CASTLE_TOWER_RADIUS }, 15);

			// inner shadow
			RenderUtils.drawCylinderShadow(context, { x: 0, y: 0 }, CASTLE_INNER_RADIUS, 15);

			context.fillStyle = Colors.CASTLE;

			// WALLS
			context.beginPath();
			context.rect(-0.5 * CASTLE_OUTER_SIZE.x, -0.5 * CASTLE_OUTER_SIZE.y, CASTLE_WALL_SIZE, CASTLE_OUTER_SIZE.y);
			context.fill();
			context.stroke();

			context.beginPath();
			context.rect(-0.5 * CASTLE_OUTER_SIZE.x, -0.5 * CASTLE_OUTER_SIZE.y, CASTLE_OUTER_SIZE.x, CASTLE_WALL_SIZE);
			context.fill();
			context.stroke();

			context.beginPath();
			context.rect(0.5 * CASTLE_OUTER_SIZE.x - CASTLE_WALL_SIZE, -0.5 * CASTLE_OUTER_SIZE.y, CASTLE_WALL_SIZE, CASTLE_OUTER_SIZE.y);
			context.fill();
			context.stroke();

			context.beginPath();
			context.rect(-0.5 * CASTLE_OUTER_SIZE.x, 0.5 * CASTLE_OUTER_SIZE.y - CASTLE_WALL_SIZE, CASTLE_OUTER_SIZE.x, CASTLE_WALL_SIZE);
			context.fill();
			context.stroke();

			// INNER TOWER
			drawTower(context, Point.make(0, 0), CASTLE_INNER_RADIUS, INNER_MERLONS);

			// CORNER TOWERS
			drawTower(context, Point.make(-towerX, towerY), CASTLE_TOWER_RADIUS, CORNER_MERLONS);
			drawTower(context, Point.make(towerX, towerY), CASTLE_TOWER_RADIUS, CORNER_MERLONS);
			drawTower(context, Point.make(-towerX, -towerY), CASTLE_TOWER_RADIUS, CORNER_MERLONS);
			drawTower(context, Point.make(towerX, -towerY), CASTLE_TOWER_RADIUS, CORNER_MERLONS);

			context.restore();
		}
	};
});