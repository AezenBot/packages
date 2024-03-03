<div align="center">
  <img src="https://media.discordapp.net/attachments/1183338541690933288/1213030129870045244/1709279300758.png?ex=65f3fd57&is=65e18857&hm=6e1ddb3225f69b537d7f591ad95444a9ce2c1231b122bd2692dc1ea0e9a47c7a&=&format=webp&quality=lossless&width=1025&height=380" />

  # @kyrobot/logger
  Collection of **open-source** and **free-to-use** modules used for the development of **Kyro Bot**

  [![npm](https://img.shields.io/npm/v/@kyrobot/localization?color=crimson&logo=npm&style=flat-square&label=@kyrobot/localization)](https://www.npmjs.com/package/@kyrobot/localization)
  [![npm](https://img.shields.io/npm/v/@kyrobot/duration?color=crimson&logo=npm&style=flat-square&label=@kyrobot/duration)](https://www.npmjs.com/package/@kyrobot/duration)
  [![npm](https://img.shields.io/npm/v/@kyrobot/logger?color=crimson&logo=npm&style=flat-square&label=@kyrobot/logger)](https://www.npmjs.com/package/@kyrobot/logger)
</div>

## 🩵 Support the Project
If you find Kyro valuable. helpful, and enjoy using it, please consider supporting its development. Your contributions help us maintain, improve, and expand the features of the bot for the entire community.

- **☕ Buy Us a Coffee:** If you prefer a one-time contribution, you can also buy us a coffee. Every coffee supports the developers and fuels late-night coding sessions to bring you the best Kyro experience.
- **⭐ Star the Repository:** Show your love for Kyro by starring the GitHub repository. It helps us gain visibility and attract more users to the community.
- **🌊 Spread the Word:** Share Kyro with your friends, communities, or on social media. Your word-of-mouth recommendations help us grow and create a vibrant user community.

## 📍 Features
- Written with JavaScript ES Module.
- Uses `chalk` to colorize messages.
- Lightweight.

## ✅ Usage of the Module
A little warning that this module is specifically made for the needs of Kyro, so it may not be able to fulfill the customization that you desire. Here's an example of how you can use the [logger](https://www.npmjs.com/package/@kyrobot/logger) module of Kyro.

### Prerequisites
- **Knowledge:** You must know how to use JavaScript, or how to code in general. It is unlikely that you will get help from using this module by making a new issue.
- **Node Version:** You must use the latest verion of node.
- **ES Module:** Altough optional, it is preferred to use ES Module in your new Node.JS projects. This module is written using JavaScript ES Module.

### Installation
```bash
npm install @kyrobot/logger
```
```bash
yarn add @kyrobot/logger
```
```bash
pnpm add @kyrobot/logger
```

### Example.js
```js
// Import the module
import Logger from "@kyrobot/logger";

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
<img src="https://raw.githubusercontent.com/Kyro-Discord-Bot/packages/main/packages/utilities/logger/.github/logger.PNG" />

## 🤝 Contribute to the Project
We appreciate your interest in contributing to the development of Kyro! Whether you're reporting issues, submitting pull requests, or helping with documentation, your contributions make Kyro better for everyone. Here's how you can get involved:
- **🐛 Found a Bug or Have a Feature Request?** If you've encountered a bug or have a feature in mind, [existing issues](https://github.com/Kyro-Discord-Bot/packages/issues) to see if it has already been reported. If not, feel free to [open a new issue](https://github.com/Kyro-Discord-Bot/packages/issues/new) with as much detail as possible, including steps to reproduce the bug or a clear description of the new feature.
- **💯 Improving Documentaion.** Improvements to documentation are always welcome. If you find any typos, unclear instructions, or missing information, please submit a pull request to enhance the documentation.

## 🦊 Your Support Matters
Whether it's a financial contribution, a star on GitHub, or simply telling your friends about Kyro, every bit of support makes a significant impact. We're grateful for the fantastic community that surrounds Kyro, and we look forward to building and improving together.

Thank you for being a part of the Kyro journey!