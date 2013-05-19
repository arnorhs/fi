var retOrCall = require('./helpers').retOrCall;

module.exports = function(cond, val) {
    return new Statement(cond, val);
};

function Statement(cond, val) {
    this.cond = retOrCall(cond);
    this.val = retOrCall(val);
}

Statement.prototype.els = function(val) {
    if (this.cond) {
        return this;
    }
    this.cond = true;
    this.val = retOrCall(val);
    return this;
};

Statement.prototype.elsfi = Statement.prototype.elsif = Statement.prototype.elseif = function(cond, val) {
    if (this.cond) {
        return this;
    }
    this.cond = retOrCall(cond);
    this.val = retOrCall(val);
    return this;
};

Statement.prototype.value = Statement.prototype.ret = function() {
    if (this.cond) {
        return this.val;
    }
};

