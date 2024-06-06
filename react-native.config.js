module.exports = {
  assets: ['./src/assets/fonts'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
  project: {
    android: {
      unstable_reactLegacyComponentNames: ['Video'],
    },
    ios: {
      unstable_reactLegacyComponentNames: ['Video'],
    },
  },
};
