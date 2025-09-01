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