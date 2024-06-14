import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {SingleFoodEditPropsNavigation} from '@config';

const SingleFoodEdit: FC<SingleFoodEditPropsNavigation> = ({
  navigation,
  route,
}) => {
  const val = route.params.item;
  return (
    <View>
      <Text>Oi</Text>
    </View>
  );
};

export default SingleFoodEdit;
