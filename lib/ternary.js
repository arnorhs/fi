var retOrCall = require('./helpers').retOrCall;

module.exports = function (cond, a, b) {
    return new Ternary(cond, a, b);
};

function Ternary(cond, a, b) {
    this.cond = cond;
    this.a = a;
    this.b = b;
}

Ternary.prototype.ret = function() {
    return retOrCall(this.cond) ? retOrCall(this.a) : retOrCall(this.b);
};

