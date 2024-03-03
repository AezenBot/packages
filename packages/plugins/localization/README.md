<div align="center">
  <img src="https://media.discordapp.net/attachments/1183338541690933288/1213030129870045244/1709279300758.png?ex=65f3fd57&is=65e18857&hm=6e1ddb3225f69b537d7f591ad95444a9ce2c1231b122bd2692dc1ea0e9a47c7a&=&format=webp&quality=lossless&width=1025&height=380" />

  # @kyrobot/localization
  Collection of **open-source** and **free-to-use** modules used for the development of **Kyro Bot**
  
  [![npm](https://img.shields.io/npm/v/@kyrobot/localization?color=crimson&logo=npm&style=flat-square&label=@kyrobot/localization)](https://www.npmjs.com/package/@kyrobot/localization)
  [![npm](https://img.shields.io/npm/v/@kyrobot/duration?color=crimson&logo=npm&style=flat-square&label=@kyrobot/duration)](https://www.npmjs.com/package/@kyrobot/duration)
</div>

## 🩵 Support the Project
If you find Kyro valuable. helpful, and enjoy using it, please consider supporting its development. Your contributions help us maintain, improve, and expand the features of the bot for the entire community.

- **☕ Buy Us a Coffee:** If you prefer a one-time contribution, you can also buy us a coffee. Every coffee supports the developers and fuels late-night coding sessions to bring you the best Kyro experience.
- **⭐ Star the Repository:** Show your love for Kyro by starring the GitHub repository. It helps us gain visibility and attract more users to the community.
- **🌊 Spread the Word:** Share Kyro with your friends, communities, or on social media. Your word-of-mouth recommendations help us grow and create a vibrant user community.

## 📍 Features
- Written with JavaScript ES Module.
- Easy to use and understand.
- Quick setup.
- Lightweight and fast localization.

## ✅ Usage of the Module
Here's an example of how you can use the [localization](https://www.npmjs.com/package/@kyrobot/localization) module of Kyro.

### Prerequisites
- **Knowledge:** You must know how to use JavaScript, or how to code in general. It is unlikely that you will get help from using this module by making a new issue.
- **Node Version:** You must use the latest verion of node.
- **ES Module:** Altough optional, it is preferred to use ES Module in your new Node.JS projects. This module is written using JavaScript ES Module.

### Installation
```bash
npm install @kyrobot/localization
```
```bash
yarn add @kyrobot/localization
```
```bash
pnpm add @kyrobot/localization
```

### Folder Structure for the Languages
You can add more languages if you want. Only `.json` files are going to be recognized by the module.
```
languages/
├── en.json
├── tl.json
├── fr.json
├── ja.json
└── zh.json
```

### Example.js
```js
// Import the module
import Localization from "@kyrobot/localization";

// Create a new Localization class
const locale = new Localization(client, {
  /**
   * Where your languages are stored. You must specify the directory without the root directory.
   *
   * Other examples of path:
   * src/languages
   * src/bot/languages
   * modules/languages
   */
  path: "languages",
  autoReload: true, // If the module should auto reload the languages.
  autoReloadInterval: 3000 // The interval in milliseconds between reloading.
})

// IMPORTANT: This must be called, or else the
// languages won't load and the module won't work.
await locale.init();

// Now you can get translations! See the directory of the module for the rest of the functions
locale.getKey("en", "some.very.deep.path.object.to.the.translation")

```

## 🤝 Contribute to the Project
We appreciate your interest in contributing to the development of Kyro! Whether you're reporting issues, submitting pull requests, or helping with documentation, your contributions make Kyro better for everyone. Here's how you can get involved:
- **🐛 Found a Bug or Have a Feature Request?** If you've encountered a bug or have a feature in mind, [existing issues](https://github.com/Kyro-Discord-Bot/packages/issues) to see if it has already been reported. If not, feel free to [open a new issue](https://github.com/Kyro-Discord-Bot/packages/issues/new) with as much detail as possible, including steps to reproduce the bug or a clear description of the new feature.
- **💯 Improving Documentaion.** Improvements to documentation are always welcome. If you find any typos, unclear instructions, or missing information, please submit a pull request to enhance the documentation.

## 🦊 Your Support Matters
Whether it's a financial contribution, a star on GitHub, or simply telling your friends about Kyro, every bit of support makes a significant impact. We're grateful for the fantastic community that surrounds Kyro, and we look forward to building and improving together.

Thank you for being a part of the Kyro journey!