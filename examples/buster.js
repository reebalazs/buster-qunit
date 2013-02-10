
var config = module.exports;

config["the.example"] = {
    rootPath: "../",
    environment: "browser",
    extensions: [require('../lib/extension.js')],
    // in real life, you would use:
    // extensions: [require('buster-qunit')],
    'buster-qunit': {
        // specify html here
        html: 'examples/test.html'
    }
};
