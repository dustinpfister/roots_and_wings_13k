var Main = (function () {

    var currentState = 'start',
    frameRate = 1000 / 30, // 30 fps
    lastTick = new Date(0),

    state = {

        // the start state is called once
        start : {

            tick : function () {

                console.log('start state');

                World.newGame();

                // change to game state.
                currentState = 'game';

            },

            keyboardDown : function (e) {}

        },

        game : {

            tick : function () {

                World.update();

            },

            keyboardDown : function (e) {

                World.userKeybordAction(e.keyCode);

            }

        },

        // planet menu state
        planetMenu : {

            tick : function () {

                World.updatePlanet();

            },

            keyboardDown : function (e) {

                var w = World.getStatus(),
                p = w.selectedPlanet;

                console.log(e.keyCode);

                // if l key
                if (e.keyCode == 76) {

                    // return to game
                    currentState = 'game';

                }

                // if 1 key
                if (e.keyCode == 49) {

                    if (p._starPort) {

                        console.log('have one');

                    } else {

                        // check the cost
                        //console.log('cost : ' + p.SPCost());
                        World.buy('sp');

                    }

                }

                if (e.keyCode == 50) {

                    w.ship.loadOre(p._ore, function () {

                        p._ore = 0;

                    });

                }

            }

        }

    };

    // main app loop
    loop = function () {

        var now = new Date();

        // assuming the browser supports requestAnimationFrame.
        requestAnimationFrame(loop);

        if (now - lastTick >= frameRate) {

            // call the current state method
            state[currentState].tick();
            Canvas.draw[currentState]();

            lastTick = new Date();

        }

    };

    // hold onto your butts
    loop();

    // events
    window.addEventListener('keydown', function (e) {

        //World.userKeybordAction(e.keyCode);

        state[currentState].keyboardDown(e);

    });

    // public api
    return {

        changeState : function (state) {

            currentState = state;

        }

    }

}
    ());
