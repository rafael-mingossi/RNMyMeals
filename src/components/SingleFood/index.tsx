import React, {FC, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './singleFood.styles.ts';
import {Colours, Fonts} from '@constants';
import {hS} from '@utils';
import {NavigationScreenProp} from '@config';
import {useNavigation} from '@react-navigation/native';
import {SingleFoodType, SingleRecipeType, Tables} from '@types';
import {useLists} from '../../providers/ListsProvider.tsx';
import {useFiltered} from '@providers';

type Food = Tables<'foods'>;

type SingleFoodProps = {
  index: number;
  item: SingleFoodType;
  hasCheckBox?: boolean;
  onPress?: () => void;
};

const SingleFood: FC<SingleFoodProps> = ({
  item,
  index,
  hasCheckBox = false,
  onPress,
}) => {
  const {filteredFoodsContext} = useFiltered();
  const navigation: NavigationScreenProp = useNavigation();
  const [items, setItems] = useState<SingleFoodType[]>(filteredFoodsContext);
  const {addLunchItem, lunchItems, removeLunchItem} = useLists();
  const handleRemoveLunchItem = () => {
    // Find the added item's ID using Food ID and returning it
    return lunchItems.find(addedItem => addedItem.food?.food_id === item.id)
      ?.id;
  };
  useEffect(() => {
    handleRemoveLunchItem();
  }, [item, items, index]);

  const handlePickedItem = () => {
    const picked = items[index]?.checked;

    //Get the current clicked item and update it directly
    if (item.id === items[index]?.id) {
      item.checked = !picked;

      const objWithoutChecked = Object.assign({}, item, {
        checked: undefined,
      });

      addLunchItem(objWithoutChecked, null, objWithoutChecked.serv_size, null);

      if (handleRemoveLunchItem() && picked) {
        removeLunchItem(String(handleRemoveLunchItem()));
      }
    }
  };
  return (
    <View style={[styles.container, hasCheckBox && styles.padding]}>
      {hasCheckBox ? (
        <BouncyCheckbox
          isChecked={items[index]?.checked}
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
