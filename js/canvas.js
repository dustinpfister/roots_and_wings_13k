var Canvas = (function () {

    // create the canvas, and grab a ref to the context.
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    // set width and height
    canvas.width = 640;
    canvas.height = 480;

    // just append to body
    document.body.appendChild(canvas);

    // clear scrren
    var cls = function () {

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    },

    // public api
    api = {

        draw : {

            start : function () {},
            game : function () {}

        }

    };

    // clear screen by default
    cls();

    return api;

}
    ());
