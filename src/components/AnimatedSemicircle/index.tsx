import React, {forwardRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Canvas, Path, Group} from '@shopify/react-native-skia';
import {Colours} from '@constants';

interface AnimatedProgressProps {
  progress?: number;
  maxValue: number;
  minValue: number;
}

const AnimatedSemicircle = forwardRef<View, AnimatedProgressProps>(
  ({progress = 0, maxValue = 2000, minValue = 0}, ref) => {
    const width = 256;
    const height = 128;
    const strokeWidth = 15;
    const radius = height - strokeWidth / 2;

    const path = `
    M ${strokeWidth / 2} ${height}
    A ${radius} ${radius} 0 0 1 ${width - strokeWidth / 2} ${height}
  `;

    return (
      <View ref={ref} style={styles.container}>
        <Canvas style={{width, height}}>
          <Group>
            <Path
              path={path}
              color="lightgray"
              style="stroke"
              strokeWidth={strokeWidth}
            />
            <Path
              path={path}
              color={Colours.green}
              style="stroke"
              strokeWidth={strokeWidth}
              strokeCap="round"
              start={0}
              end={progress}
            />
          </Group>
        </Canvas>
        <View style={styles.labelsContainer}>
          <Text style={styles.label}>{minValue || 0}</Text>
          <Text style={styles.label}>{maxValue}</Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 286,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
  },
  label: {
    fontSize: 12,
    color: 'black',
  },
});

export default AnimatedSemicircle;
