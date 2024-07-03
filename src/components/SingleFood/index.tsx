import React, {FC, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './singleFood.styles.ts';
import {Colours, Fonts} from '@constants';
import {hS} from '@utils';
import {Icon} from 'react-native-paper';
import {SingleFoodComponentPropsNavigation} from '@config';
import {useNavigation} from '@react-navigation/native';
import {SingleFoodType} from '@types';

type SingleFoodProps = {
  index: number;
  item: SingleFoodType;
  foods: SingleFoodType[] | undefined;
  hasCheckBox?: boolean;
};

const SingleFood: FC<SingleFoodProps> = ({
  item,
  index,
  foods,
  hasCheckBox = false,
}) => {
  const navigation: SingleFoodComponentPropsNavigation = useNavigation();
  const [selected, setSelected] = useState<SingleFoodType[]>();
  const [items, setItems] = useState<SingleFoodType[]>(foods!);

  useEffect(() => {
    const selectedItems = items?.filter(res => res.checked);
    // console.log('selectedItems =>>', selectedItems);
    setSelected(selectedItems);
  }, [items]);

  return (
    <TouchableOpacity style={styles.container}>
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

      <Image source={{uri: item.food_img!}} style={styles.img} />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{item.label}</Text>
        <Text style={styles.text}>{item.calories} cals</Text>
      </View>
      <View style={styles.icons}>
        {hasCheckBox ? (
          <TouchableOpacity
            onPress={() => navigation?.navigate('SingleFoodScreen', {item})}>
            <Icon
              size={hS(27)}
              source={'chartIngredient-box-plus-outline'}
              color={Colours.gray}
            />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => navigation?.navigate('SingleFoodScreen', {item})}>
              <Icon size={hS(27)} source={'eye'} color={Colours.gray} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation?.navigate('SingleFoodEdit', {item})}>
              <Icon size={hS(25)} source={'pencil'} color={Colours.gray} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SingleFood;
