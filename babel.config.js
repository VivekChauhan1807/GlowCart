// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: ['react-native-reanimated/plugin'],
// };
// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     'react-native-worklets/plugin'
//   ],
// };
// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // TypeScript ko .js/.ts/.tsx sab par allow karo:
    ['@babel/plugin-transform-typescript', {
      isTSX: true,
      allowDeclareFields: true,
      allExtensions: true
    }],
    // Reanimated ka naya plugin (warnings bhi band ho jayenge)
    'react-native-worklets/plugin',
  ],
};