import React from 'react';
import styles from './macrosChart.styles.ts';
import {Text, View} from 'react-native';
import {PieChart, pieDataItem} from 'react-native-gifted-charts';
import {hS} from '@utils';
import {Colours} from '@constants';

type MacrosProps = {
  data: pieDataItem[];
  protein: number;
  carbs: number;
  fat: number;
  hasTitle?: boolean;
};

const MacrosChart = ({
  data,
  protein,
  carbs,
  fat,
  hasTitle = false,
}: MacrosProps) => {
  return (
    <View style={styles.foodMacroWrapper}>
      <View>
        {hasTitle ? <Text style={styles.macroTitle}>Food Macros</Text> : null}
        <PieChart
          data={data}
          radius={hS(65)}
          strokeWidth={3}
          strokeColor="#fff"
        />
      </View>
      <View style={styles.macrosRight}>
        <Text style={[styles.macrosTxt, {color: Colours.darkYellow}]}>
          Protein: {protein}g
        </Text>
        <Text style={[styles.macrosTxt, {color: Colours.midGreen}]}>
          Carbs: {carbs}g
        </Text>
        <Text style={[styles.macrosTxt, {color: Colours.midOrange}]}>
          Fat: {fat}g
        </Text>
      </View>
    </View>
  );
};

export default MacrosChart;
