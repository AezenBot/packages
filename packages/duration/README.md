<div align="center">
  <img src="https://media.discordapp.net/attachments/1183338541690933288/1213030129870045244/1709279300758.png?ex=65f3fd57&is=65e18857&hm=6e1ddb3225f69b537d7f591ad95444a9ce2c1231b122bd2692dc1ea0e9a47c7a&=&format=webp&quality=lossless&width=1025&height=380" />

  # @kyrobot/duration
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
- Supports more time units: decades, centuries, megayear, gigayear, and terayear.
- Added more duration formatter functions.
- Uses `bignumber.js` to handle large numbers when converting.
- Lightweight and easy-to-use.

## ✅ Usage of the Module
Here's an example of how you can use the [duration](https://www.npmjs.com/package/@kyrobot/duration) module of Kyro.

### Prerequisites
- **Knowledge:** You must know how to use JavaScript, or how to code in general. It is unlikely that you will get help from using this module by making a new issue.
- **Node Version:** You must use the latest verion of node.
- **ES Module:** Altough optional, it is preferred to use ES Module in your new Node.JS projects. This module is written using JavaScript ES Module.

### Installation
```bash
npm install @kyrobot/duration
```
```bash
yarn add @kyrobot/duration
```
```bash
pnpm add @kyrobot/duration
```

### Example.js
```js
// Import the module
import { Duration, DurationFormatter } from "@kyrobot/duration";

const converted = new Duration("an hour and 66 seconds");

console.log(converted.ms) // 3666000
console.log(converted.verbose()) // 1 hour 1 minute 6 seconds
console.log(converted.colon()) // 01:01:06 (HH:MM:SS format)
console.log(converted.compact()) // 1h  1m  6s
console.log(converted.elegant()) //  1 hour, 1 minute and 6 seconds
console.log(converted.binary()) // 111001010010
console.log(converted.scientific()) // 3.666e+6
console.lof(converted.object())

// You can also use the DurationFormatter separately if you want.
const formatter = new DurationFormatter()

console.log(formatter.verbose(converted.ms)) // 1 hour 1 minute 6 seconds
console.log(formatter.colon(converted.ms)) // 01:01:06 (HH:MM:SS format)
console.log(formatter.compact(converted.ms)) // 1h  1m  6s
console.log(formatter.elegant(converted.ms)) //  1 hour, 1 minute and 6 seconds
console.log(formatter.binary(converted.ms)) // 111001010010
console.log(formatter.scientific(converted.ms)) // 3.666e+6
console.log(formatter.object(converted.ms))
```
```json
{
  "terayear": "0",
  "gigayear": "0",
  "megayear": "0",
  "millennium": "0",
  "century": "0",
  "decade": "0",
  "year": "0",
  "month": "0",
  "week": "0",
  "day": "0",
  "hour": "1",
  "minute": "1",
  "second": "6",
  "millisecond": "0",
  "microsecond": "0",
  "nanosecond": "0"
}
```

### Time Unit Calculations
If you think something is wrong with this calculation, feel free to open an issue. Thank you.
```js
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
```

## ⚠️ Credits
This module is forked and modified from [sapphiredev's module](https://github.com/sapphiredev/utilities/tree/main/packages%2Fduration), so credits to the original author. If you have copyright issues, please contact me first.

## 🤝 Contribute to the Project
We appreciate your interest in contributing to the development of Kyro! Whether you're reporting issues, submitting pull requests, or helping with documentation, your contributions make Kyro better for everyone. Here's how you can get involved:
- **🐛 Found a Bug or Have a Feature Request?** If you've encountered a bug or have a feature in mind, [existing issues](https://github.com/Kyro-Discord-Bot/packages/issues) to see if it has already been reported. If not, feel free to [open a new issue](https://github.com/Kyro-Discord-Bot/packages/issues/new) with as much detail as possible, including steps to reproduce the bug or a clear description of the new feature.
- **💯 Improving Documentaion.** Improvements to documentation are always welcome. If you find any typos, unclear instructions, or missing information, please submit a pull request to enhance the documentation.

## 🦊 Your Support Matters
Whether it's a financial contribution, a star on GitHub, or simply telling your friends about Kyro, every bit of support makes a significant impact. We're grateful for the fantastic community that surrounds Kyro, and we look forward to building and improving together.

Thank you for being a part of the Kyro journey!