var World = (function () {

    var status = {

        vpw : 640, // view port width and height
        vph : 480

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

            console.log('world.js: tick');
            console.log(status);
            console.log();

        }

    };

    api.newGame();

    return api;

}
    ());
