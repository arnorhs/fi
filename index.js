module.exports = fi;

function fi(cond, val) {
    return new statement(cond, val);
}
fi.ternary = ternary;
fi.sw = fi.swi = sw;

function Ternary(cond, a, b) {
    this.cond = cond;
    this.a = a;
    this.b = b;
}
Ternary.prototype.ret = function() {
    return retOrCall(this.cond) ? retOrCall(this.a) : retOrCall(this.b);
}
function ternary(cond, a, b) {
    return new Ternary(cond, a, b);
}

function statement(cond, val) {
    this.cond = retOrCall(cond);
    this.val = retOrCall(val);
}
statement.prototype.els = function(val) {
    if (this.cond) {
        return this;
    }
    this.cond = true;
    this.val = retOrCall(val);
    return this;
}
statement.prototype.elsfi = statement.prototype.elsif = statement.prototype.elseif = function(cond, val) {
    if (this.cond) {
        return this;
    }
    this.cond = retOrCall(cond);
    this.val = retOrCall(val);
    return this;
}
statement.prototype.value = statement.prototype.ret = function() {
    if (this.cond) {
        return this.val;
    }
}

function sw(val, obj) {
    if (Array.isArray(obj)) {
        return arrSw(val, obj);
    }
    return objSw(val, obj);
}

function arrSw(val, arr) {
    var l = arr.length;
    var val = retOrCall(val);
    for (var i = 0; i < l-1; i += 2) {
        if (val === retOrCall(arr[i])) {
            return retOrCall(arr[i+1]);
        }
    }
    // if the last argument is alone, it's considered the default:
    return ternary(l % 2, arr[l - 1]).ret();
}

function objSw(val, obj) {
    if (Object.keys(obj).length === 0) {
        return;
    }
    var ret = retOrCall(obj[val]);
    if (typeof ret === 'undefined') {
        ret = retOrCall(obj['default'])
    }
    return ret;
}

function retOrCall(v) {
    return (typeof v === 'function') ? v() : v;
}

