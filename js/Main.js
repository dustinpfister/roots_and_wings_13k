var Main = (function () {

    var currentState = 'start',
    frameRate = 1000 / 30, // 30 fps
    lastTick = new Date(0),

    state = {

        // the start state is called once
        start : function () {

            console.log('start state');

            World.newGame();

            // change to game state.
            currentState = 'game';

        },

        game : function () {

            World.update();

        },

        // planet menu state
        planetMenu : function () {}

    },

    // main app loop
    loop = function () {

        var now = new Date();

        // assuming the browser supports requestAnimationFrame.
        requestAnimationFrame(loop);

        if (now - lastTick >= frameRate) {

            // call the current state method
            state[currentState]();
            Canvas.draw[currentState]();

            lastTick = new Date();

        }

    };

    // hold onto your butts
    loop();

    // events
    window.addEventListener('keydown', function (e) {

        World.userKeybordAction(e.keyCode);

    });

    // public api
    return {

        changeState : function (state) {

            currentState = state;

        }

    }

}
    ());
