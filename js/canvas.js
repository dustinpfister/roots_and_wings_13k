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

    // draw info
    drawInfo = function () {

        var w = World.getStatus();

        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = 'top';
        ctx.font = '20px courier';

        ctx.fillText('distance: ' + w.d, 10, 10);

    },

    // public api
    api = {

        draw : {

            start : function () {},
            game : function () {

                var w = World.getStatus();

                cls();
                drawGrid(w.vpx % w.vpw / w.vpw, w.vpy % w.vph / w.vph);
                drawShip();
                drawInfo();

            }

        }

    };

    // clear screen by default
    cls();

    return api;

}
    ());
