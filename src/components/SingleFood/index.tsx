import React, {FC, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './singleFood.styles.ts';
import {Colours, Fonts} from '@constants';
import {hS} from '@utils';
import {NavigationScreenProp} from '@config';
import {useNavigation} from '@react-navigation/native';
import {SingleFoodType} from '@types';
import {useLists} from '@providers';

type SingleFoodProps = {
  index: number;
  item: SingleFoodType;
  items?: SingleFoodType[];
  hasCheckBox?: boolean;
  onPress?: () => void;
  isFood?: boolean;
};

const SingleFood: FC<SingleFoodProps> = ({
  item,
  index,
  hasCheckBox = false,
  items,
  onPress,
  isFood,
}) => {
  const navigation: NavigationScreenProp = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const {addLunchItem, lunchItems, removeLunchItem} = useLists();
  console.log('lunchItems =>', lunchItems);
  const handleRemoveLunchItem = () => {
    // Find the added item's ID using Food ID and returning it
    if (isFood) {
      return lunchItems.find(addedItem => addedItem.food?.food_id === item.id)
        ?.id;
    } else {
      return lunchItems.find(
        addedItem => addedItem.recipe?.recipe_id === item.id,
      )?.id;
    }
  };

  useEffect(() => {
    handleRemoveLunchItem();
  }, [item, items, index]);

  const handlePickedItem = () => {
    setIsChecked(!isChecked);

    //Get the current clicked item and update it directly
    if (item.id === items!![index]?.id) {
      item.checked = !isChecked;
      if (isFood) {
        const objWithoutChecked = Object.assign({}, item, {
          checked: undefined,
        });

        addLunchItem(
          objWithoutChecked,
          null,
          objWithoutChecked.serv_size,
          null,
        );
      } else {
        const objWithoutChecked = Object.assign({}, item, {
          checked: undefined,
        });

        const backToRecipe = {
          created_at: objWithoutChecked.created_at,
          id: objWithoutChecked.id,
          img: objWithoutChecked.food_img,
          name: objWithoutChecked.label,
          serv_unit: objWithoutChecked.serv_unit,
          serving: objWithoutChecked.serv_size,
          tCalories: objWithoutChecked.calories,
          tCarbs: objWithoutChecked.carbs,
          tFat: objWithoutChecked.fat,
          tFibre: objWithoutChecked.fibre || 0,
          tProtein: objWithoutChecked.protein,
          tSodium: objWithoutChecked.sodium || 0,
          user_id: objWithoutChecked.user_id,
        };

        addLunchItem(null, backToRecipe, null, backToRecipe.serving);
      }

      if (handleRemoveLunchItem() && isChecked) {
        removeLunchItem(String(handleRemoveLunchItem()));
      }
    }
  };

  return (
    <View style={[styles.container, hasCheckBox && styles.padding]}>
      {hasCheckBox ? (
        <BouncyCheckbox
          isChecked={isChecked}
          style={styles.checkBox}
          fillColor={Colours.green}
          iconStyle={{
            borderColor: Colours.green,
            borderRadius: 4,
            borderWidth: 2,
          }}
          size={hS(21)}
          unFillColor="#FFFFFF"
          text=""
          textStyle={{fontFamily: Fonts.regular}}
          onPress={handlePickedItem}
          innerIconStyle={{borderColor: Colours.green, borderRadius: 4}}
        />
      ) : null}

      <TouchableOpacity style={styles.imgTxtWrapper} onPress={onPress}>
        <Image source={{uri: item.food_img!}} style={styles.img} />
        <View style={styles.textWrapper}>
          <Text style={styles.textLabel}>{item.label}</Text>
          <Text style={styles.text}>
            {item.calories} cals
            <Text style={{color: Colours.black}}>
              {' '}
              / Serv. ({item.serv_size} {item.serv_unit})
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SingleFood;
