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

			    var w = World.getStatus();
			
                //World.userKeybordAction(e.keyCode);

                switch (e.keyCode) {

                case 68: // d


                    w.ship.headingChange()

                    //status.vpx += 5;

                    break;

                case 65: // a


                    w.ship.headingChange(true);

                    //status.vpx -= 5;

                    break;

                case 87: // w

                    //status.vpy -= 5;


                    w.ship.speedChange();

                    break;

                case 83: // s

                    //status.vpy += 5;

                    w.ship.speedChange(true);

                    break;

                case 76: // l

                    var p = w.onPlanet();

                    if (p) {

                        console.log('planet menu state');

                        w.selectedPlanet = p;
                        currentState = 'planetMenu';

                    }

                    break;

                }

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

                // if 2
                if (e.keyCode == 50) {

                    if (p._id === 'home') {

                        // unload ore.
                        console.log('unloading ore at home');

                        p._ore += w.ship.ore;
                        w.ship.ore = 0;

                    } else {

                        console.log('loading ore');

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
