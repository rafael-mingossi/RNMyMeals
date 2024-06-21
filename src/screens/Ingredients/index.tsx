import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './ingredients.styles.ts';
import {FoodsType} from '@types';
import {foodStore} from '@stores';
import {Ingredient, SingleFood} from '@components';
import {hS, vS} from '@utils';

const Ingredients = () => {
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
      <FlatList
        data={foods}
        contentContainerStyle={{
          rowGap: vS(10),
        }}
        renderItem={({item}) => <Ingredient item={item} />}
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
