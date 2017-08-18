var Main = (function () {

    var currentState = 'start',
    frameRate = 1000 / 30, // 30 fps
    lastTick = new Date(0),
    keyList = [],
    keyLockTime = 0,

    state = {

        // the start state is called once
        start : {

            tick : function () {

                World.newGame();

                // change to game state.
                currentState = 'game';

            },

            keyboardDown : function (e) {}

        },

        game : {

            tick : function () {

                var w = World.getStatus();

                World.update();

                if (keyLockTime <= 0) {

                    if (keyList[68]) {

                        w.ship.headingChange();

                    }

                    if (keyList[65]) {

                        w.ship.headingChange(true);

                    }

                    if (keyList[87]) {
                        w.ship.speedChange();

                    }

                    if (keyList[83]) {
                        w.ship.speedChange(true);

                    }

                    if (keyList[76]) {
                        var p = w.onPlanet();

                        if (p) {

                            w.selectedPlanet = p;
							keyLockTime = 1000;
                            currentState = 'planetMenu';

                        }

                    }

                }

            },

            keyboardDown : function (e) {}

        },

        // planet menu state
        planetMenu : {

            tick : function () {

                World.updatePlanet();

            },

            keyboardDown : function (e) {

                var w = World.getStatus(),
                p = w.selectedPlanet;

                console.log('hello');

                // if l key
                if (e.keyCode == 76) {

                    console.log(e.keyCode);

                    // return to game
					keyLockTime = 1000;
                    currentState = 'game';

                }

                // if 1 key
                if (e.keyCode == 49) {

                    if (!p._starPort) {

                        // check the cost
                        World.buy('sp');

                    }

                }

                // if 2
                if (e.keyCode == 50) {

                    if (p._id === 'home') {

                        // unload ore.
                        p._ore += w.ship.ore;
                        w.ship.ore = 0;

                    } else {

                        //load up any ore
                        w.ship.loadOre(p._ore, function () {

                            p._ore = 0;

                        });

                    }

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

            if (keyLockTime > 0) {

                keyLockTime -= now - lastTick;

            }

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

        keyList[e.keyCode] = true;

        //World.userKeybordAction(e.keyCode);

        state[currentState].keyboardDown(e);

    });

    window.addEventListener('keyup', function (e) {

        keyList[e.keyCode] = false;

    });

    // public api
    return {

        changeState : function (state) {

            currentState = state;

        }

    }

}
    ());
