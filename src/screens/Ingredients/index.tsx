import React from 'react';
import {FlatList, Text, View} from 'react-native';
import styles from './ingredients.styles.ts';
import {Ingredient} from '@components';
import {vS} from '@utils';
import {Searchbar} from 'react-native-paper';
import {ScreenStack} from '@config';
import {useFiltered, useRecipes} from '@providers';

const Ingredients = ({navigation}: ScreenStack) => {
  const {searchQuery, setSearchQuery, filteredFoodsContext} = useFiltered();
  const {items, deleteItem} = useRecipes();

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <Searchbar
          placeholder="Ingredient name"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.search}
        />
      </View>
      <FlatList
        data={filteredFoodsContext}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          rowGap: vS(10),
        }}
        renderItem={({item}) => (
          <Ingredient
            item={item}
            onPress={() => {
              items.some(i => String(i.food.id).includes(String(item.id)))
                ? deleteItem(String(item.id))
                : navigation.navigate('IngredientView', {item: item});
            }}
          />
        )}
        ListEmptyComponent={
          <View style={styles.noResults}>
            <Text style={styles.noResultsTxt}>No results found...</Text>
          </View>
        }
      />
    </View>
  );
};

export default Ingredients;
