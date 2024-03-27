<div align="center">
  <img src="https://cdn.discordapp.com/attachments/1183338541690933288/1222454458844319826/1710933761137.png?ex=6616466f&is=6603d16f&hm=7e84df9a40d246a27db2b4d5970e4f199e879404e7c986815c6cf62533a973da&" />

  # @aezen/logger
  Collection of **open-source** and **free-to-use** modules used for the development of **Aezen Bot**

  [![npm](https://img.shields.io/npm/v/@aezen/localization?color=crimson&logo=npm&style=flat-square&label=@aezen/localization)](https://www.npmjs.com/package/@aezen/localization)
  [![npm](https://img.shields.io/npm/v/@aezen/duration?color=crimson&logo=npm&style=flat-square&label=@aezen/duration)](https://www.npmjs.com/package/@aezen/duration)
  [![npm](https://img.shields.io/npm/v/@aezen/logger?color=crimson&logo=npm&style=flat-square&label=@aezen/logger)](https://www.npmjs.com/package/@aezen/logger)
</div>

## 🩵 Support the Project
If you find Aezen valuable. helpful, and enjoy using it, please consider supporting its development. Your contributions help us maintain, improve, and expand the features of the bot for the entire community.

- **☕ Buy Us a Coffee:** If you prefer a one-time contribution, you can also buy us a coffee. Every coffee supports the developers and fuels late-night coding sessions to bring you the best Aezen experience.
- **⭐ Star the Repository:** Show your love for Aezen by starring the GitHub repository. It helps us gain visibility and attract more users to the community.
- **🌊 Spread the Word:** Share Aezen with your friends, communities, or on social media. Your word-of-mouth recommendations help us grow and create a vibrant user community.

## 📍 Features
- Written with JavaScript ES Module.
- Uses `chalk` to colorize messages.
- Lightweight.

## ✅ Usage of the Module
A little warning that this module is specifically made for the needs of Aezen, so it may not be able to fulfill the customization that you desire. Here's an example of how you can use the [logger](https://www.npmjs.com/package/@aezen/logger) module of Aezen.

### Prerequisites
- **Knowledge:** You must know how to use JavaScript, or how to code in general. It is unlikely that you will get help from using this module by making a new issue.
- **Node Version:** You must use the latest verion of node.
- **ES Module:** Altough optional, it is preferred to use ES Module in your new Node.JS projects. This module is written using JavaScript ES Module.

### Installation
```bash
npm install @aezen/logger
```
```bash
yarn add @aezen/logger
```
```bash
pnpm add @aezen/logger
```

### Example.js
```js
// Import the module
import Logger from "@aezen/logger";

const logger = new Logger({
  timestamp: true, // If you want to include timestamp to your logger.
  prefix: "LOGGER" // The prefix of each log, default is null.
});

logger.log("This is a log message.")
logger.info("This is an info message.")
logger.warn("This is a warn message.")
logger.success("This is a success message.")
logger.debug("This is a debug message.")
logger.error("This is an error message.")
logger.fatal("This is a fatal message.")
```
<img src="https://raw.githubusercontent.com/AezenBot/packages/main/packages/utilities/logger/.github/logger.PNG" />

## 🤝 Contribute to the Project
We appreciate your interest in contributing to the development of Aezen! Whether you're reporting issues, submitting pull requests, or helping with documentation, your contributions make Aezen better for everyone. Here's how you can get involved:
- **🐛 Found a Bug or Have a Feature Request?** If you've encountered a bug or have a feature in mind, [existing issues](https://github.com/AezenBot/packages/issues) to see if it has already been reported. If not, feel free to [open a new issue](https://github.com/AezenBot/packages/issues/new) with as much detail as possible, including steps to reproduce the bug or a clear description of the new feature.
- **💯 Improving Documentaion.** Improvements to documentation are always welcome. If you find any typos, unclear instructions, or missing information, please submit a pull request to enhance the documentation.

## 🦊 Your Support Matters
Whether it's a financial contribution, a star on GitHub, or simply telling your friends about Aezen, every bit of support makes a significant impact. We're grateful for the fantastic community that surrounds Aezen, and we look forward to building and improving together.

Thank you for being a part of the Aezen journey!