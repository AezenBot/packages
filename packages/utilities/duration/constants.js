import BigNumber from "bignumber.js";

export const CommonFactor = new BigNumber(1000).times(60).times(60).times(24)

export const Time = {
  Nanosecond: new BigNumber(1e-6),
  Microsecond: new BigNumber(1e-3),
  Millisecond: new BigNumber(1),
  Second: new BigNumber(1000),
  Minute: new BigNumber(1000).times(60),
  Hour: new BigNumber(1000).times(60).times(60),
  Day: CommonFactor,
  Week: CommonFactor.times(7),
  Year: CommonFactor.times(365),
  Month: CommonFactor.times(365 / 12),
  Decade: CommonFactor.times(365).times(10),
  Century: CommonFactor.times(365).times(100),
  Millennium: CommonFactor.times(365).times(1000),
  Megayear: CommonFactor.times(365).times(1e6),
  Gigayear: CommonFactor.times(365).times(1e9),
  Terayear: CommonFactor.times(365).times(1e12)
};

/**
 * The supported time types
 */
export const TimeTypes = {
  Nanosecond: "nanosecond",
  Microsecond: "microsecond",
  Millisecond: "millisecond",
  Second: "second",
  Minute: "minute",
  Hour: "hour",
  Day: "day",
  Week: "week",
  Month: "month",
  Year: "year",
  Decade: "decade",
  Century: "century",
  Millennium: "millennium",
  Megayear: "megayear",
  Gigayear: "gigayear",
  Terayear: "terayear"
};

export const DEFAULT_UNITS = {
  [TimeTypes.Terayear]: {
    1: "terayear",
    COMPACT: "tyr",
    DEFAULT: "terayears"
  },

  [TimeTypes.Gigayear]: {
    1: "gigayear",
    COMPACT: "gyr",
    DEFAULT: "gigayears"
  },

  [TimeTypes.Megayear]: {
    1: "megayear",
    COMPACT: "myr",
    DEFAULT: "megayears"
  },

  [TimeTypes.Millennium]: {
    1: "millennium",
    COMPACT: "mil",
    DEFAULT: "millennia"
  },

  [TimeTypes.Century]: {
    1: "century",
    COMPACT: "cent",
    DEFAULT: "centuries"
  },

  [TimeTypes.Decade]: {
    1: "decade",
    COMPACT: "dec",
    DEFAULT: "decades"
  },

  [TimeTypes.Year]: {
    1: "year",
    COMPACT: "y",
    DEFAULT: "years"
  },

  [TimeTypes.Month]: {
    1: "month",
    COMPACT: "mo",
    DEFAULT: "months"
  },

  [TimeTypes.Week]: {
    1: "week",
    COMPACT: "w",
    DEFAULT: "weeks"
  },

  [TimeTypes.Day]: {
    1: "day",
    COMPACT: "d",
    DEFAULT: "days"
  },

  [TimeTypes.Hour]: {
    1: "hour",
    COMPACT: "h",
    DEFAULT: "hours"
  },

  [TimeTypes.Minute]: {
    1: "minute",
    COMPACT: "m",
    DEFAULT: "minutes"
  },

  [TimeTypes.Second]: {
    1: "second",
    COMPACT: "s",
    DEFAULT: "seconds"
  },

  [TimeTypes.Millisecond]: {
    1: "millisecond",
    COMPACT: "ms",
    DEFAULT: "milliseconds"
  },

  [TimeTypes.Microsecond]: {
    1: "microsecond",
    COMPACT: "us",
    DEFAULT: "microseconds"
  },

  [TimeTypes.Nanosecond]: {
    1: "nanosecond",
    COMPACT: "ns",
    DEFAULT: "nanoseconds"
  }
};

export const DEFAULT_SEPARATORS = {
  left: " ",
  right: " "
};
