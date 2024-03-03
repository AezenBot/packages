import chalk from "chalk";

/**
 * Extend Chalk library with custom color values.
 * @namespace
 */
chalk.purple = chalk.hex("#9000ff");

chalk.grayLight = chalk.hex("#c9c8c8");
chalk.cyanLight = chalk.hex("#8cf4ff");
chalk.magentaLight = chalk.hex("#c48cff");
chalk.greenLight = chalk.hex("#6bfaa0");
chalk.redLight = chalk.hex("#ff6161");

chalk.greenBrighter = chalk.hex("#53f576");
chalk.blueBrighter = chalk.hex("#008cff");
chalk.redBrighter = chalk.hex("#fc2d2d");
chalk.redBrighter2 = chalk.hex("#ff0000");
chalk.yellowBrighter = chalk.hex("#ffe600");
chalk.cyanBrighter = chalk.hex("#8ff4ff");
chalk.bgRedBrighter = chalk.bgHex("#ff0000");

/**
 * Object containing log level stylings.
 * @constant
 * @type {Object}
 * @property {function} success - Stylized function for success level.
 * @property {function} debug - Stylized function for debug level.
 * @property {function} info - Stylized function for info level.
 * @property {function} log - Stylized function for log level.
 * @property {function} warn - Stylized function for warn level.
 * @property {function} error - Stylized function for error level.
 * @property {function} fatal - Stylized function for fatal level.
 */
const levels = {
  success: chalk.greenBrighter.bold,
  debug: chalk.magenta.bold,
  info: chalk.blueBrighter.bold,
  log: chalk.cyanBrighter.bold,
  warn: chalk.yellowBrighter.bold,
  error: chalk.redLight.bold,
  fatal: chalk.bgRedBrighter.bold,
};

/**
 * Function to generate timestamp string.
 * @function
 * @returns {string} - Timestamp string.
 */
function timestamp() {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return new Date().toLocaleDateString("en-US", options);
}

/**
 * Function to create log info string with optional timestamp and prefix.
 * @function
 * @param {Object} options - Logging options.
 * @param {boolean} options.timestamp - Include timestamp in log info.
 * @param {string} options.prefix - Prefix for log messages.
 * @param {string} level - Log level.
 * @returns {string} - Stylized log info string.
 */
function createInfo(options, level) {
  const date = options.timestamp === true ? chalk.grayLight(`[${timestamp()}]`) : null;
  const prefix = options.prefix ? chalk.bgGray.bold(`[ ${options.prefix} ]`) : null;
  level = levels[level](level.toUpperCase());

  return `${prefix ? `${prefix} ` : ""}${date ? `${date} ` : ""}${level}`;
}

/**
 * Default options for logger.
 * @constant
 * @type {Object}
 * @property {boolean} timestamp - Include timestamp in log info.
 * @property {string} prefix - Prefix for log messages.
 */
const defaultOptions = {
  timestamp: true,
  prefix: null,
};

/**
 * Logger class for customizable console logging.
 * @class
 * @param {Object} options - Logger options.
 * @param {boolean} options.timestamp - Include timestamp in log info.
 * @param {string} options.prefix - Prefix for log messages.
 */
export default class Logger {
  constructor(options = {}) {
    /**
     * Logger options.
     * @member {Object}
     */
    options = { ...defaultOptions, ...options };

    /**
     * Logger levels.
     * @member {Object}
     */
    this.levels = levels;

    /**
     * Chalk library for stylized logging.
     * @member {Object}
     */
    this.chalk = chalk;

    /**
     * Logger instance options.
     * @member {Object}
     */
    this.options = options;
  }

  /**
   * Log messages with "log" level.
   * @function
   * @param {...any} messages - Log messages.
   */
  log(...messages) {
    messages.forEach((arg) => {
      if (typeof arg !== "string") {
        console.log(`${createInfo(this.options, "log")}\n`, arg);
      } else {
        console.log(`${createInfo(this.options, "log")}  ${chalk.cyanLight(arg)}`);
      }
    });
  }

  /**
   * Log messages with "info" level.
   * @function
   * @param {...any} messages - Log messages.
   */
  info(...messages) {
    messages.forEach((arg) => {
      if (typeof arg !== "string") {
        console.info(`${createInfo(this.options, "info")}\n`, arg);
      } else {
        console.info(`${createInfo(this.options, "info")}  ${chalk.blue(arg)}`);
      }
    });
  }

  /**
   * Log messages with "warn" level.
   * @function
   * @param {...any} messages - Log messages.
   */
  warn(...messages) {
    messages.forEach((arg) => {
      if (typeof arg !== "string") {
        console.warn(`${createInfo(this.options, "warn")}\n`, arg);
      } else {
        console.warn(`${createInfo(this.options, "warn")}  ${chalk.yellowBright(arg)}`);
      }
    });
  }

  /**
   * Log messages with "success" level.
   * @function
   * @param {...any} messages - Log messages.
   */
  success(...messages) {
    messages.forEach((arg) => {
      if (typeof arg !== "string") {
        console.log(`${createInfo(this.options, "success")}\n`, arg);
      } else {
        console.log(`${createInfo(this.options, "success")}  ${chalk.greenLight(arg)}`);
      }
    });
  }

  /**
   * Log messages with "debug" level.
   * @function
   * @param {...any} messages - Log messages.
   */
  debug(...messages) {
    messages.forEach((arg) => {
      if (typeof arg !== "string") {
        console.debug(`${createInfo(this.options, "debug")}\n`, arg);
      } else {
        console.debug(`${createInfo(this.options, "debug")}  ${chalk.magentaLight(arg)}`);
      }
    });
  }

  /**
   * Log messages with "error" level.
   * @function
   * @param {...any} messages - Log messages.
   */
  error(...messages) {
    messages.forEach((arg) => {
      if (typeof arg !== "string") {
        console.log(`${createInfo(this.options, "error")}\n`, arg);
      } else {
        console.log(`${createInfo(this.options, "error")}  ${chalk.redLight(arg)}`);
      }
    });
  }

  /**
   * Log messages with "fatal" level.
   * @function
   * @param {...any} messages - Log messages.
   */
  fatal(...messages) {
    messages.forEach((arg) => {
      if (typeof arg !== "string") {
        console.log(`${createInfo(this.options, "fatal")}\n`, arg);
      } else {
        console.log(`${createInfo(this.options, "fatal")}  ${chalk.redBrighter.underline(arg)}`);
      }
    });
  }
}