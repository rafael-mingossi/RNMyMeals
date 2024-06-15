import React, {FC} from 'react';
import {Text, View, SafeAreaView, StatusBar, Alert} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from 'react-native-reanimated';
import {useDeleteFood} from '@api';
import {SingleFoodPropsNavigation} from '@config';
import styles from './singleFoodScreen.styles.ts';
import {Colours} from '@constants';
import {ButtonText} from '@components';

const SingleFoodScreen: FC<SingleFoodPropsNavigation> = ({
  navigation,
  route,
}) => {
  const {mutate: deleteFood} = useDeleteFood();
  let val = route.params.item;

  const confirmDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this product',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            deleteFood(val.id, {
              onSuccess: () => navigation.goBack(),
              onError: e => console.log('ERROR DELETING =>>', e),
            }),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colours.green} barStyle={'light-content'} />
      <View style={styles.innerWrapper}>
        {val?.food_img.includes('supabase.co') ? (
          <Animated.Image
            entering={FadeIn.duration(400).delay(200)}
            source={{uri: val?.food_img}}
            style={[styles.image]}
          />
        ) : (
          <Animated.Image
            entering={FadeIn.duration(400).delay(200)}
            style={styles.imageNo}
            source={require('../../assets/images/camera_placeholder.png')}
          />
        )}
        <View style={styles.detailsWrapper}>
          <Animated.Text
            entering={FadeInLeft.duration(400).delay(200)}
            style={styles.foodName}>
            {val?.label}
          </Animated.Text>
          <Animated.Text
            entering={FadeInRight.duration(400).delay(400)}
            style={styles.calories}>
            Calories: {val?.calories}
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(400).delay(400)}
            style={styles.serv}>
            Serving: {val.serv_size} ({val.serv_unit})
          </Animated.Text>
          <Animated.View
            style={styles.row}
            entering={FadeInLeft.duration(400).delay(400)}>
            <Animated.Text style={styles.macros}>
              Protein: <Text style={styles.macrosReg}>{val.protein}g</Text>
            </Animated.Text>
            <Animated.Text style={styles.macros}>
              Carbs: <Text style={styles.macrosReg}>{val.carbs}g</Text>
            </Animated.Text>
          </Animated.View>
          <Animated.View
            style={styles.row}
            entering={FadeInRight.duration(400).delay(400)}>
            <Animated.Text
              entering={FadeInRight.duration(400).delay(400)}
              style={styles.macros}>
              Sodium: <Text style={styles.macrosReg}>{val.sodium}mg</Text>
            </Animated.Text>
            <Animated.Text
              entering={FadeInLeft.duration(400).delay(400)}
              style={styles.macros}>
              Fat: <Text style={styles.macrosReg}>{val.fat}g</Text>
            </Animated.Text>
          </Animated.View>
          <Animated.Text
            entering={FadeInDown.duration(400).delay(400)}
            style={styles.macros}>
            Fibre: <Text style={styles.macrosReg}>{val.fibre}g</Text>
          </Animated.Text>
        </View>

        <View style={styles.footer}>
          <ButtonText
            children={'Edit'}
            onPress={() => navigation.navigate('SingleFoodEdit', {item: val})}
          />
          <ButtonText children={'Delete'} onPress={confirmDelete} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingleFoodScreen;
