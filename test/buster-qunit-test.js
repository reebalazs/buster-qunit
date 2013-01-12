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

        'processing': {
            '': function () {
                var g = this.global;
                this.qunit.testCase = 'TESTCASE';
                this.testCase = this.stub(buster, 'testCase');
                g._buster_qunit_process();
                assert(this.testCase.calledWith('qunit', this.qunit.testCase));
                
            },
            tearDown: function () {
                this.testCase.restore();
            }
        }

    },

    'assertion': {

        'ok': {
            '': function () {
                var g = this.global;
                this.assert = this.stub(buster, 'assert', function () {});
                this.qunit.ok(true);
                assert.equals(this.assert.callCount, 1);
                assert(this.assert.calledWith(true));
            },
            tearDown: function () {
                this.assert.restore();
            }
        },

       'equal': {
            'if matches': function () {
                var g = this.global;
                this.assert = this.stub(buster, 'assert', function () {});
                this.qunit.equal(1, 1);
                assert.equals(this.assert.callCount, 1);
                assert(this.assert.calledWith(true));
            },
            'if not matches': function () {
                var g = this.global;
                this.assert = this.stub(buster, 'assert', function () {});
                this.qunit.equal(2, 3);
                assert.equals(this.assert.callCount, 1);
                assert(this.assert.calledWith(false));
            },
            'if matches and not the same': function () {
                var g = this.global;
                this.assert = this.stub(buster, 'assert', function () {});
                this.qunit.equal(2, '2');
                assert.equals(this.assert.callCount, 1);
                assert(this.assert.calledWith(true));
            },
            tearDown: function () {
                this.assert.restore();
            }
        },

        'deepEqual': {
            '': function () {
                var g = this.global;
                this.equals = this.stub(buster.assert, 'equals', function () {});
                this.qunit.deepEqual('THIS', 'THAT');
                assert.equals(this.equals.callCount, 1);
                assert(this.equals.calledWith('THIS', 'THAT'));
            },
            tearDown: function () {
                this.equals.restore();
            }
        },

        'raises': {
            '': function () {
                var g = this.global;
                this.exception = this.stub(assert, 'exception');
                this.qunit.raises('F', '12345', 'message');
                this.exception.restore();
                assert.equals(this.exception.callCount, 1);
                var args = this.exception.args[0];
                assert.equals(args[0], 'F');
                assert.equals(args[2], 'message');
                assert.equals(typeof args[1], 'function');
                var startswith = args[1];
                refute(startswith({message: ''}));
                refute(startswith({message: '1234'}));
                refute(startswith({message: '123X5'}));
                assert(startswith({message: '12345'}));
                assert(startswith({message: '123456'}));
                refute(startswith({message: '1234X6'}));
                assert(startswith({message: '123456789'}));
            },
            tearDown: function () {
                this.exception.restore();
            }
        }
    },
    'async': {

        'start': function() {
            // not implemented
            var qunit = this.qunit;
            assert.exception(function () {
                qunit.start();
            });
        },

        'stop': function () {
            // not implemented
            var qunit = this.qunit;
            assert.exception(function () {
                qunit.stop();
            });
        },

        'expect': function () {
            // not implemented
            var qunit = this.qunit;
            assert.exception(function () {
                qunit.except(10);
            });
        }

    }
});
