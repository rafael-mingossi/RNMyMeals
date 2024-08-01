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
      unstable_reactLegacyComponentNames: ['Video', 'CameraView'],
    },
    ios: {
      unstable_reactLegacyComponentNames: ['Video', 'CameraView'],
    },
  },
};
