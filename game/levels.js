var LEVELS = [
//============================================================
// GRASS
//============================================================
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
				dir: Vector.make(-1, 0),
				cooloff: 0.8,
				range: 100,
			},
			{
				pos: Point.make(400, 450),
				dir: Vector.make(-1, 0),
				cooloff: 1,
				range: 100,
			},
			{
				pos: Point.make(360, 270),
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
			},
			{
				rect: Rect.coords(50, 50, 25, 25),
				cooloff: 4
			}
		],
		castle: Point.make(400, 80)
	},
	{
		towers: [
			{
				pos: Point.make(400, 450),
				dir: Vector.make(-1, 0),
				cooloff: 1,
				range: 100,
			},
			{
				pos: Point.make(270, 270),
				dir: Vector.make(-1, 0),
				cooloff: 0.7,
				range: 100,
			},
			{
				pos: Point.make(440, 230),
				dir: Vector.make(-1, 0),
				cooloff: 0.7,
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
			},
			{
				rect: Rect.coords(50, 450, 25, 25),
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
	},

//============================================================
// SAND
//============================================================
	{
		towers: [],
		launchPads: [
			{
				rect: Rect.coords(150, 250, 100, 100),
				cooloff: 1
			}
		],
		sand: [
			{
				path: [
					{ x: 330, y: 100 },
					{ x: 480, y: 500 },
					{ x: 330, y: 500 }
				]
			}
		],
		castle: Point.make(550, 300)
	},
	{
		towers: [
			{
				pos: Point.make(400, 300),
				dir: Vector.make(-1, 0),
				cooloff: 2.2,
				range: 75,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(150, 250, 100, 100),
				cooloff: 4
			}
		],
		sand: [
			{
				path: [
					{ x: 330, y: 100 },
					{ x: 470, y: 100 },
					{ x: 400, y: 450 }
				]
			}
		],
		castle: Point.make(600, 300)
	},
	{
		towers: [
			{
				pos: Point.make(400, 300),
				dir: Vector.make(-1, 0),
				cooloff: 0.7,
				range: 75,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(150, 200, 25, 25),
				cooloff: 4
			},
			{
				rect: Rect.coords(150, 375, 25, 25),
				cooloff: 4
			}
		],
		sand: [
			{
				path: [
					{ x: 230, y: 380 },
					{ x: 290, y: 380 },
					{ x: 290, y: 320 },
					{ x: 230, y: 320 }
				]
			}
		],
		castle: Point.make(600, 300)
	},
	{
		towers: [
			{
				pos: Point.make(400, 300),
				dir: Vector.make(-1, 0),
				cooloff: 0.7,
				range: 75,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(150, 200, 25, 25),
				cooloff: 4
			},
			{
				rect: Rect.coords(150, 375, 25, 25),
				cooloff: 4
			}
		],
		sand: [
			{
				path: [
					{ x: 230, y: 100 },
					{ x: 350, y: 100 },
					{ x: 230, y: 400 }
				]
			}
		],
		castle: Point.make(600, 300)
	},
	{
		towers: [
			{
				pos: Point.make(600, 300),
				dir: Vector.make(-1, 0),
				cooloff: 0.6,
				range: 100,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(100, 250, 25, 100),
				cooloff: 3
			}
		],
		sand: [
			{
				path: [
					{ x: 190, y: 300 },
					{ x: 430, y: 300 },
					{ x: 430, y: 360 },
					{ x: 190, y: 360 }
				]
			}
		],
		castle: Point.make(600, 300)
	},
	{
		towers: [
			{
				pos: Point.make(300, 300),
				dir: Vector.make(-1, 0),
				cooloff: 0.7,
				range: 75,
			},
			{
				pos: Point.make(460, 250),
				dir: Vector.make(0, 1),
				cooloff: 0.5,
				range: 50,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(100, 250, 25, 25),
				cooloff: 4
			},
			{
				rect: Rect.coords(100, 325, 25, 25),
				cooloff: 4
			}
		],
		sand: [
			{
				path: [
					{ x: 175, y: 300 },
					{ x: 250, y: 300 },
					{ x: 250, y: 360 },
					{ x: 175, y: 360 }
				]
			}
		],
		castle: Point.make(600, 300)
	},
	{
		towers: [
			{
				pos: Point.make(250, 300),
				dir: Vector.make(-1, 0),
				cooloff: 0.7,
				range: 75,
			},
			{
				pos: Point.make(650, 300),
				dir: Vector.make(-1, 0),
				cooloff: 0.8,
				range: 100,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(100, 250, 25, 25),
				cooloff: 4
			},
			{
				rect: Rect.coords(100, 325, 25, 25),
				cooloff: 4
			},
			{
				rect: Rect.coords(625, 100, 25, 25),
				cooloff: 4
			}
		],
		sand: [
			{
				path: [
					{ x: 400, y: 150 },
					{ x: 500, y: 150 },
					{ x: 500, y: 450 },
					{ x: 400, y: 450 }
				]
			}
		],
		castle: Point.make(650, 300)
	},

/*	{
		towers: [
			{
				pos: Point.make(400, 80),
				dir: Vector.make(-1, 0),
				cooloff: 0.8,
				range: 100,
			},
			{
				pos: Point.make(500, 400),
				dir: Vector.make(-1, 0),
				cooloff: 1,
				range: 40,
			},
			{
				pos: Point.make(360, 280),
				dir: Vector.make(-1, 0),
				cooloff: 1.5,
				range: 100,
			}
		],
		launchPads: [
			{
				rect: Rect.coords(500, 550, 25, 25),
				cooloff: 4
			},
			{
				rect: Rect.coords(550, 530, 25, 25),
				cooloff: 4
			},
			{
				rect: Rect.coords(150, 500, 25, 25),
				cooloff: 4
			}
		],
		castle: Point.make(400, 80)
	},*/
];