var config  = module.exports;


config.Browser = {
    rootPath: '..',
    env: 'browser',
    libs: [
        'lib/buster-qunit.js'
    ],
    tests: [
        'test/buster-qunit-test.js'
    ]
};


//
// Running the reference example: eat our own dogfood.
//

config.Dogfood = {
    rootPath: "../",
    environment: "browser",
    extensions: [require('../lib/extension.js')],
    'buster-qunit': {
        html: 'examples/test.html'
    }
};

// XXX The node test must be after the browser tests,
// this is a bug in BusterJS at the time of this writing???
config.Node = {
    env: 'node',
    tests: [
        'extension-test.js',
        'buster-qunit-test.js'
    ]
};
