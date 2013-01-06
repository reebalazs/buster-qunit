
if (typeof module === "object" && typeof require === "function") {
    var buster = require("buster");
}

(function () {

    // --
    // Testcase
    // --
    
    function qunitSetUp() {
        if (typeof document != 'undefined') {
            // Create the "main" node
            document.body.innerHTML = '<div id="main"></div>';
        }
    }

    function qunitTearDown() {
        if (typeof document != 'undefined') {
            document.body.innerHTML = '';
        }
        if (buster.assertions.count === 0) {
            // Must have one assert in buster, but
            // this is not mandatory in qunit.
            // Make sure test does not fail for this.
            assert(true);
        }
    }

    var testCase = {
        setUp: qunitSetUp,
        tearDown: qunitTearDown
    };
    var testModule = {};
    var testModuleName = 'nomodule';
    var testModuleProto = {};

    function proxy(method, self) {
        return function () {
            return method.apply(self, arguments);
        };
    }

    var qunit = buster.qunit = buster.qunit || {};


    // Will be consumed from the epilogue.
    qunit._buster_qunit_process = function () {
        buster.testCase('qunit', testCase);
    };

    qunit.module = function (name, proto) {
        // Start a new test case
        testModule = {};
        testModuleName = name;
        if (proto === undefined) {
            proto = {};
        }
        testModuleProto = proto;
        testModule.setUp = proxy(proto.setup, proto);
        testModule.tearDown = proxy(proto.teardown, proto);
    };

    qunit.test = function (name, func) {
        // Prohibit some names.
        if (name.toLowerCase() == 'setup' ||
            name.toLowerCase() == 'teardown') {
            name = '_' + name;
        }
        // Add the test to the testcase.
        testCase[testModuleName] = testModule;
        testModule[name] = proxy(func, testModuleProto);
    };


    // --
    // Assertions
    // --

    qunit.ok = function (b) {
        assert(b);
    };
    
    qunit.equal = function (a, b) {
        assert(a == b);
    };

    qunit.deepEqual = function (a, b) {
        assert.equals(a, b);
    };

    qunit.raises = function (block, expected, message) {
        assert.exception(block, expected, message);
    };

    
    // --
    // Assertions (TODO not implemented)
    // --

    qunit.start = function () {
        throw new Error('Not supported');
    };

    qunit.stop = function () {
        throw new Error('Not supported');
    };

    qunit.expect = function (n) {
        throw new Error('Not supported');
    };


    if (typeof module === "object" && typeof require === "function") {
        module.exports = require("./extension");
    }

    if (buster.console) {
        qunit.console = buster.console;
    } else {
        qunit.console = buster.create(buster.eventedLogger);
    }

    function installGlobals(o) {
        o._buster_qunit_process = qunit._buster_qunit_process;
        o.module  = qunit.module;
        o.test = qunit.test;
        o.ok  = qunit.ok;
        o.deepEqual = qunit.deepEqual;
        o.start = qunit.start;
        o.stop  = qunit.stop;
        o.expect = qunit.expect;
        o.qunit = {console: qunit.console};
    }

    if (typeof global != "undefined") {
        installGlobals(global);
    }

    if (typeof window != "undefined") {
        installGlobals(window);
    }

})();