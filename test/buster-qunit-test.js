if (typeof module === "object" && typeof require === "function") {
    require("../lib/buster-qunit");
    var buster = require('buster');
}
buster.assertions.add('keys', {
    assert: function (actual, keys) {
        var keyMap = {};
        var keyCnt = 0;
        for (var i=0; i<keys.length; i++) {
            keyMap[keys[i]] = true;
            keyCnt += 1;
        }
        for (var key in actual) {
            if (actual.hasOwnProperty(key)) {
                if (! keyMap[key]) {
                    return false;
                }
                keyCnt -= 1;
            }
        }
        return keyCnt === 0;
    },
    assertMessage: "Expected ${0} to have exact keys ${1}!",
    refuteMessage: "Expected ${0} not to have exact keys ${1}!"
});


buster.testCase('buster-qunit', {

    setUp: function () {
        this.global = (typeof window != "undefined") ? window : global;
        this.qunit = this.global._buster_qunit_init();
        // mock proxying, so we can check easier
        this.mockProxy = this.stub(this.qunit, 'proxy', function (f) {
            if (typeof f == 'function') {
                f = 'FUNC';
            }
            return 'PROXIED[' + f + ']';
        });
    },

    tearDown: function () {
        this.mockProxy.restore();
    },

    'exposes global': {

        '"module" and "test" functions': function () {
            var g = this.global;
            assert.isFunction(g.module);
            assert.isFunction(g.test);
        },
 
        'assertion functions': function () {
            var g = this.global;
            assert.isFunction(g.ok);
            assert.isFunction(g.equal);
            assert.isFunction(g.deepEqual);
            assert.isFunction(g.raises);
        },

        'async functions': function () {
            var g = this.global;
            assert.isFunction(g.start);
            assert.isFunction(g.stop);
            assert.isFunction(g.expect);
        }
    },

    'testcase': {

        'with simple test': function () {
            var g = this.global;
            g.module('M', {});
            g.test('test1', 'T1');
            var c = this.qunit.testCase;
            assert.keys(c, ['setUp', 'tearDown', 'M']);
            assert.equals(c.setUp, this.qunit.qunitSetUp);
            assert.equals(c.tearDown, this.qunit.qunitTearDown);
            assert.keys(c.M, ['test1']);
            assert.equals(c.M.test1, 'PROXIED[T1]');
        },
    
        'with setup and teardown': function () {
            var g = this.global;
            g.module('M', {
                setup: 'SETUP',
                teardown: 'TEARDOWN'
            });
            g.test('test1', 'T1');
            var c = this.qunit.testCase;
            assert.keys(c, ['setUp', 'tearDown', 'M']);
            assert.equals(c.setUp, this.qunit.qunitSetUp);
            assert.equals(c.tearDown, this.qunit.qunitTearDown);
            assert.keys(c.M, ['setUp', 'tearDown', 'test1']);
            assert.equals(c.M.setUp, 'PROXIED[SETUP]');
            assert.equals(c.M.tearDown, 'PROXIED[TEARDOWN]');
            assert.equals(c.M.test1, 'PROXIED[T1]');
        },

        'without module': function () {
            var g = this.global;
            g.test('test1', 'T1');
            var c = this.qunit.testCase;
            assert.keys(c, ['setUp', 'tearDown', 'nomodule']);
            assert.equals(c.setUp, this.qunit.qunitSetUp);
            assert.equals(c.tearDown, this.qunit.qunitTearDown);
            assert.keys(c.nomodule, ['test1']);
            assert.equals(c.nomodule.test1, 'PROXIED[T1]');
        },

        'with more tests': function () {
            var g = this.global;
            g.module('M', {});
            g.test('test1', 'T1');
            g.test('test2', 'T2');
            g.test('test3', 'T3');
            var c = this.qunit.testCase;
            assert.keys(c, ['setUp', 'tearDown', 'M']);
            assert.equals(c.setUp, this.qunit.qunitSetUp);
            assert.equals(c.tearDown, this.qunit.qunitTearDown);
            assert.keys(c.M, ['test1', 'test2', 'test3']);
            assert.equals(c.M.test1, 'PROXIED[T1]');
            assert.equals(c.M.test2, 'PROXIED[T2]');
            assert.equals(c.M.test3, 'PROXIED[T3]');
        },

        '//makes proxied methods': function () {
        },

        '//processing': function () {
        }


    }

});
