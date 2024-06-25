import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import styles from './ingredients.styles.ts';
import {FoodsType} from '@types';
import {foodStore} from '@stores';
import {Ingredient} from '@components';
import {vS} from '@utils';
import {Searchbar} from 'react-native-paper';
import {IngredientsStack} from '@config';

const Ingredients = ({navigation}: IngredientsStack) => {
  const {foods} = foodStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState<FoodsType[] | undefined>(
    [],
  );
  const filterFoods = () => {
    const filtered: FoodsType[] | undefined = foods?.filter(item =>
      item.label.includes(searchQuery),
    );

    setFilteredFoods(filtered);
  };
  useEffect(() => {
    filterFoods();
  }, [searchQuery, foods]);

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
        data={filteredFoods}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          rowGap: vS(10),
        }}
        renderItem={({item}) => (
          <Ingredient
            item={item}
            onPress={() => {
              navigation.navigate('IngredientView', {item: item});
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
