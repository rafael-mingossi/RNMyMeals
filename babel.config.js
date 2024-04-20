module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@screens': './src/screens',
          '@config': './src/config',
          '@services': './src/services',
          '@env': ['node_modules/react-native-dotenv'],
        },
      },
    ],
  ],
};
