var World = (function () {

    var distance = function (x1, y1, x2, y2) {

        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    },

    status = {

        vpw : 640, // view port width and height
        vph : 480,

        d : 0,

        // player ship object
        ship : {

            heading : 25,
            speed : 5,

            setHome : function () {

                status.vpx = 0 - status.vpw / 2;
                status.vpy = 0 - status.vph / 2;

                this.heading = 25;
                this.speed = 5;

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

            }

        },

        update : function () {

            var radian = Math.PI / 50 * this.ship.heading;

            this.d = distance(

                    this.vpx + this.vpw / 2,
                    this.vpy + this.vph / 2,
                    0, 0);

            this.vpx += Math.cos(radian) * this.ship.speed;
            this.vpy += Math.sin(radian) * this.ship.speed;

        }

    };

    var api = {

        // create a new World
        newGame : function () {

            console.log('world.js: new world');

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

                break;

            case 83: // s

                //status.vpy += 5;
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
