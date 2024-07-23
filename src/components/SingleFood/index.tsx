import React, {FC, useEffect, useMemo, useRef} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import BouncyCheckbox, {
  BouncyCheckboxHandle,
} from 'react-native-bouncy-checkbox';
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
  // const [isChecked, setIsChecked] = useState(false);
  const {addMealItem, mealsItems, removeMealItem, isChecked, setIsChecked} =
    useLists();
  const bouncyCheckboxRef = useRef<BouncyCheckboxHandle>(null);

  //Accessing which item was clicked via its index and ticking the checkbox
  const currentIsChecked = useMemo(
    () => isChecked?.[index],
    [isChecked, index],
  );
  const handleRemoveLunchItem = () => {
    // Find the added item's ID using Food ID and returning it
    if (isFood) {
      return mealsItems.find(addedItem => addedItem.food?.food_id === item.id)
        ?.id;
    } else {
      return mealsItems.find(
        addedItem => addedItem.recipe?.recipe_id === item.id,
      )?.id;
    }
  };

  useEffect(() => {
    handleRemoveLunchItem();
  }, [item, items, index]);

  const handlePickedItem = () => {
    setIsChecked(prevChecked => ({
      ...prevChecked,
      [index]: !prevChecked?.[index],
    }));

    if (!items?.length) {
      console.log('ITEMS WAS NOT PASSED');
      return;
    }
    //Get the current clicked item and update it directly
    if (item.id === items[index]?.id) {
      item.checked = !isChecked;

      if (isFood) {
        const objWithoutChecked = Object.assign({}, item, {
          checked: undefined,
        });

        addMealItem(objWithoutChecked, null, objWithoutChecked.serv_size, null);
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

        addMealItem(null, backToRecipe, null, backToRecipe.serving);
      }

      if (handleRemoveLunchItem() && isChecked) {
        removeMealItem(String(handleRemoveLunchItem()));
      }
    }
  };

  return (
    <View style={[styles.container, hasCheckBox && styles.padding]}>
      {hasCheckBox ? (
        <BouncyCheckbox
          ref={bouncyCheckboxRef}
          isChecked={currentIsChecked}
          style={styles.checkBox}
          fillColor={Colours.green}
          iconStyle={{
            borderColor: Colours.green,
            borderRadius: 4,
            borderWidth: 2,
          }}
          size={hS(21)}
          unFillColor="#FFFFFF"
          disableText
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
