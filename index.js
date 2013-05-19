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

function sw(cond, arr) {
    return new Sw(cond, Array.isArray(arr) ? arr : objSwitchToArray(arr));
}

function Sw(cond, arr) {
    this.condition = cond;
    this.switches = arr;
}
Sw.prototype.ret = function() {
    var arr = this.switches,
        cond = retOrCall(this.condition),
        l = arr.length;
    for (var i = 0; i < l-1; i += 2) {
        if (cond === retOrCall(arr[i])) {
            return retOrCall(arr[i+1]);
        }
    }
    // if the last argument is alone, it's considered the default:
    if (l % 2) {
        return retOrCall(arr[l - 1]);
    }
};

function objSwitchToArray(obj) {
    if (Object.keys(obj).length === 0) {
        return;
    }
    var arr = [],
        def;
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            if (k === 'default') {
                def = obj[k];
            } else {
                arr.push(k, obj[k]);
            }
        }
    }
    if (def) {
        arr.push(def);
    }
    return arr;
}

function retOrCall(v) {
    return (typeof v === 'function') ? v() : v;
}

