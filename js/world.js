var World = (function () {

    var status = {

        vpw : 640, // view port width and height
        vph : 480,
        ship : {}
        // player ship object

    };

    var api = {

        // create a new World
        newGame : function () {

            console.log('world.js: new world');

            status.vpx = 0 - status.vpw / 2;
            status.vpy = 0 - status.vph / 2;

        },

        // update the world
        update : function () {

            //console.log('world.js: tick');
            console.log(status.vpx);
            //console.log();

        },

        // user action method
        userKeybordAction : function (keyCode) {

            console.log(keyCode);

            switch (keyCode) {

            case 68: // d

                status.vpx += 5;

                break;

            case 65: // a

                status.vpx -= 5;

                break;

            case 87: // w

                status.vpy -= 5;

                break;

            case 83: // s

                status.vpy += 5;
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
