
var distance = function (x1, y1, x2, y2) {

    return Math.sqrt(Math.abs(Math.pow(x1 - x2, 2)) + Math.abs(Math.pow(y1 - y2, 2)));

};

var Planet = function (opt) {

    opt = opt || {};

    this._id = opt._id || 'home';
    this._x = opt._x || 0;
    this._y = opt._y || 0;
    this._size = opt._size || 60;
    this._starPort = opt._starPort === undefined ? true : opt._starPort;

    this._ore = opt._ore || 10;
    this._oreMax = 10; // max ore
    this._oreRate = 3000; // 1 ore every ten seconds

    this._lastUpdate = new Date();

};

// what is the cost of the planets startPort
Planet.prototype.SPCost = function () {

    var d = Math.floor(distance(0, 0, this._x, this._y));

    return d;

};

var World = (function () {

    var status = {

        vpw : 640, // view port width and height
        vph : 480,

        money : 1000,

        d : 0,

        planets : [],
        selectedPlanet : {}, // a ref to the current selected planet

        //if over a planet return that planet
        onPlanet : function () {

            var i = this.planets.length,
            p,
            d;
            while (i--) {

                p = this.planets[i];

                if (distance(

                        this.vpx + this.ship.x,
                        this.vpy + this.ship.y,
                        p._x,
                        p._y) <= p._size) {

                    return p;

                }

            }

            return false;

        },

        // generate a rim of planets
        genRim : function (pc, d) {

            var pl,
            r,
            p = 0;

            pc = pc || 50;
            d = d || 1000;
            while (p < pc) {

                r = Math.PI / (pc / 2) * p;

                pl = new Planet({

                        _id : 'rim_d' + d + '_' + p,
                        _x : Math.cos(r) * d,
                        _y : Math.sin(r) * d,
                        _size : 30,
                        _ore : 0,
                        _starPort : false

                    });

                this.planets.push(pl);

                p += 1;

            }

        },

        // generate planets
        genPlanets : function () {

            this.planets = [];

            // and home world
            this.planets.push(new Planet());

            this.genRim(30, 1000);
            this.genRim(120, 10000);

        },

        // player ship object
        ship : {

            heading : 25,
            speed : 5,

            x : 0, // the view port relative ship position
            y : 0,

            ore : 0,
            maxOre : 40,

            setHome : function () {

                status.vpx = 0 - status.vpw / 2;
                status.vpy = 0 - status.vph / 2;

                this.heading = 25;
                this.speed = 0;

                this.x = status.vpw / 2;
                this.y = status.vph / 2;

            },

            // load ore method
            loadOre : function (oreAmount,cb) {

                // load ore amount
                if (this.ore + oreAmount < this.maxOre) {

                    this.ore += oreAmount;
					
					cb();

                }

            },

            // ship heading change
            headingChange : function (down) {

                if (down) {

                    this.heading -= 1;

                } else {

                    this.heading += 1;

                }

                if (this.heading < 0) {
                    this.heading = 99;
                }
                if (this.heading > 100) {
                    this.heading = 0;
                }

            },

            // speed change
            speedChange : function (down) {

                if (down) {

                    this.speed -= 1;

                } else {

                    this.speed += 1;

                }

                if (this.speed >= 21) {

                    this.speed = 20;

                }

                if (this.speed <= 0) {

                    this.speed = 0;

                }

            }

        },

        // main game state update
        update : function () {

            var radian = Math.PI / 50 * this.ship.heading;

            // update position based on current ship speed.
            this.d = distance(

                    this.vpx + this.ship.x,
                    this.vpy + this.ship.y,
                    0, 0);

            this.vpx += Math.cos(radian) * this.ship.speed;
            this.vpy += Math.sin(radian) * this.ship.speed;

            // update planets in range
            var self = this;
            this.planets.forEach(function (p) {

                var d = distance(self.vpx + self.ship.x,
                        self.vpy + self.ship.y,
                        p._x, p._y);

                if (d < 500) {

                    api.updatePlanet(p);

                }

            });

        }

    };

    var api = {

        // create a new World
        newGame : function () {

            console.log('world.js: new world');

            status.genPlanets();

            // default heading
            status.ship.setHome();

        },

        buy : function (what) {

            var p = status.selectedPlanet;

            switch (what) {

            case 'sp':

                var cost = p.SPCost();

                if (status.money >= cost) {

                    status.money -= cost;

                    p._lastUpdate = new Date();
                    p._starPort = true;

                    console.log('bought star port');

                } else {

                    console.log('need more money.');

                }

                console.log(p);

                console.log();

                break;

            }

        },

        update : status.update.bind(status),

        updatePlanet : function (p) {

            p = p === undefined ? status.selectedPlanet : p;

            var now = new Date,
            t = now - p._lastUpdate,
            deltaOre;

            if (p._starPort) {

                // update curent selected planet
                if (t > p._oreRate) {

                    if (p._id == 'home') {

                        if (p._ore > 0) {

                            p._ore -= 1;
                            status.money += 100;

                        }

                    } else {

                        deltaOre = Math.floor(t / p._oreRate);

                        if (deltaOre + p._ore > p._oreMax) {

                            p._ore = p._oreMax;

                        } else {

                            p._ore += deltaOre;

                        }

                    }

                    p._lastUpdate = new Date();

                }

            }

        },

		/*
        // user action method
        userKeybordAction : function (keyCode) {

            console.log(keyCode);

            switch (keyCode) {

            case 68: // d


                status.ship.headingChange()

                //status.vpx += 5;

                break;

            case 65: // a


                status.ship.headingChange(true);

                //status.vpx -= 5;

                break;

            case 87: // w

                //status.vpy -= 5;


                status.ship.speedChange();

                break;

            case 83: // s

                //status.vpy += 5;

                status.ship.speedChange(true);

                break;

            case 76: // l

                var p = status.onPlanet();

                if (p) {

                    console.log('planet menu state');

                    status.selectedPlanet = p;
                    Main.changeState('planetMenu');

                }

                break;

            }

        },
		*/

        // return a reference to the status object
        getStatus : function () {

            return status;

        }

    };

    api.newGame();

    return api;

}
    ());
