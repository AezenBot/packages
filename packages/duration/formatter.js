import BigNumber from "bignumber.js";
import { DEFAULT_SEPARATORS, DEFAULT_UNITS, TimeTypes, Time, CommonFactor } from "./constants.js";

/**
 * The duration of each time type in milliseconds
 */
const kTimeDurations = [
  [TimeTypes.Terayear, Time.Terayear],
  [TimeTypes.Gigayear, Time.Gigayear],
  [TimeTypes.Megayear, Time.Megayear],
  [TimeTypes.Millennium, Time.Millennium],
  [TimeTypes.Century, Time.Century],
  [TimeTypes.Decade, Time.Decade],
  [TimeTypes.Year, Time.Year],
  [TimeTypes.Month, Time.Month], // 29.53059 days is the official duration of a month: https://en.wikipedia.org/wiki/Month
  [TimeTypes.Week, Time.Week],
  [TimeTypes.Day, Time.Day],
  [TimeTypes.Hour, Time.Hour],
  [TimeTypes.Minute, Time.Minute],
  [TimeTypes.Second, Time.Second],
  [TimeTypes.Millisecond, Time.Millisecond],
  [TimeTypes.Microsecond, Time.Microsecond],
  [TimeTypes.Nanosecond, Time.Nanosecond]
];

/**
 * A class for formatting and displaying durations.
 */
export class DurationFormatter {
  /**
   * Creates an instance of the DurationFormatter class.
   * @param {object} [units=DEFAULT_UNITS] - The language assets for time units.
   */
  constructor(units = DEFAULT_UNITS) {
    this.units = units;
  }

  /**
   * Converts a duration to a verbose string.
   * @param {BigNumber} duration - The duration in milliseconds to parse and display.
   * @param {number} [precision=7] - The precision of the output.
   * @param {object} [separators=DEFAULT_SEPARATORS] - Separators for formatting.
   * @returns {string} - The formatted verbose string.
   */
  verbose(duration, precision = 7, { left: leftSeparator = DEFAULT_SEPARATORS.left, right: rightSeparator = DEFAULT_SEPARATORS.right } = DEFAULT_SEPARATORS) {
    // Ensure the duration is a BigNumber
    duration = new BigNumber(duration);

    // Check if the duration is a valid number
    if (duration.isNaN()) {
      throw new Error("Invalid duration")
    }

    const output = [];
    const negative = duration.isNegative();

    // Convert negative duration to positive for processing
    if (negative) {
      duration.abs();
    }

    for (const [type, timeDuration] of kTimeDurations) {
      const division = duration.dividedBy(timeDuration);

      // Skip units with values less than 1
      if (division.isLessThan(1)) {
        continue;
      }

      const floored = division.integerValue(BigNumber.ROUND_FLOOR);
      duration = duration.minus(floored.times(timeDuration));
      output.push(this.addUnit(floored, this.units[type], leftSeparator));

      // If the output has enough precision, break
      if (output.length >= precision) {
        break;
      }
    }

    // Return the formatted verbose string
    return `${negative ? "-" : ""}${output.join(rightSeparator) || addUnit(0, this.units.second, leftSeparator)}`;
  }

  /**
   * Converts a duration to binary notation.
   * @param {BigNumber} duration - The duration in milliseconds to convert to binary notation.
   * @returns {string} - The duration in binary notation.
   */
  binary(duration) {
    // Ensure the duration is a BigNumber
    duration = new BigNumber(duration);

    // Check if the duration is a valid number
    if (duration.isNaN()) {
      throw new Error("Invalid duration")
    }

    // Convert the duration to seconds and then to binary notation
    const seconds = duration.dividedBy(Time.Second).integerValue(BigNumber.ROUND_FLOOR);
    return seconds.toString(2);
  }

  /**
   * Converts a duration to colon notation (HH:mm:ss).
   * @param {BigNumber} duration - The duration in milliseconds to parse and display.
   * @returns {string} - The formatted colon notation string.
   */
  colon(duration) {
    duration = new BigNumber(duration)

    if (duration.isNaN()) throw new Error("Invalid duration")
    
    const hours = duration.dividedBy(Time.Hour).integerValue(BigNumber.ROUND_FLOOR);
    duration = duration.modulo(Time.Hour);
    
    const minutes = duration.dividedBy(Time.Minute).integerValue(BigNumber.ROUND_FLOOR);
    duration = duration.modulo(Time.Minute);
    
    const seconds = duration.dividedBy(Time.Second).integerValue(BigNumber.ROUND_FLOOR);

    return `${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(seconds)}`;
  }

  /**
   * Converts a duration to scientific notation.
   * @param {BigNumber} duration - The duration in milliseconds to convert to scientific notation.
   * @returns {string} - The duration in scientific notation.
   */
  scientific(duration) {
    // Ensure the duration is a BigNumber
    duration = new BigNumber(duration);

    // Check if the duration is a valid number
    if (duration.isNaN()) {
      throw new Error("Invalid duration")
    }

    // Convert the duration to scientific notation
    return duration.toExponential();
  }

  /**
   * Converts a duration to a compact string with formatted units.
   * @param {BigNumber} duration - The duration in milliseconds to parse and display.
   * @param {object} [options={ separator: " " }] - Options for formatting (optional).
   * @param {string} options.separator - The separator to be used between units (optional, default is " ").
   * @returns {string} - The formatted compact string.
   */
  compact(duration, { separator = " " } = {}) {
    // Ensure the duration is a BigNumber
    duration = new BigNumber(duration);

    // Check if the duration is a valid number
    if (duration.isNaN()) {
      throw new Error("Invalid duration")
    }

    const output = [];
    const negative = duration.isNegative();

    // Convert negative duration to positive for processing
    if (negative) {
      duration = duration.abs();
    }

    for (const [type, timeDuration] of kTimeDurations) {
      const division = duration.dividedBy(timeDuration);

      // Skip units with zero duration
      if (division.isLessThan(1)) {
        continue;
      }

      const floored = division.integerValue(BigNumber.ROUND_FLOOR);
      duration = duration.minus(floored.times(timeDuration));

      // Add formatted unit to the output array
      output.push(this.addUnit(floored, this.units[type], separator, { compact: true }));
    }

    // Build the final formatted string
    return output.length > 0 ? `${negative ? "-" : ""}${output.join(separator)}` : "0";
  }

  /**
   * Converts a duration to an elegant string with formatted units.
   * @param {BigNumber} duration - The duration in milliseconds to parse and display.
   * @param {number} [precision=7] - The precision of the output (optional, default is 7).
   * @param {object} [separators=DEFAULT_SEPARATORS] - Separators for formatting (optional, default is DEFAULT_SEPARATORS).
   * @param {string} separators.left - The left separator to be used between units (optional).
   * @param {string} separators.right - The right separator to be used between units (optional).
   * @returns {string} - The formatted elegant string.
   */
  elegant(duration, precision = 7, { left: leftSeparator = DEFAULT_SEPARATORS.left, right: rightSeparator = DEFAULT_SEPARATORS.right } = DEFAULT_SEPARATORS) {
    // Ensure the duration is a BigNumber
    duration = new BigNumber(duration);

    // Check if the duration is a valid number
    if (duration.isNaN()) {
      throw new Error("Invalid duration")
    }

    const output = [];
    const negative = duration.isNegative();

    // Convert negative duration to positive for processing
    if (negative) {
      duration = duration.abs();
    }

    for (const [type, timeDuration] of kTimeDurations) {
      const division = duration.dividedBy(timeDuration);

      // Skip units with zero duration
      if (division.isLessThan(1)) {
        continue;
      }

      const floored = division.integerValue(BigNumber.ROUND_FLOOR);
      duration = duration.minus(floored.times(timeDuration));

      // Add formatted unit to the output array
      output.push(this.addUnit(floored, this.units[type], leftSeparator));

      // Break if the output has reached the specified precision
      if (output.length >= precision) {
        break;
      }
    }

    // Build the final formatted string using a conjunction separator
    return `${negative ? "-" : ""}${joinWithConjunction(output, rightSeparator)}`;
  }

  /**
   * Converts a duration in BigNumber format into an object representing various time units.
   * @param {BigNumber} duration - The input duration in BigNumber format.
   * @returns {Object} - An object representing the duration in different time units.
   */
  object(duration) {
    // Ensure the duration is a BigNumber
    duration = new BigNumber(duration);

    // Check if the duration is a valid number
    if (duration.isNaN()) {
      throw new Error("Invalid duration");
    }
  
    const result = {};
  
    // Iterate over predefined time durations and calculate the count for each unit
    for (const [type, timeDuration] of kTimeDurations) {
      const count = duration.dividedBy(timeDuration).integerValue(BigNumber.ROUND_FLOOR);
      duration = duration.modulo(timeDuration);
      result[type] = count;
    }
  
    return result;
  }

  /**
   * Adds a unit, if non-zero, and formats the numeric part.
   * @param {number} time - The duration of said unit.
   * @param {object} unit - The unit language assets.
   * @param {string} separator - The separator to be used.
   * @param {object} options - Additional options for formatting (optional).
   * @param {boolean} options.compact - Whether to use compact formatting (optional).
   * @returns {string} - The formatted unit string.
   */
  addUnit(time, unit, separator, options = {}) {
    // Format the numeric part with commas for readability
    const formattedTime = time.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Check if compact formatting is requested
    if (options.compact === true) {
      // Return an empty string if time is zero
      if (time > 0) {
        return `${formattedTime}${unit.COMPACT}${separator}`;
      }

      return "";
    } else {
      // Check if the unit has a specific translation for the provided time
      if (Reflect.has(unit, time)) {
        return `${formattedTime}${separator}${Reflect.get(unit, time)}`;
      }

      // If not, use the default translation
      return `${formattedTime}${separator}${unit.DEFAULT}`;
    }
  }
}

/**
 * Formats an array of strings in an elegant way, adding separators and conjunctions.
 * @param {string[]} output - The array of strings to format.
 * @param {string} separator - The separator to be used between elements.
 * @returns {string} - The formatted elegant output string.
 */
function joinWithConjunction(output, separator) {
  // Check if the output array has only one item
  if (output.length <= 1) {
    return output.join(separator);
  }

  // Pop the last item from the array
  const lastItem = output.pop();

  // Build the formatted string with commas, conjunction, and separator
  return `${output.join(", ")} and ${lastItem}${separator}`;
}

/**
 * Pads a number with zero.
 * @param {number} num - The number to be padded.
 * @returns {string} - The padded number string.
 */
function padWithZero(num) {
  return num.toString().padStart(2, "0");
}