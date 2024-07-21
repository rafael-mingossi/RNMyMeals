import React, {useCallback, useEffect, useMemo, useReducer} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import styles from './singleMealLunch.styles.ts';
import {Colours} from '@constants';
import {ButtonText, Calendar} from '@components';
import {Icon, Surface} from 'react-native-paper';
import {calendarStore, listsStore} from '@stores';
import {useLunchDetails} from '@api';
import {hS} from '@utils';
import {LunchDetails} from '@types';
import {useLists} from '@providers';
import {ScreenStack} from '@config';

interface State {
  selectedItems: number[];
  items: LunchDetails[];
}

type Action =
  | {type: 'SET_ITEMS'; payload: LunchDetails[]}
  | {type: 'TOGGLE_ITEM'; payload: number}
  | {type: 'CLEAR_SELECTION'};

const initialState: State = {
  selectedItems: [],
  items: [],
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'TOGGLE_ITEM':
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload],
      };
    case 'CLEAR_SELECTION':
      return {...state, selectedItems: []};
    default:
      return state;
  }
}

const SingleMealLunch = ({navigation}: ScreenStack) => {
  const {lunchs} = listsStore();
  const {date} = calendarStore();
  const {deleteLunchItems} = useLists();
  const [state, dispatch] = useReducer(reducer, initialState);
  const lunchFiltered = lunchs?.filter(
    item => item.dateAdded?.toString() === date.format('YYYY-MM-DD'),
  );

  const {data, isLoading} = useLunchDetails(lunchFiltered?.[0]?.id);

  // console.log('data =>>', state.selectedItems);
  // console.log(
  //   'data ITEMS =>>',
  //   data?.lunch_items?.map(x => {
  //     return x;
  //   }),
  // );

  useEffect(() => {
    if (data && data.lunch_items) {
      dispatch({type: 'SET_ITEMS', payload: data.lunch_items});
    }
  }, [data]);

  // console.log('selectedItems =>>', selectedItems);
  // console.log('itemsToBeDeleted =>>', itemsToBeDeleted);

  const itemsToBeDeleted = useMemo(() => {
    return state.items.filter(item => !state.selectedItems.includes(item.id));
  }, [state.items, state.selectedItems]);

  const handleSelectItem = useCallback((id: number) => {
    dispatch({type: 'TOGGLE_ITEM', payload: id});
  }, []);

  const handleDiscardSelection = useCallback(() => {
    dispatch({type: 'CLEAR_SELECTION'});
  }, []);

  const handleDeleteSelected = useCallback(() => {
    deleteLunchItems(
      data?.id!,
      () => {
        dispatch({type: 'CLEAR_SELECTION'});
        navigation.goBack();
      },
      itemsToBeDeleted,
      date.format('MM/DD/YYYY'),
      state.selectedItems,
    );
  }, [state.selectedItems, navigation, date, itemsToBeDeleted]);

  const defaultRecipeImg =
    'https://lzvknmgwnxlojtpfprid.supabase.co/storage/v1/object/public/food-images/default_food.png';

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <Calendar />
      {state.selectedItems.length ? (
        <View style={styles.buttonsWrapper}>
          <ButtonText children={'Deselect'} onPress={handleDiscardSelection} />

          <ButtonText children={'Discard'} onPress={handleDeleteSelected} />
        </View>
      ) : null}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {isLoading ? (
          <View style={styles.loadingView}>
            <ActivityIndicator />
          </View>
        ) : (
          <Surface style={styles.surface} elevation={3}>
            {state.items.length ? (
              state.items.map(item => {
                const adjustTotals =
                  item?.foodQuantity! / item.foods?.serv_size!;
                return (
                  <View
                    style={[
                      styles.imgTxtWrapper,
                      state.selectedItems.includes(item.id) &&
                        styles.deleteSelected,
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
                        state.selectedItems.includes(item.id)
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
        )}
      </ScrollView>
    </View>
  );
};

export default SingleMealLunch;
