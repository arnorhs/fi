var retOrCall = require('./helpers').retOrCall;

module.exports = function(cond, arr) {
    return new Sw(cond, Array.isArray(arr) ? arr : objSwitchToArray(arr));
};

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

