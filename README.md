

# Getting Started

# MyDetoxApp

Very simple React Native e-commerce application created for Detox mobile automation testing for Android.

## Features

- Home screen with product list
- Login functionality
- Product details page
- Add to Cart
- Cart total calculation
- Checkout flow

## Technology Stack

- React Native
- Detox
- Jest
- Android Emulator (Pixel 7)

## Project Structure

e2e/
└── TS01_AppLaunch.test.js
    

src/
├── screens/
├── context/
├── data/

App.js

## Installation

Install dependencies:

```bash
npm install

Run Android application:

npx react-native run-android
Run Detox Tests

To start the Metro dev server, run the following command from the root of your React Native project:
npx react-native start

Build:

npx detox build --configuration android.emu.debug

Run tests:

npx detox test --configuration android.emu.debug

# Test Document
Following excel document exist for your reference 
MyDetoxApp_Test1executionSummary
MyDetoxApp_TestCases 


# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
