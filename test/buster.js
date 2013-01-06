var config  = module.exports;

config.Node = {
    env: 'node',
    tests: [
        'extension-test.js',
        'buster-qunit-test.js'
    ]
};

config.Browser = {
    env: 'browser',
    tests: [
        'buster-qunit-test.js'
    ]
};