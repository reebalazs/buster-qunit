/*jslint undef: true, newcap: true, nomen: false, white: true, regexp: true */
/*jslint plusplus: false, bitwise: true, maxerr: 50, maxlen: 120, indent: 4 */
/*jslint sub: true */
/*globals window navigator document console setTimeout */
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
    }

    var testCase = {
        setUp: qunitSetUp,
        tearDown: qunitTearDown
    };
    var testModule = {};
    var testModuleName = 'nomodule';
    // Will be consumed from the epilogue.
    window._buster_qunit_process = function () {
        buster.testCase('qunit', testCase);
    };

    window.module = function (name, proto) {
        // Start a new test case
        testModule = {
            setUp: proto.setup,
            tearDown: proto.teardown
        };
        testModuleName = name;
    };

    window.test = function (name, func) {
        // Prohibit some names.
        if (name.toLowerCase() == 'setup' ||
            name.toLowerCase() == 'teardown') {
            name = '_' + name;
        }
        // Add the test to the testcase.
        testCase[testModuleName] = testModule;
        testModule[name] = func;
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

