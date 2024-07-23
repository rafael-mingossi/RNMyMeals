import React from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {Calendar, ButtonText} from '@components';
import styles from './baseMeal.styles.ts';
import {Colours} from '@constants';
import {Icon, Surface} from 'react-native-paper';
import {hS} from '@utils';
import {BaseMealItem} from '@types';

interface BaseMealProps<T extends BaseMealItem> {
  data: T[];
  handleDiscardSelection: () => void;
  handleDeleteSelected: () => void;
  handleSelectItem: (id: number) => void;
  selectedItems: number[];
}

function BaseMealComponent<T extends BaseMealItem>({
  data,
  handleDeleteSelected,
  handleDiscardSelection,
  handleSelectItem,
  selectedItems,
}: BaseMealProps<T>) {
  const defaultRecipeImg =
    'https://lzvknmgwnxlojtpfprid.supabase.co/storage/v1/object/public/food-images/default_food.png';

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <Calendar />
      {selectedItems.length ? (
        <View style={styles.buttonsWrapper}>
          <ButtonText children={'Deselect'} onPress={handleDiscardSelection} />

          <ButtonText children={'Discard'} onPress={handleDeleteSelected} />
        </View>
      ) : null}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface style={styles.surface} elevation={3}>
          {data.length ? (
            data.map(item => {
              const adjustTotals = item?.foodQuantity! / item.foods?.serv_size!;
              return (
                <View
                  style={[
                    styles.imgTxtWrapper,
                    selectedItems.includes(item.id) && styles.deleteSelected,
                  ]}
                  key={item.id}>
                  <View style={styles.imgAndText}>
                    <Image
                      source={{
                        uri: item.foods?.food_img! || defaultRecipeImg,
                      }}
                      style={styles.img}
                    />
                    <View style={styles.textWrapper}>
                      <Text style={styles.textLabel}>
                        {item.foods?.label || item.recipes?.name}
                      </Text>
                      <Text style={styles.text}>
                        {item.foods?.calories! * adjustTotals ||
                          item.recipes?.tCalories}{' '}
                        cals
                        <Text style={{color: Colours.black}}>
                          {' '}
                          / {item.foodQuantity || item.recipeQuantity}{' '}
                          {item.foods?.serv_unit || item.recipes?.serv_unit}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <Pressable
                    style={styles.delete}
                    onPress={
                      selectedItems.includes(item.id)
                        ? () => {}
                        : () => handleSelectItem(item.id)
                    }>
                    <Icon
                      size={hS(22)}
                      source={'delete'}
                      color={Colours.midRed}
                    />
                  </Pressable>
                </View>
              );
            })
          ) : (
            <View style={styles.loadingView}>
              <Text>No logs on this day!</Text>
            </View>
          )}
        </Surface>
      </ScrollView>
    </View>
  );
}

export default BaseMealComponent;
