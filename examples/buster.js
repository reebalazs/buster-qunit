
var config = module.exports;

config["the.example"] = {
    rootPath: "../",
    environment: "browser",
    extensions: [require('../lib/extension.js')],
    'buster-qunit': {
        // specify html here
        html: 'examples/test.html'
    }
};
