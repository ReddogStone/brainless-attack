var LEVELS = [
	{
		towers: [],
		launchPads: [
			Rect.coords(200, 250, 100, 100),
		],
		castle: Point.make(500, 300)
	},
	{
		towers: [
			{
				pos: Point.make(400, 300),
				dir: Vector.make(-1, 0),
				cooloff: 0.6,
				range: 100,
			}
		],
		launchPads: [
			Rect.coords(100, 250, 100, 100)
		],
		castle: Point.make(650, 300)
	},
	{
		towers: [
			{
				pos: Point.make(400, 300),
				dir: Vector.make(-1, 0),
				cooloff: 0.5,
				range: 200,
			}
		],
		launchPads: [
			Rect.coords(0, 0, 100, 100),
			Rect.coords(0, 500, 100, 100)
		],
		castle: Point.make(400, 300)
	},
	{
		towers: [
			{
				pos: Point.make(150, 300),
				dir: Vector.make(1, 0),
				cooloff: 1,
				range: 300,
			},
			{
				pos: Point.make(650, 300),
				dir: Vector.make(-1, 0),
				cooloff: 1,
				range: 300,
			}
		],
		launchPads: [
			Rect.coords(350, 0, 100, 100),
			Rect.coords(350, 500, 100, 100),
			Rect.coords(700, 500, 100, 100)
		],
		castle: Point.make(400, 300)
	},
	{
		towers: [
			{
				pos: Point.make(300, 400),
				dir: Vector.make(-1, 0),
				cooloff: 1,
				range: 225,
			},
			{
				pos: Point.make(500, 200),
				dir: Vector.make(1, 0),
				cooloff: 1,
				range: 225,
			}
		],
		launchPads: [
			Rect.coords(700, 500, 100, 100),
			Rect.coords(350, 500, 100, 100)
		],
		castle: Point.make(400, 300)
	},
	{
		towers: [
			{
				pos: Point.make(300, 250),
				dir: Vector.make(-1, 0),
				cooloff: 0.5,
				range: 150,
			},
			{
				pos: Point.make(500, 350),
				dir: Vector.make(-1, 0),
				cooloff: 0.5,
				range: 150,
			}
		],
		launchPads: [
			Rect.coords(0, 0, 100, 100),
			Rect.coords(0, 250, 100, 100),
			Rect.coords(0, 500, 100, 100)
		],
		castle: Point.make(700, 300)
	},
	{
		towers: [
			{
				pos: Point.make(250, 50),
				dir: Vector.make(-1, 0),
				cooloff: 1,
				range: 290,
			},
			{
				pos: Point.make(500, 550),
				dir: Vector.make(-1, 0),
				cooloff: 1,
				range: 290,
			}
		],
		launchPads: [
			Rect.coords(0, 0, 100, 100),
			Rect.coords(0, 250, 100, 100),
			Rect.coords(0, 500, 100, 100)
		],
		castle: Point.make(700, 300)
	},
	{
		towers: [
			{
				pos: Point.make(200, 100),
				dir: Vector.make(-1, 0),
				cooloff: 1,
				range: 100,
			},
			{
				pos: Point.make(600, 300),
				dir: Vector.make(-1, 0),
				cooloff: 1,
				range: 100,
			},
			{
				pos: Point.make(200, 500),
				dir: Vector.make(-1, 0),
				cooloff: 1,
				range: 100,
			}
		],
		launchPads: [
			Rect.coords(0, 0, 100, 100),
			Rect.coords(0, 500, 100, 100)
		],
		castle: Point.make(700, 300)
	},
	{
		towers: [
			{
				pos: Point.make(400, 120),
				dir: Vector.make(-1, 0),
				cooloff: 0.5,
				range: 250,
			},
			{
				pos: Point.make(600, 380),
				dir: Vector.make(-1, 0),
				cooloff: 0.5,
				range: 250,
			},
			{
				pos: Point.make(200, 450),
				dir: Vector.make(-1, 0),
				cooloff: 0.7,
				range: 100,
			}
		],
		launchPads: [
			Rect.coords(0, 0, 100, 100),
			Rect.coords(0, 500, 100, 100),
			Rect.coords(700, 500, 100, 100)
		],
		castle: Point.make(700, 100)
	},
	{
		towers: [
			{
				pos: Point.make(200, 500),
				dir: Vector.make(-1, 0),
				cooloff: 0.5,
				range: 100,
			},
			{
				pos: Point.make(700, 300),
				dir: Vector.make(-1, 0),
				cooloff: 1.0,
				range: 150,
			}
		],
		launchPads: [
			Rect.coords(0, 460, 25, 25),
			Rect.coords(0, 575, 25, 25)
		],
		castle: Point.make(700, 300)
	}
];