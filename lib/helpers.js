module.exports = {
    retOrCall: function(v) {
        return (typeof v === 'function') ? v() : v;
    }
};

