import { EventEmitter } from "events";
import { promises } from "fs";
import path from "path";

/**
 * A class for handling localization and language data for a Discord bot.
 * @extends EventEmitter
 */
export default class Localization extends EventEmitter {
  /**
   * Creates an instance of the Localization class.
   * @param {Object} options - Localization options.
   * @param {string} options.path - The path to the directory containing language files.
   */
  constructor(options = {}) {
    super();

    const optionsExample = {
      path: "languages"
    };

    options = { ...optionsExample, ...options };

    // Validate parameters
    if (!options.path || typeof options.path !== "string") {
      throw new Error(`Invalid path provided. Expected a string. Received ${typeof options.path}`);
    }
    if (options.autoReload !== undefined && typeof options.autoReload !== "boolean") {
      throw new Error(`Invalid autoReload provided. Expected a boolean. Received ${typeof options.autoReload}`);
    }
    
    // Set properties
    this.options = options;
    this.languages = new Map();
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

    await this.processDirectory(this.options.path, this.languages);
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
    return this.languages;
  }

  /**
   * Checks if a path exists.
   * @private
   * @param {string} path - The path to check.
   * @returns {boolean} - A boolean indicating whether the path exists.
   */
  async pathExists(path) {
    path = `${process.cwd()}/${path}`;

    try {
      await promises.access(path);
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
    const isDirectory = (await promises.stat(directoryPath)).isDirectory();

    if (!isDirectory) {
      throw new Error(`Invalid path provided. Path "${directoryPath}" is not a directory.`);
    }

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
}
