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

    // public api
    api = {

        draw : {

            start : function () {},
            game : function () {

                var w = World.getStatus();

				cls();
                drawGrid(w.vpx % w.vpw / w.vpw, w.vpy % w.vph / w.vph);

            }

        }

    };

    // clear screen by default
    cls();

    return api;

}
    ());
