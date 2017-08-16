var World = (function () {

    var distance = function (x1, y1, x2, y2) {

        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    },

    status = {

        vpw : 640, // view port width and height
        vph : 480,

        d : 0,

        planets : [],

        // generate a rim of planets
        genRim : function (pc, d) {

            var pl,
            r,
            p = 0;

            pc = pc | 50;
            d = d | 1000;

            while (p < pc) {

                r = Math.PI / (pc / 2) * p;

                pl = {

                    x : Math.cos(r) * d,
                    y : Math.sin(r) * d,
                    size : 30

                };

                this.planets.push(pl);

                p += 1;

            }

        },

        // generate planets
        genPlanets : function () {

            this.planets = [];

            // and home world
            this.planets.push({

                x : 0,
                y : 0,
                size : 50

            });

            this.genRim();
            this.genRim(10000);

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
