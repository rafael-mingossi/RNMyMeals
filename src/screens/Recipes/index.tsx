import React from 'react';
import {StatusBar, SafeAreaView, View, FlatList, Text} from 'react-native';
import {Colours} from '@constants';
import styles from './recipes.styles.ts';
import {Searchbar} from 'react-native-paper';
import {ScreenStack} from '@config';
import {Tables} from '@types';
import {SingleFood} from '@components';
import {useFiltered} from '@providers';

type Recipes = Tables<'recipes'>;

const Recipes = ({navigation}: ScreenStack) => {
  const {searchQuery, setSearchQuery, filteredRecipesContext} = useFiltered();

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
        data={filteredRecipesContext}
        style={styles.flatList}
        renderItem={({item, index}) => (
          <SingleFood
            item={item}
            index={index}
            foods={filteredRecipesContext}
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
