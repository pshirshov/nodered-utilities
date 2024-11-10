function clamp(min, value, max) {
    if (value <= min) {
        return min;
    }
    if (value >= max) {
        return max;
    }
    return value;
}

function clamp_positive(value) {
    if (value < 0) {
        return 0;
    }
    return value;
}

module.exports.clamp = clamp;
module.exports.clamp_positive = clamp_positive;
