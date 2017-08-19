var jsmin = require('jsmin').jsmin,
fs = require('fs');

var files = [
    'api',
    'world',
    'canvas',
    'main'
],
buildFile = '',
i = 0;

var build = function () {

    if (i < files.length) {

        fs.readFile('../js/' + files[i] + '.js', 'utf8', function (e, data) {

            buildFile += jsmin(data);

            i += 1;

            build();

        });

    } else {

        console.log(buildFile);

        fs.writeFile('../build.js', buildFile, 'utf8', function (e) {

            if (e) {

                console.log('error');
                console.log(e);

            } else {

                console.log('build file done');

            }

        });

    }

};

build();
