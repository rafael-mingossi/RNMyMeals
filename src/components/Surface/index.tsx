import React, {ReactNode} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {mS} from '@utils';
import {Colours} from '@constants';

type SurfaceProps = {
  children: ReactNode;
  stylesExtra?: StyleProp<ViewStyle>;
};

const Surface = ({children, stylesExtra}: SurfaceProps) => {
  return <View style={[styles.surface, stylesExtra]}>{children}</View>;
};

const styles = StyleSheet.create({
  surface: {
    padding: mS(15),
    width: '100%',
    borderRadius: 8,
    backgroundColor: Colours.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default Surface;
