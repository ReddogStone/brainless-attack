var RenderUtils = (function() {
	function drawWithShadow(context, draw) {
		var hackyOffset = 1000;

		context.save();
		context.translate(-hackyOffset, -hackyOffset);

		context.shadowColor = SHADOW_COLOR;
		context.shadowBlur = 3;
		context.shadowOffsetX = hackyOffset;
		context.shadowOffsetY = hackyOffset;

		draw();

		context.restore();
	}

	return {
		drawCircleShadow: function(context, pos, radius, length) {
			drawWithShadow(context, function() {
				var dirX = Math.cos(SHADOW_ANGLE);
				var dirY = Math.sin(SHADOW_ANGLE);

				context.fillStyle = 'black';
				context.beginPath();
				context.arc(pos.x + length * dirX, pos.y + length * dirY, radius, 0, 2 * Math.PI);
				context.fill();
			});
		},
		drawCylinderShadow: function(context, pos, radius, length) {
			drawWithShadow(context, function() {
				var dirX = Math.cos(SHADOW_ANGLE);
				var dirY = Math.sin(SHADOW_ANGLE);

				context.fillStyle = 'black';
				context.beginPath();
				context.moveTo(pos.x + dirY * radius, pos.y - dirX * radius);
				context.lineTo(pos.x + length * dirX + dirY * radius, pos.y + length * dirY - dirX * radius);

				context.arc(pos.x + length * dirX, pos.y + length * dirY, radius, SHADOW_ANGLE - 0.5 * Math.PI, SHADOW_ANGLE + 0.5 * Math.PI);
				context.lineTo(pos.x - dirY * radius, pos.y + dirX * radius);
				context.fill();
			});
		},
		drawRectangleShadow: function(context, begin, end, length) {
			drawWithShadow(context, function() {
				var dirX = Math.cos(SHADOW_ANGLE);
				var dirY = Math.sin(SHADOW_ANGLE);

				context.fillStyle = 'black';
				context.beginPath();
				context.moveTo(begin.x, begin.y);
				context.lineTo(begin.x + length * dirX, begin.y + length * dirY);
				context.lineTo(end.x + length * dirX, end.y + length * dirY);
				context.lineTo(end.x, end.y);
				context.closePath();
				context.fill();
			});
		},
		drawPennant: function(context, pos, size, fillColor, outlineColor, lineWidth, spikes) {
			var STAFF_COLOR = 'rgb(120, 62, 28)';

			var hsx = 0.5 * size.x;
			var hsy = 0.5 * size.y;

			context.save();
			context.translate(pos.x, pos.y);

			context.strokeStyle = STAFF_COLOR;
			context.lineWidth = size.y / 10 + lineWidth;
			context.beginPath();
			context.moveTo(-1.2 * hsx, -0.9 * hsy);
			context.lineTo(1.2 * hsx, -0.9 * hsy);
			context.stroke();

			context.fillStyle = fillColor;
			context.strokeStyle = outlineColor;
			context.lineWidth = lineWidth;

			var offY = hsy - (1 - 0.5 * Math.sqrt(3)) * size.x;
			var bottom = offY + size.x * Math.sqrt(3) / 6;

			context.beginPath();
			context.moveTo(-hsx, -hsy);
			context.lineTo(-hsx, offY);
			context.arcTo(0, bottom, hsx, offY, size.x);
			context.lineTo(hsx, -hsy);

			var step = size.x / (2 * spikes + 1);
			for (var i = 1; i <= spikes; i++) {
				context.lineTo(hsx - (2 * i - 1) * step, -hsy);
				context.lineTo(hsx - (2 * i - 1) * step, -hsy + size.y / 9);
				context.lineTo(hsx - 2 * i * step, -hsy + size.y / 9);
				context.lineTo(hsx - 2 * i * step, -hsy);
			}

			context.closePath();
			context.fill();
			context.stroke();

			context.restore();
		}
	};
})();