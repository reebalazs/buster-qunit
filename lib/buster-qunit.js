/*jslint undef: true, newcap: true, nomen: false, white: true, regexp: true */
/*jslint plusplus: false, bitwise: true, maxerr: 50, maxlen: 120, indent: 4 */
/*jslint sub: true */
/*globals window navigator document setTimeout */
/*globals buster assert */


(function () {

    // --
    // Testcase
    // --
    
    function qunitSetUp() {
        // Create the "main" node
        document.body.innerHTML = '<div id="main"></div>';
    }

    function qunitTearDown() {
        document.body.innerHTML = '';
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

    // Will be consumed from the epilogue.
    window._buster_qunit_process = function () {
        buster.testCase('qunit', testCase);
    };

    function proxy(method, self) {
        return function () {
            return method.apply(self, arguments);
        };
    }

    window.module = function (name, proto) {
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

    window.test = function (name, func) {
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

    window.ok = function (b) {
        assert(b);
    };
    
    window.equal = function (a, b) {
        assert(a == b);
    };

    window.deepEqual = function (a, b) {
        assert.equals(a, b);
    };

    window.raises = function (block, expected, message) {
        assert.exception(block, expected, message);
    };



    window.start = function () {
        throw new Error('Not supported');
    };

    window.stop = function () {
        throw new Error('Not supported');
    };

    window.expect = function (n) {
        throw new Error('Not supported');
    };

})(); 

