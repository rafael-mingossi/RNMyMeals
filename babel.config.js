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
          '@api': './src/api',
          '@types': './src/types',
          '@stores': './src/stores',
          '@constants': './src/constants',
          '@utils': './src/utils',
          '@components': './src/components',
          '@config': './src/config',
          '@providers': './src/providers',
          '@services': './src/services',
          '@env': ['node_modules/react-native-dotenv'],
        },
      },
    ],
  ],
};
