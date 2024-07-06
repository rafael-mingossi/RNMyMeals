import React, {FC, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './singleFood.styles.ts';
import {Colours, Fonts} from '@constants';
import {hS} from '@utils';
import {NavigationScreenProp} from '@config';
import {useNavigation} from '@react-navigation/native';
import {SingleFoodType, SingleRecipeType} from '@types';

type SingleFoodProps = {
  index: number;
  item: SingleFoodType;
  foods: SingleFoodType[] | undefined;
  hasCheckBox?: boolean;
  onPress?: () => void;
};

const SingleFood: FC<SingleFoodProps> = ({
  item,
  index,
  foods,
  hasCheckBox = false,
  onPress,
}) => {
  const navigation: NavigationScreenProp = useNavigation();
  const [selected, setSelected] = useState<SingleFoodType[]>();
  const [items, setItems] = useState<SingleFoodType[]>(foods!);

  useEffect(() => {
    const selectedItems = items?.filter(
      (res: SingleFoodType | SingleRecipeType) => res.checked,
    );
    // console.log('selectedItems =>>', selectedItems);
    setSelected(selectedItems);
  }, [items]);

  return (
    <View style={[styles.container, hasCheckBox && styles.padding]}>
      {hasCheckBox ? (
        <BouncyCheckbox
          isChecked={items!![index]?.checked}
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
          onPress={() => {
            const picked = items[index]?.checked;

            const updatedItems = items?.map(newItem => {
              if (item.id === items[index]?.id) {
                item.checked = !picked;
              }

              return newItem;
            });

            setItems(updatedItems);
          }}
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
