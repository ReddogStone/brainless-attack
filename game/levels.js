var LEVELS = [
	// {
	// 	towers: [
	// 		{
	// 			pos: Point.make(400, 300),
	// 			dir: Vector.make(-1, 0),
	// 			cooloff: 1,
	// 			range: 100,
	// 		}
	// 	],
	// 	launchPads: [
	// 	],
	// 	castle: Point.make(650, 300)
	// },
	{
		towers: [],
		launchPads: [
			{
				rect: Rect.coords(200, 250, 100, 100),
				cooloff: 1
			}
		],
		castle: Point.make(500, 300)
	},
	{
		towers: [
			{
				pos: Point.make(400, 300),
				dir: Vector.make(-1, 0),
				cooloff: 1,
				range: 100,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(150, 250, 25, 25),
				cooloff: 4
			},
			{
				rect: Rect.coords(200, 350, 25, 25),
				cooloff: 4
			}
		],
		castle: Point.make(650, 300)
	},
	{
		towers: [
			{
				pos: Point.make(400, 300),
				dir: Vector.make(-1, 0),
				cooloff: 0.9,
				range: 100,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(100, 225, 100, 50),
				cooloff: 4
			},
			{
				rect: Rect.coords(100, 325, 100, 50),
				cooloff: 4
			}
		],
		castle: Point.make(650, 300)
	},
	{
		towers: [
			{
				pos: Point.make(400, 300),
				dir: Vector.make(1, 0),
				cooloff: 0.5,
				range: 50,
			},
			{
				pos: Point.make(520, 300),
				dir: Vector.make(-1, 0),
				cooloff: 0.5,
				range: 50,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(50, 275, 50, 50),
				cooloff: 3
			},
			{
				rect: Rect.coords(150, 275, 50, 50),
				cooloff: 3
			},
			{
				rect: Rect.coords(250, 275, 50, 50),
				cooloff: 3
			}
		],
		castle: Point.make(650, 300)
	},
	{
		towers: [
			{
				pos: Point.make(400, 200),
				dir: Vector.make(-1, 0),
				cooloff: 1.0,
				range: 80,
			},
			{
				pos: Point.make(400, 400),
				dir: Vector.make(-1, 0),
				cooloff: 1.0,
				range: 80,
			},
			{
				pos: Point.make(600, 300),
				dir: Vector.make(-1, 0),
				cooloff: 1.0,
				range: 100,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(50, 100, 25, 25),
				cooloff: 3
			},
			{
				rect: Rect.coords(200, 50, 25, 25),
				cooloff: 3
			},
			{
				rect: Rect.coords(100, 475, 25, 25),
				cooloff: 3
			},
			{
				rect: Rect.coords(250, 525, 25, 25),
				cooloff: 3
			}
		],
		castle: Point.make(600, 300)
	},
	{
		towers: [
			{
				pos: Point.make(200, 300),
				dir: Vector.make(-1, 0),
				cooloff: 1.0,
				range: 80,
			},
			{
				pos: Point.make(600, 300),
				dir: Vector.make(-1, 0),
				cooloff: 1.0,
				range: 80,
			},
			{
				pos: Point.make(400, 300),
				dir: Vector.make(-1, 0),
				cooloff: 0.15,
				range: 100,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(10, 250, 25, 25),
				cooloff: 3
			},
			{
				rect: Rect.coords(35, 300, 25, 25),
				cooloff: 3
			},
			{
				rect: Rect.coords(725, 250, 25, 25),
				cooloff: 3
			},
			{
				rect: Rect.coords(700, 300, 25, 25),
				cooloff: 3
			},
			{
				rect: Rect.coords(385, 100, 35, 35),
				cooloff: 3
			},
			{
				rect: Rect.coords(385, 500, 35, 35),
				cooloff: 3
			}
		],
		castle: Point.make(400, 300)
	},
	{
		towers: [
			{
				pos: Point.make(400, 400),
				dir: Vector.make(-1, 0),
				cooloff: 1,
				range: 100,
			},
			{
				pos: Point.make(360, 220),
				dir: Vector.make(-1, 0),
				cooloff: 0.5,
				range: 50,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(300, 550, 25, 25),
				cooloff: 4
			},
			{
				rect: Rect.coords(475, 550, 25, 25),
				cooloff: 4
			}
		],
		castle: Point.make(400, 80)
	},
	{
		towers: [
			{
				pos: Point.make(400, 80),
				dir: Vector.make(0, 1),
				cooloff: 3,
				range: 100,
			},
			{
				pos: Point.make(150, 450),
				dir: Vector.make(-1, 0),
				cooloff: 1,
				range: 100,
			},
			{
				pos: Point.make(210, 280),
				dir: Vector.make(-1, 0),
				cooloff: 0.5,
				range: 50,
			},
			{
				pos: Point.make(620, 420),
				dir: Vector.make(1, 0),
				cooloff: 1,
				range: 100,
			},
			{
				pos: Point.make(570, 250),
				dir: Vector.make(1, 0),
				cooloff: 0.5,
				range: 50,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(20, 500, 25, 25),
				cooloff: 4
			},
			{
				rect: Rect.coords(80, 560, 25, 25),
				cooloff: 4
			},
			{
				rect: Rect.coords(725, 470, 25, 25),
				cooloff: 4
			},
			{
				rect: Rect.coords(665, 530, 25, 25),
				cooloff: 4
			}
		],
		castle: Point.make(400, 80)
	}
];