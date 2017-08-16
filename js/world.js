var World = (function () {

    var status = {

        vpw : 640, // view port width and height
        vph : 480,

        // player ship object
        ship : {},

        update : function () {

            var radian = Math.PI / 50 * this.ship.heading;

            this.vpx += Math.cos(radian) * this.ship.speed;
            this.vpy += Math.sin(radian) * this.ship.speed;

        },

        // ship heading change
        headingChange : function (down) {

            if (down) {

                this.ship.heading -= 1;

            } else {

                this.ship.heading += 1;

            }

            if (this.ship.heading < 0) {
                this.ship.heading = 99;
            }
            if (this.ship.heading > 100) {
                this.ship.heading = 0;
            }

        }

    };

    var api = {

        // create a new World
        newGame : function () {

            console.log('world.js: new world');

            status.vpx = 0 - status.vpw / 2;
            status.vpy = 0 - status.vph / 2;

            // default heading
            status.ship = {

                heading : 90,
                speed : 5

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


                status.headingChange()

                //status.vpx += 5;

                break;

            case 65: // a


                status.headingChange(true);

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
