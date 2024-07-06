import React, {useEffect, useState} from 'react';
import {StatusBar, SafeAreaView, View, FlatList, Text} from 'react-native';
import {Colours} from '@constants';
import styles from './recipes.styles.ts';
import {Searchbar} from 'react-native-paper';
import {ScreenStack} from '@config';
import {recipeStore} from '@stores';
import {Tables} from '@types';
import {SingleFood} from '@components';

type Recipes = Tables<'recipes'>;
type Food = Tables<'foods'>;

const Recipes = ({navigation}: ScreenStack) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {recipes} = recipeStore();
  const [filteredRecipes, setFilteredRecipes] = useState<Food[] | undefined>(
    [],
  );

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

    setFilteredRecipes(newFilteredArray);
  };
  useEffect(() => {
    filterRecipes();
  }, [searchQuery, recipes]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />

      <View style={styles.searchWrapper}>
        <Searchbar
          placeholder="Search a recipe name"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.search}
        />
      </View>

      <FlatList
        data={filteredRecipes}
        style={styles.flatList}
        renderItem={({item, index}) => (
          <SingleFood
            item={item}
            index={index}
            foods={filteredRecipes}
            onPress={() =>
              navigation.navigate('RecipeDetails', {recipeId: item.id})
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.noResults}>
            <Text style={styles.noResultsTxt}>No results found...</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Recipes;
