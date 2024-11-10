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


class TariffBand {
    static Day = new TariffBand('Day');
    static Night = new TariffBand('Night');
    static NightExtended = new TariffBand('NightExtended');
    static Boost = new TariffBand('Boost');

    constructor(name) {
        this.name = name;
    }
    toString() {
        return `TariffBand.${this.name}`;
    }
}

function tariff_band(now) {
    const isDayTime = now.getHours() < 23 && now.getHours() >= 8;
    if (isDayTime) {
        return TariffBand.Day;
    }

    const isBoostTime = now.getHours() >= 2 && now.getHours() < 5;
    if (isBoostTime) {
        return TariffBand.Boost;
    }

    const isNightTime = now.getHours() >= 23 || now.getHours() < 2;
    if (isNightTime) {
        return TariffBand.Night;
    }

    const isExtendedChargeTime = now.getHours() >= 5 && now.getHours() < 8;
    if (isExtendedChargeTime) {
        return TariffBand.NightExtended;
    }

    throw `tariff_band failed to map ${now}`;
}

module.exports.clamp = clamp;
module.exports.clamp_positive = clamp_positive;

module.exports.tariff_band = tariff_band;
module.exports.TariffBand = TariffBand;
