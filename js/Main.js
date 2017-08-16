(function () {

    var currentState = 'start',

    state = {

        // the start state is called once
        start : function () {

            console.log('start state');

            // change to game state.
            currentState = 'game';

        },

        game : function () {

            console.log('ready to rock');

        }

    },

    // main app loop
    loop = function () {

        // assuming the browser supports requestAnimationFrame.
        requestAnimationFrame(loop);

        // call the current state method
        state[currentState]();

    };

    // hold onto your butts
    loop();

}
    ());
