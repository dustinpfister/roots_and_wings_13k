var Canvas = (function () {

    // create the canvas, and grab a ref to the context.
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    // set width and height
    canvas.width = 640;
    canvas.height = 480;

    // just append to body
    document.body.appendChild(canvas);

    // clear screen
    var cls = function () {

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    },

    // draw gird method
    drawGrid = function (xRatio, yRatio) {

        var cellSize = 128,
        w = 5,
        h = 4,
        sx,
        sy;

        // defaulting to zero
        xRatio = xRatio || 0;
        yRatio = yRatio || 0;

        sx = -cellSize + cellSize * xRatio;
        sy = -cellSize + cellSize * yRatio;

        y = sy;

        ctx.strokeStyle = '#808080';
        while (y < cellSize * h) {

            x = sx;
            while (x < cellSize * w) {

                ctx.strokeRect(x, y, cellSize, cellSize);

                x += cellSize;
            }

            y += cellSize;

        }

    },

    // draw ship method
    drawShip = function () {

        var w = World.getStatus(),
        s = w.ship;

        ctx.save();

        ctx.translate(s.x, s.y);
        ctx.rotate(Math.PI / 50 * s.heading);
        ctx.strokeStyle = '#00ff00';
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        // heading indicator
        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(0, 0, 15, Math.PI - .5, Math.PI + .5);
        ctx.stroke();

        ctx.restore();

    },

    // just a simple draw all planets method (very slow)
    drawPlanets = function () {

        var w = World.getStatus(),
        pl = w.planets;

        ctx.strokeStyle = '#000000';
        pl.forEach(function (p) {

            var x = w.vpx + w.vpw + -p._x,
            y = w.vpy + w.vph + -p._y;

            ctx.fillStyle = p._starPort === true ? '#00cfcf' : '#afafaf';

            ctx.beginPath();
            ctx.closePath();
            ctx.arc(
                x,
                y,
                p._size, 0, Math.PI * 2);

            /*
            ctx.arc(
            w.vpx + w.vpw + p._x,
            w.vpy + w.vph + p._y,
            p._size, 0, Math.PI * 2);
             */
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = '15px courier';

            ctx.fillText('pos: (' + Math.floor(p._x) + ',' + Math.floor(p._y) + ')', x, y);
            ctx.fillText('ore: ' + p._ore, x, y+15);

        });

    },

    // draw info
    drawInfo = function () {

        var w = World.getStatus();

        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = 'top';
        ctx.font = '10px courier';

        ctx.fillText('distance: ' + w.d, 10, 10);
        ctx.fillText('speed: ' + w.ship.speed, 10, 20);
        ctx.fillText('money: ' + w.money, 10, 30);
        //ctx.fillText('vp pos : (' + Math.floor(w.vpx) + ',' + Math.floor(w.vpy) + ')', 10, 40);
        ctx.fillText('ship pos : (' + Math.floor(w.vpx + w.ship.x) + ',' + Math.floor(w.vpy + w.ship.y) + ')', 10, 40);

    },

    // public api
    api = {

        draw : {

            start : function () {},
            game : function () {

                var w = World.getStatus();

                cls();
                drawGrid(w.vpx % w.vpw / w.vpw, w.vpy % w.vph / w.vph);
                drawPlanets();
                drawShip();
                drawInfo();

            },

            planetMenu : function () {

                var w = World.getStatus(),
                prop,
                i = 0;

                cls();

                ctx.fillStyle = 'rgba(0,255,255,.6)';
                ctx.font = '10px courier';

                ctx.fillText('planet menu: ', 10, 10);
                ctx.fillText('money: ' + w.money, 10, 20);
                for (prop in w.selectedPlanet) {

                    if (prop[0] === '_') {
                        ctx.fillText(prop + ' : ' + w.selectedPlanet[prop], 10, 50 + 10 * i);

                    }
                    i += 1;
                }

            }

        }

    };

    // clear screen by default
    cls();

    return api;

}
    ());
