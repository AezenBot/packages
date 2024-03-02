import BigNumber from "bignumber.js";
import { DurationFormatter } from "./formatter.js";
import { Time, DEFAULT_SEPARATORS } from "./constants.js";

// Maps different time units to their corresponding values in nanoseconds.
const tokens = new Map([
  ["nanoseconds", Time.Nanosecond],
  ["nanosecond", Time.Nanosecond],
  ["nsecs", Time.Nanosecond],
  ["nsec", Time.Nanosecond],
  ["ns", Time.Nanosecond],
  ["n", Time.Nanosecond],

  ["microseconds", Time.Microsecond],
  ["microsecond", Time.Microsecond],
  ["musecs", Time.Microsecond],
  ["musec", Time.Microsecond],
  ["mus", Time.Microsecond],
  ["mu", Time.Microsecond],
  ["μs", Time.Microsecond],
  ["us", Time.Microsecond],
  ["u", Time.Microsecond],

  ["milliseconds", Time.Millisecond],
  ["millisecond", Time.Millisecond],
  ["msecs", Time.Millisecond],
  ["msec", Time.Millisecond],
  ["ms", Time.Millisecond],

  ["seconds", Time.Second],
  ["second", Time.Second],
  ["secon", Time.Second],
  ["seco", Time.Second],
  ["secs", Time.Second],
  ["sec", Time.Second],
  ["se", Time.Second],
  ["s", Time.Second],

  ["minutes", Time.Minute],
  ["minute", Time.Minute],
  ["minu", Time.Minute],
  ["mins", Time.Minute],
  ["min", Time.Minute],
  ["mi", Time.Minute],
  ["mn", Time.Minute],
  ["m", Time.Minute],

  ["hour", Time.Hour],
  ["hours", Time.Hour],
  ["hrs", Time.Hour],
  ["hr", Time.Hour],
  ["hs", Time.Hour],
  ["h", Time.Hour],

  ["days", Time.Day],
  ["day", Time.Day],
  ["dys", Time.Day],
  ["da", Time.Day],
  ["dy", Time.Day],
  ["ds", Time.Day],
  ["d", Time.Day],

  ["weeks", Time.Week],
  ["week", Time.Week],
  ["wks", Time.Week],
  ["we", Time.Week],
  ["ws", Time.Week],
  ["wk", Time.Week],
  ["w", Time.Week],

  ["months", Time.Month],
  ["month", Time.Month],
  ["mos", Time.Month],
  ["mo", Time.Month],
  ["b", Time.Month],

  ["years", Time.Year],
  ["year", Time.Year],
  ["yrs", Time.Year],
  ["yea", Time.Year],
  ["ye", Time.Year],
  ["yr", Time.Year],
  ["ys", Time.Year],
  ["y", Time.Year],

  ["decades", Time.Decade],
  ["decade", Time.Decade],
  ["decad", Time.Decade],
  ["deca", Time.Decade],
  ["decs", Time.Decade],
  ["dec", Time.Decade],
  ["de", Time.Decade],

  ["centuries", Time.Century],
  ["century", Time.Century],
  ["cents", Time.Century],
  ["cent", Time.Century],
  ["cen", Time.Century],
  ["ce", Time.Century],
  ["c", Time.Century],

  ["millennia", Time.Millennium],
  ["milleniums", Time.Millennium],
  ["millenium", Time.Millennium],
  ["millennias", Time.Millennium],
  ["milly", Time.Millennium],
  ["mill", Time.Millennium],
  ["mil", Time.Millennium],
  ["ml", Time.Millennium],

  ["megayears", Time.Megayear],
  ["megayear", Time.Megayear],
  ["megayear", Time.Megayear],
  ["megayea", Time.Megayear],
  ["megayes", Time.Megayear],
  ["megayer", Time.Megayear],
  ["megay", Time.Megayear],
  ["mega", Time.Megayear],
  ["megayrs", Time.Megayear],
  ["megary", Time.Megayear],
  ["myr", Time.Megayear],

  ["gigayears", Time.Gigayear],
  ["gigayear", Time.Gigayear],
  ["gigayea", Time.Gigayear],
  ["gigayes", Time.Gigayear],
  ["gigayer", Time.Gigayear],
  ["gigay", Time.Gigayear],
  ["gyr", Time.Gigayear],
  ["gigary", Time.Gigayear],
  ["gy", Time.Gigayear],

  ["terayears", Time.Terayear],
  ["terayear", Time.Terayear],
  ["terayea", Time.Terayear],
  ["terayer", Time.Terayear],
  ["terayes", Time.Terayear],
  ["teray", Time.Terayear],
  ["tera", Time.Terayear],
  ["teryrs", Time.Terayear],
  ["teryr", Time.Terayear],
  ["tery", Time.Terayear],
  ["tyr", Time.Terayear],
  ["ty", Time.Terayear]
]);

// Maps time values in nanoseconds to their corresponding time units.
const mappings = new Map([
  [Time.Nanosecond, "nanoseconds"],
  [Time.Microsecond, "microseconds"],
  [Time.Millisecond, "milliseconds"],
  [Time.Second, "seconds"],
  [Time.Minute, "minutes"],
  [Time.Hour, "hours"],
  [Time.Day, "days"],
  [Time.Week, "weeks"],
  [Time.Month, "months"],
  [Time.Year, "years"],
  [Time.Decade, "decades"],
  [Time.Century, "centuries"],
  [Time.Millennium, "millennia"],
  [Time.Megayear, "megayears"],
  [Time.Gigayear, "gigayears"],
  [Time.Terayear, "terayears"]
]);

/**
 * Represents a duration of time with various utility methods.
 * Extends the DurationFormatter class.
 */
export class Duration extends DurationFormatter {
  /**
   * Creates a Duration object based on the specified pattern.
   * @param {string} pattern - The pattern string representing the duration.
   */
  constructor(pattern) { 
    super();

    this.ms = this.calculateOffset(pattern.toLowerCase());
  }

  /**
   * Calculate the millisecond based on the provided pattern.
   * @private
   * @param {string} pattern - The pattern string representing the duration.
   * @returns {number} - The calculated millisecond.
   */
  calculateOffset(pattern) {
    let result = new BigNumber(0);
    let valid = false;

    // Parse the pattern and calculate the millisecond.
    pattern = pattern
      .replace(Duration.commaRegex, "") // Ignore commas
      .replace(Duration.aAndAnRegex, "1") // Replace a/an with 1
      .replace(Duration.patternRegex, (_, i, units) => {
        const token = tokens.get(units);

        if (token !== undefined) {
          const n = new BigNumber(i);
          result = result.plus(n.times(token));
          this[mappings.get(token)] += n;
          valid = true;
        }

        return "";
      });

    return valid ? result : NaN;
  }

  /**
   * Get the date from now.
   * @returns {Date} - The calculated date.
   */
  get fromNow() {
    return this.dateFrom(new Date());
  }

  /**
   * Get the date from a specified date instance.
   * @param {Date} date - The Date instance to calculate the date from.
   * @returns {Date} - The calculated date.
   */
  dateFrom(date) {
    return new Date(date.getTime() + this.ms);
  }

  /**
   * Converts a duration to a verbose string.
   * @param {number} [precision=7] - The precision of the output.
   * @param {object} [separators=DEFAULT_SEPARATORS] - Separators for formatting.
   * @returns {string} - The formatted verbose string.
   */
  verbose(precision = 7, separators = DEFAULT_SEPARATORS) {
    return super.verbose(this.ms, precision, separators)
  }

  /**
   * Converts a duration to binary notation.
   * @returns {string} - The duration in binary notation.
   */
  binary() {
    return super.binary(this.ms)
  }

  /**
   * Converts a duration to colon notation (HH:mm:ss).
   * @returns {string} - The formatted colon notation string.
   */
  colon() {
    return super.colon(this.ms)
  }

  /**
   * Converts a duration to scientific notation.
   * @returns {string} - The duration in scientific notation.
   */
  scientific() {
    return super.scientific(this.ms)
  }

  /**
   * Converts a duration to a compact string with formatted units.
   * @param {object} [options={ separator: " " }] - Options for formatting (optional).
   * @param {string} options.separator - The separator to be used between units (optional, default is " ").
   * @returns {string} - The formatted compact string.
   */
  compact(options = { separator: " " }) {
    return super.compact(this.ms, options)
  }

  /**
   * Converts a duration to an elegant string with formatted units.
   * @param {number} [precision=7] - The precision of the output (optional, default is 7).
   * @param {object} [separators=DEFAULT_SEPARATORS] - Separators for formatting (optional, default is DEFAULT_SEPARATORS).
   * @param {string} separators.left - The left separator to be used between units (optional).
   * @param {string} separators.right - The right separator to be used between units (optional).
   * @returns {string} - The formatted elegant string.
   */
  elegant(precision = 7, separators = DEFAULT_SEPARATORS) {
    return super.elegant(this.ms, precision, separators)
  }

  /**
   * Converts a duration in BigNumber format into an object representing various time units.
   * @param {BigNumber} duration - The input duration in BigNumber format.
   * @throws {Error} Throws an error if the duration is not a valid number.
   * @returns {Object} - An object representing the duration in different time units.
   */
  object() {
    return super.object(this.ms)
  }
}

/**
 * The RegExp used for the pattern parsing
 */
Duration.patternRegex = /(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*([a-zμ]*)/gi;

/**
 * The RegExp used for removing commas
 */
Duration.commaRegex = /,/g;

/**
 * The RegExp used for replacing a/an with 1
 */
Duration.aAndAnRegex = /\ban?\b/gi;
