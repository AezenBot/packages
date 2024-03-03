import { EventEmitter } from "events";
import { promises } from "fs";
import path from "path";

/**
 * A class for handling localization and language data for a Discord bot.
 * @extends EventEmitter
 */
export default class Localization extends EventEmitter {
  /**
   * Default options for the Localization class.
   * @type {Object}
   * @static
   */
  static optionsExample = {
    path: "languages",
    autoReload: false,
    autoReloadInterval: 60000 * 60 // 1 hour
  };

  /**
   * Creates an instance of the Localization class.
   * @param {Object} options - Localization options.
   * @param {string} options.path - The path to the directory containing language files.
   */
  constructor(options = {}) {
    super();

    options = { ...Localization.optionsExample, ...options };

    // Validate parameters
    if (!options.path || typeof options.path !== "string") {
      throw new Error(`Invalid path provided. Expected a non-empty string for 'path', but received ${JSON.stringify(options.path)} (${typeof options.path}).`);
    }

    if (options.autoReload !== undefined && typeof options.autoReload !== "boolean") {
      throw new Error(`Invalid autoReload provided. Expected a boolean, but received ${JSON.stringify(options.autoReload)} (${typeof options.autoReload}).`);
    }

    if (options.autoReloadInterval !== undefined && typeof options.autoReloadInterval !== "number") {
      throw new Error(`Invalid autoReloadInterval provided. Expected a number, but received ${JSON.stringify(options.autoReloadInterval)} (${typeof options.autoReloadInterval}).`);
    }

    /**
     * Localization options.
     * @type {Object}
     */
    this.options = options;

    /**
     * A map containing loaded language data.
     * @type {Map}
     */
    this.languages = new Map();

    /**
     * Indicates whether the Localization instance has been initialized.
     * @type {boolean}
     */
    this.initialized = false;
  }

  /**
   * Initializes the Localization instance by loading language files.
   * @throws {Error} - Throws an error if the path is invalid or language files cannot be processed.
   */
  async init() {
    const exists = await this.pathExists(this.options.path);

    if (!exists) {
      throw new Error(`Invalid path provided. Path "${this.options.path}" does not exist in your root directory.`);
    }

    if (this.initialized) {
      throw new Error("Localization has already been initialized.");
    }

    try {
      await this.processDirectory(this.options.path, this.languages);
      this.emit("ready");
      this.initialized = true;

      if (this.options.autoReload) {
        this.setupAutoReload();
      }
    } catch (error) {
      throw new Error(`Error during initialization: ${error.message}`);
    }
  }

  /**
   * Retrieves a localized string for a given language and key, with optional placeholders.
   * @param {string} language - The language code.
   * @param {string} key - The key to retrieve from the language file.
   * @param {Object} [placeholders={}] - Optional placeholders to replace in the string.
   * @returns {string} - The localized string.
   * @throws {Error} - Throws an error if the language, key, or placeholders are invalid.
   */
  getKey(language, key, placeholders = {}) {
    if (!this.initialized) throw new Error("Localization has not been initialized.")

    const languageData = this.languages.get(language);

    if (!languageData) {
      throw new Error(`Invalid language provided. Expected a valid language. Received ${language}`);
    }

    const keys = key.split(".");
    let nestedValue = languageData;

    for (const nestedKey of keys) {
      if (!nestedValue[nestedKey]) {
        throw new Error(`Invalid key provided. Expected a valid key. Received ${key}`);
      }

      nestedValue = nestedValue[nestedKey];
    }

    // Replace placeholders in the string
    if (typeof nestedValue === "string" && Object.keys(placeholders).length > 0) {
      nestedValue = this.replacePlaceholders(nestedValue, placeholders);
    }

    return nestedValue;
  }

  /**
   * Retrieves the raw language data for a given language.
   * @param {string} language - The language code.
   * @returns {Object} - The raw language data.
   * @throws {Error} - Throws an error if the language is invalid.
   */
  getRaw(language) {
    if (!this.initialized) throw new Error("Localization has not been initialized.")

    const languageData = this.languages.get(language);

    if (!languageData) {
      throw new Error(`Invalid language provided. Expected a valid language. Received ${language}`);
    }

    return languageData;
  }

  /**
   * Retrieves the map of loaded languages.
   * @returns {Map} - A map containing loaded language data.
   */
  getLanguages() {
    if (!this.initialized) throw new Error("Localization has not been initialized.")

    return this.languages;
  }

  /**
   * Checks if a path exists.
   * @private
   * @param {string} checkPath - The path to check.
   * @returns {boolean} - A boolean indicating whether the path exists.
   */
  async pathExists(checkPath) {
    const fullPath = path.join(process.cwd(), checkPath);

    try {
      await promises.access(fullPath);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Processes a directory and loads language files into a map.
   * @private
   * @param {string} directoryPath - The path to the directory.
   * @param {Map} currentMap - The map to store language data.
   * @throws {Error} - Throws an error if the path is not a directory.
   */
  async processDirectory(directoryPath, currentMap) {
    try {
      const isDirectory = (await promises.stat(directoryPath)).isDirectory();
      const entries = await promises.readdir(directoryPath);

      for (const entry of entries) {
        const entryPath = path.join(directoryPath, entry);
        const isSubfolder = (await promises.stat(entryPath)).isDirectory();

        // Skip processing folders
        if (isSubfolder) {
          continue;
        }

        // Check if the file has a .json extension
        if (path.extname(entry) === ".json") {
          // Process files here
          const content = await promises.readFile(entryPath, "utf-8");

          // Remove file extension from entry
          const entryWithoutExtension = path.parse(entry).name;

          currentMap.set(entryWithoutExtension, JSON.parse(content));
        }
      }
    } catch (error) {
      throw error; // Re-throw the error for consistent error handling
    }
  }

  /**
   * Replaces placeholders in a string with provided values.
   * @private
   * @param {string} string - The string with placeholders.
   * @param {Object} placeholders - The object containing placeholder values.
   * @returns {string} - The string with replaced placeholders.
   */
  replacePlaceholders(string, placeholders) {
    return string.replace(/\{(\w+)\}/g, (match, placeholder) => {
      return placeholders[placeholder] || match;
    });
  }

  /**
   * Sets up auto-reloading of language files at a specified interval.
   * @private
   */
  setupAutoReload() {
    const { autoReloadInterval } = this.options;

    this.autoReloadInterval = setInterval(async () => {
      try {
        await this.processDirectory(this.options.path, this.languages);
        this.emit("reload");
      } catch (error) {
        console.error(`Error during auto-reload: ${error.message}`);
      }
    }, autoReloadInterval);
  }

  /**
   * Stops auto-reloading of language files.
   * @private
   */
  stopAutoReload() {
    if (this.autoReloadInterval) {
      clearInterval(this.autoReloadInterval);
      this.autoReloadInterval = null;
    }
  }
}