import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import styles from './addListItems.styles.ts';
import {ButtonText} from '@components';
import {ListItemsPropsNavigation, TopTabsNavigator} from '@config';
import {Searchbar} from 'react-native-paper';
import {Colours} from '@constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {foodStore, recipeStore} from '@stores';
import {Tables} from '@types';
import {useFiltered} from '@providers';
import Recipes from '../Recipes';

type Food = Tables<'foods'>;

const AddListItems = ({route, navigation}: ListItemsPropsNavigation) => {
  const insets = useSafeAreaInsets();
  const {foods} = foodStore();
  const {recipes} = recipeStore();
  const {
    handleFilterFoodsContext,
    searchQuery,
    setSearchQuery,
    handleFilterRecipesContext,
  } = useFiltered();

  const filterFoods = () => {
    const filtered: Food[] | undefined = foods?.filter(item =>
      item.label.includes(searchQuery),
    );

    handleFilterFoodsContext(filtered);
  };

  const filterRecipes = () => {
    const filtered: Recipes[] | undefined = recipes?.filter(item =>
      item?.name?.includes(searchQuery),
    );

    const newFilteredArray = filtered?.map(item => ({
      calories: item.tCalories,
      carbs: item.tCarbs,
      created_at: item.created_at,
      fat: item.tFat,
      fibre: item.tFibre,
      food_img:
        'https://lzvknmgwnxlojtpfprid.supabase.co/storage/v1/object/public/food-images/default_food.png',
      id: item.id,
      label: item.name!,
      protein: item.tProtein,
      serv_size: item.serving!,
      serv_unit: item.serv_unit!,
      sodium: item.tSodium,
      user_id: item.user_id!,
    }));

    handleFilterRecipesContext(newFilteredArray);
  };

  useEffect(() => {
    filterFoods();
  }, [searchQuery, foods]);

  useEffect(() => {
    filterRecipes();
  }, [searchQuery, recipes]);

  const handleLog = () => {
    if (route?.params.listItem === 'lunch') {
      console.log('LUNCH');
    }
  };

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1,
        backgroundColor: Colours.green,
      }}>
      <StatusBar backgroundColor={Colours.green} />
      <View style={styles.searchWrapper}>
        <Searchbar
          placeholder="Search a food name"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.search}
        />
      </View>
      <TopTabsNavigator />

      <View style={styles.buttonsWrapper}>
        <ButtonText children={'Return'} onPress={() => navigation.goBack()} />

        <ButtonText children={'Log'} onPress={handleLog} />
      </View>
    </View>
  );
};
export default AddListItems;
