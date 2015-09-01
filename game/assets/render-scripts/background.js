ScriptLoader.module(function() {
	return {
		'default': function(context, data, time, textures) {
			if (textures.grass) {
				context.drawImage(textures.grass, 0, 0);
			}
		}
	};
});