var assert = require('assert'),
    fi = require('./'),
    ternary = fi.ternary,
    sw = fi.sw;

function ex(expected, got) {
    return "Expected " + expected + ", but got " + got;
}
describe('ternary', function() {
    describe('using functions', function() {
        var cond = function() { return false; },
            v1 = function() { return 'v1'; },
            v2 = function() { return 'v2'; },
            expected = 'v2';
        it('should return the expected value', function() {
            var ret = ternary(cond,v1,v2).ret();
            assert(ret === expected, ex(expected, ret));
        });
    });
    describe('using values', function() {
        var cond = false,
            v1 = 'v1',
            v2 = 'v2',
            expected = 'v2';
        it('should return the expected value', function() {
            var ret = ternary(cond,v1,v2).ret();
            assert(ret === expected, ex(expected, ret));
        });
    });
});

describe('switch', function() {
    describe('using array', function() {
        describe('of values', function() {
            var arr = [
                'k1', 'key 1',
                'k2', 'key 2',
                'default value'
            ];

            it('should return "key 1"', function() {
                var ret = sw('k1', arr).ret();
                var expected = 'key 1';
                assert(ret === expected, ex(expected, ret));
            });

            it('should return "key 2"', function() {
                var ret = sw('k2', arr).ret();
                var expected = 'key 2';
                assert(ret === expected, ex(expected, ret));
            });

            it('should return "default value"', function() {
                var ret = sw('asdf', arr).ret();
                var expected = 'default value';
                assert(ret === expected, ex(expected, ret));
            });
        });

        describe('of functions', function() {
            // function factory.. laziness
            var f = function(val) {
                return function() {
                    return val;
                };
            };
            var arr = [
                f('k1'), f('key 1'),
                f('k2'), f('key 2'),
                f('default value')
            ];

            it('should return "key 1"', function() {
                var ret = sw('k1', arr).ret();
                var expected = 'key 1';
                assert(ret === expected, ex(expected, ret));
            });

            it('should return "key 2"', function() {
                var ret = sw('k2', arr).ret();
                var expected = 'key 2';
                assert(ret === expected, ex(expected, ret));
            });

            it('should return "default value"', function() {
                var ret = sw('asdf', arr).ret();
                var expected = 'default value';
                assert(ret === expected, ex(expected, ret));
            });
        });
    });
});


describe('fi statement', function() {
    // extreme laziness.. factory for our test case
    var f = function(a) {
        return fi(a, "a").ret();
    };

    it('should return "a"', function() {
        var ret = f(true);
        var expected = 'a';
        assert(ret === expected, ex(expected, ret));
    });

    it('should return an undefined value', function() {
        var ret = typeof f(false);
        var expected = 'undefined';
        assert(ret === expected, ex(expected, ret));
    });
});

describe('fi els statement', function() {
    // extreme laziness.. factory for our test case
    var f = function(a) {
        return fi(a, "a").els("b").ret();
    };

    it('should return "a"', function() {
        var ret = f(true);
        var expected = 'a';
        assert(ret === expected, ex(expected, ret));
    });

    it('should return "b"', function() {
        var ret = f(false);
        var expected = 'b';
        assert(ret === expected, ex(expected, ret));
    });
});

describe('fi elsfi statement', function() {
    // extreme laziness.. factory for our test case
    var f = function(a, b) {
        return fi(a, "a").elsfi(b, "b").ret();
    };

    it('should return "a"', function() {
        var ret = f(true, false);
        var expected = 'a';
        assert(ret === expected, ex(expected, ret));
    });

    it('should return "b"', function() {
        var ret = f(false, true);
        var expected = 'b';
        assert(ret === expected, ex(expected, ret));
    });

    it('should return an undefined value', function() {
        var ret = typeof f(false, false);
        var expected = 'undefined';
        assert(ret === expected, ex(expected, ret));
    });
});

describe('fi elsfi els statement', function() {
    // extreme laziness.. factory for our test case
    var f = function(a, b) {
        return fi(a, "a").elsfi(b, "b").els("c").ret();
    };

    it('should return "a"', function() {
        var ret = f(true, false);
        var expected = 'a';
        assert(ret === expected, ex(expected, ret));
    });

    it('should return "b"', function() {
        var ret = f(false, true);
        var expected = 'b';
        assert(ret === expected, ex(expected, ret));
    });

    it('should return "c"', function() {
        var ret = f(false, false);
        var expected = 'c';
        assert(ret === expected, ex(expected, ret));
    });
});

