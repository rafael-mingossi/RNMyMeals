import React, {forwardRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Canvas,
  Path,
  Group,
  SkFont,
  Text as Txt,
} from '@shopify/react-native-skia';
import {Colours, Fonts} from '@constants';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import {formatNumberWithCommas, hS, mS, vS} from '@utils';
import {Surface} from '@components';

interface AnimatedProgressProps {
  progress: SharedValue<number>;
  maxValue: number;
  font: SkFont;
  totalCals: SharedValue<number>;
}

const STROKE_WIDTH = 25;
const AnimatedSemicircle = forwardRef<View, AnimatedProgressProps>(
  ({progress = 0, maxValue = 2000, font, totalCals}, ref) => {
    const width = 256;
    const height = 128;
    const strokeWidth = STROKE_WIDTH;
    const radius = height - strokeWidth / 2;

    const path = `
      M ${strokeWidth / 2} ${height}
      A ${radius} ${radius} 0 0 1 ${width - strokeWidth / 2} ${height}
    `;

    const targetText = useDerivedValue(
      () => `${Math.round(totalCals.value)}`,
      [],
    );

    const widthRes = hS(width);
    const valRes = hS(2.2);

    const textX = useDerivedValue(() => {
      const _fontSize = font.measureText(targetText.value);
      if (_fontSize.width <= 20) {
        return widthRes / valRes;
      } else if (_fontSize.width <= 55) {
        return radius + 6 - _fontSize.width / 2.2;
      } else {
        return radius - _fontSize.width / 3;
      }
    }, []);

    return (
      <Surface>
        <View ref={ref} style={[styles.container]}>
          <Text style={styles.mealHeader}>Calorie Budget</Text>
          <Text style={styles.mealValue}>
            {formatNumberWithCommas(maxValue)}
          </Text>
          <Canvas
            style={[
              styles.canvasContainer,
              {width: width, height: height + vS(12)},
            ]}>
            <Group>
              <Path
                path={path}
                color={Colours.lightGray}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeCap="round"
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
              <Txt
                x={hS(width) / hS(2.75)}
                y={height / 1.35}
                text={'Cals'}
                font={font}
                color="black"
              />
              <Txt
                x={textX}
                y={height}
                text={targetText}
                font={font}
                color={Colours.blue}
              />
            </Group>
          </Canvas>
        </View>
      </Surface>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvasContainer: {
    // backgroundColor: 'blue',
  },
  mealHeader: {
    fontFamily: Fonts.semiBold,
    fontSize: mS(20),
  },
  mealValue: {
    fontFamily: Fonts.bold,
    fontSize: mS(22),
    color: Colours.blue,
    marginBottom: vS(10),
  },
});

export default AnimatedSemicircle;
