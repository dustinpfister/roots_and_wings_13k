
var distance = function (x1, y1, x2, y2) {

    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

};

var Planet = function (opt) {

    opt = opt || {};

    this._x = opt._x || 0;
    this._y = opt._y || 0;
    this._size = opt._size || 60;
    this._starPort = opt._starPort === undefined ? true : opt._starPort;

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

        money : 10000,

        d : 0,

        planets : [],
        selectedPlanet : {}, // a ref to the current selected planet

        //if over a planet return that planet
        onPlanet : function () {

            var i = this.planets.length,
            p;
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

                        _x : Math.cos(r) * d,
                        _y : Math.sin(r) * d,
                        _size : 30,
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

            setHome : function () {

                status.vpx = 0 - status.vpw / 2;
                status.vpy = 0 - status.vph / 2;

                this.heading = 25;
                this.speed = 10;

                this.x = status.vpw / 2;
                this.y = status.vph / 2;

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

                    this.speed = 1;

                }

            }

        },

        update : function () {

            var radian = Math.PI / 50 * this.ship.heading;

            this.d = distance(

                    this.vpx + this.ship.x,
                    this.vpy + this.ship.y,
                    0, 0);

            this.vpx += Math.cos(radian) * this.ship.speed;
            this.vpy += Math.sin(radian) * this.ship.speed;

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
                    p._starPort = true;

                    console.log('bought star port');

                } else {

                    console.log('need more money.');

                }

                console.log();

                break;

            }

        },

        // update the world
        update : function () {

            //console.log('world.js: tick');
            //console.log(status.vpx);
            //console.log();

            status.update();

        },

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

                console.log(p);

                if (p) {

                    console.log('planet menu state');

                    status.selectedPlanet = p;
                    Main.changeState('planetMenu');

                }

                break;

            }

        },

        // return a reference to the status object
        getStatus : function () {

            return status;

        }

    };

    api.newGame();

    return api;

}
    ());
