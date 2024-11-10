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

function roundf(f, precision) {
    const prec = Math.pow(10, precision);
    return Math.round(f * prec) / prec;
}

function round1(f) {
    return roundf(f, 2);
}

function round2(f) {
    return roundf(f, 2);
}

function round3(f) {
    return roundf(f, 1);
}

class TariffBandKind {
    static Day = new TariffBandKind('Day');
    static Night = new TariffBandKind('Night');

    constructor(kind) {
        this.kind = kind;
    }

    toString() {
        return `TariffBandKind(${this.kind})`;
    }
}

class TariffBandSubKind {
    static Day = new TariffBandSubKind('Day');
    static Peak = new TariffBandSubKind('Peak');
    static NightStart = new TariffBandSubKind('NightStart');
    static Boost = new TariffBandSubKind('Boost');
    static NightExtended = new TariffBandSubKind('NightExtended');

    constructor(kind) {
        this.kind = kind;
    }

    toString() {
        return `TariffBandSubKind(${this.kind})`;
    }
}


class TariffBand {
    static Day = new TariffBand(TariffBandKind.Day, TariffBandSubKind.Day);
    static Peak = new TariffBand(TariffBandKind.Day, TariffBandSubKind.Peak);

    static NightStart = new TariffBand(TariffBandKind.Night, TariffBandSubKind.NightStart);
    static NightExtended = new TariffBand(TariffBandKind.Night, TariffBandSubKind.NightExtended);
    static Boost = new TariffBand(TariffBandKind.Night, TariffBandSubKind.Boost);

    constructor(kind, subkind) {
        this.kind = kind;
        this.subkind = subkind;
    }


    toString() {
        return `TariffBand(${this.kind}, ${this.subkind})`;
    }
}

function tariff_band(now) {
    const isPeakTime = now.getHours() >= 17 && now.getHours() < 19;
    if (isPeakTime) {
        return TariffBand.Peak;
    }

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
        return TariffBand.NightStart;
    }

    const isExtendedChargeTime = now.getHours() >= 5 && now.getHours() < 8;
    if (isExtendedChargeTime) {
        return TariffBand.NightExtended;
    }

    throw `tariff_band failed to map ${now}`;
}

module.exports.clamp = clamp;
module.exports.clamp_positive = clamp_positive;

module.exports.roundf = roundf;
module.exports.round1 = round1;
module.exports.round2 = round2;
module.exports.round3 = round3;

module.exports.tariff_band = tariff_band;
module.exports.TariffBand = TariffBand;

//console.debug(tariff_band(new Date()));
