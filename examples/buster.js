

var config = module.exports;

var libs = [
    'examples/testlib/jquery-1.6.2.min.js',
    'examples/testlib/jquery.ui.widget.js'
];

var extensions = [require('../lib/extension.js')];


config["the.example"] = {
    rootPath: "../",
    environment: "browser",
    libs: libs,
    extensions: extensions,
    sources: [
        'examples/source.js'
    ],
    tests: [
        'examples/test.js'
    ]
};

