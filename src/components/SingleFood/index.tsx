import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RemoteImg} from '@components';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './singleFood.styles.ts';
import {Colours, Fonts} from '@constants';
import {hS} from '@utils';
import {Icon} from 'react-native-paper';
import {foodStore} from '../../stores';
// import {useDeleteFood} from '@api';

type SingleFoodProps = {
  index: number;
  item: FoodsType;
  foods: FoodsType[] | undefined;
  onDelete: (id: number) => void;
  loadingDel: boolean;
};

type FoodsType = {
  calories: number;
  carbs: number;
  created_at: string;
  fat: number;
  fibre: number;
  food_img: string;
  id: number;
  label: string;
  protein: number;
  serv_size: number;
  serv_unit: string;
  sodium: number;
  user_id: string;
  checked?: boolean;
};

const temp_img =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

const SingleFood: FC<SingleFoodProps> = ({
  item,
  index,
  foods,
  onDelete,
  loadingDel,
}) => {
  const [selected, setSelected] = useState<FoodsType[]>();
  const [items, setItems] = useState<FoodsType[]>(foods!);
  const {deleteFood: del} = foodStore();
  // const {mutate: deleteFood} = useDeleteFood();

  // const onDelete = () => {
  //   deleteFood(item.id, {onSuccess: () => console.log('DELETED')});
  // };

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
          onPress: () => del(item.id),
        },
      ],
    );
  };

  useEffect(() => {
    const selectedItems = items?.filter(item => item.checked);
    // console.log('selectedItems =>>', selectedItems);
    setSelected(selectedItems);
  }, [items]);

  return (
    <TouchableOpacity style={styles.container}>
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

      <RemoteImg path={item.food_img} fallback={temp_img} style={styles.img} />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{item.label}</Text>
        <Text style={styles.text}>{item.calories} cals</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity>
          <Icon size={hS(27)} source={'eye'} color={Colours.gray} />
        </TouchableOpacity>
        {/*<TouchableOpacity onPress={confirmDelete}>*/}
        {/*  {loadingDel ? (*/}
        {/*    <ActivityIndicator />*/}
        {/*  ) : (*/}
        {/*    <Icon size={hS(27)} source={'delete'} color={Colours.gray} />*/}
        {/*  )}*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity onPress={confirmDelete}>
          <Icon size={hS(25)} source={'pencil'} color={Colours.gray} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default SingleFood;
