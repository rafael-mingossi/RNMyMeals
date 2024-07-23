import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './loader.styles.ts';

const Loader = () => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator />
    </View>
  );
};

export default Loader;
