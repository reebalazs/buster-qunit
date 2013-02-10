var config  = module.exports;

config.Node = {
    env: 'node',
    tests: [
        'extension-test.js',
        'buster-qunit-test.js'
    ]
};

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

var libs = [
    'examples/testlib/jquery-1.6.2.min.js',
    'examples/testlib/jquery.ui.widget.js'
];

config.Dogfood = {
    rootPath: "../",
    environment: "browser",
    libs: libs,
    extensions: [require('../lib/extension.js')],
    busterQunit: {
        html: 'test.html'
    },
    sources: [
        'examples/source.js'
    ],
    tests: [
        'examples/test.js'
    ]
};