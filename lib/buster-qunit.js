
if (typeof module === "object" && typeof require === "function") {
    var buster = require("buster");
}

(function () {

    // --
    // Testcase
    // --

    var qunit = buster.qunit = buster.qunit || {};
  
    qunit.qunitSetUp = function () {
        if (typeof document != 'undefined') {
            // Create the "main" node
            document.body.innerHTML = '<div id="main"></div>';
        }
    };

    qunit.qunitTearDown = function () {
        if (typeof document != 'undefined') {
            document.body.innerHTML = '';
        }
        if (buster.assertions.count === 0) {
            // Must have one assert in buster, but
            // this is not mandatory in qunit.
            // Make sure test does not fail for this.
            buster.assert(true);
        }
    };

    qunit.proxy = function(method, self) {
        return function () {
            return method.apply(self, arguments);
        };
    };

    // Can be used by tests to init this module.
    qunit._buster_qunit_init = function () {
        qunit.testCase = {
            setUp: qunit.qunitSetUp,
            tearDown: qunit.qunitTearDown
        };
        qunit.testModule = {};
        qunit.testModuleName = 'nomodule';
        qunit.testModuleProto = {};
        // return for introspection in tests
        return qunit;
    };
    qunit._buster_qunit_init();

    // Will be consumed from the epilogue.
    qunit._buster_qunit_process = function () {
        buster.testCase('qunit', qunit.testCase);
    };

    qunit.module = function (name, proto) {
        // Start a new test case
        qunit.testModule = {};
        qunit.testModuleName = name;
        if (proto === undefined) {
            proto = {};
        }
        qunit.testModuleProto = proto;
        if (proto.setup !== undefined) {
            qunit.testModule.setUp = qunit.proxy(proto.setup, proto);
        }
        if (proto.teardown !== undefined) {
            qunit.testModule.tearDown = qunit.proxy(proto.teardown, proto);
        }
    };

    qunit.test = function (name, func) {
        // Prohibit some names.
        if (name.toLowerCase() == 'setup' ||
            name.toLowerCase() == 'teardown') {
            name = '_' + name;
        }
        // Add the test to the testcase.
        qunit.testCase[qunit.testModuleName] = qunit.testModule;
        qunit.testModule[name] = qunit.proxy(func, qunit.testModuleProto);
    };


    // --
    // Assertions
    // --

    qunit.ok = function (b) {
        buster.assert(b);
    };
    
    qunit.equal = function (a, b) {
        buster.assert(a == b);
    };

    qunit.deepEqual = function (a, b) {
        buster.assert.equals(a, b);
    };

    qunit.raises = function (block, expected, message) {
        buster.assert.exception(block, function (err) {
            return err.message.slice(0, expected.length) == expected;   // startswith
        }, message);
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
        o._buster_qunit_init = qunit._buster_qunit_init; // for tests only
        o._buster_qunit_process = qunit._buster_qunit_process;
        o.module  = qunit.module;
        o.test = qunit.test;
        o.ok  = qunit.ok;
        o.equal = qunit.equal;
        o.deepEqual = qunit.deepEqual;
        o.raises = qunit.raises;
        o.start = qunit.start;
        o.stop  = qunit.stop;
        o.expect = qunit.expect;
        o.QUnit = {};
    }

    if (typeof global != "undefined") {
        installGlobals(global);
    }

    if (typeof window != "undefined") {
        installGlobals(window);
    }

})();