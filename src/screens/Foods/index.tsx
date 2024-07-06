import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {SingleFood} from '@components';
import {Searchbar} from 'react-native-paper';
import styles from './foods.styles.ts';
import {Colours} from '@constants';
import {Tables} from '@types';
import {foodStore} from '@stores';
import {ScreenStack} from '@config';

type Food = Tables<'foods'>;

const Foods = ({navigation}: ScreenStack) => {
  const {foods} = foodStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState<Food[] | undefined>([]);
  const filterFoods = () => {
    const filtered: Food[] | undefined = foods?.filter(item =>
      item.label.includes(searchQuery),
    );

    setFilteredFoods(filtered);
  };
  useEffect(() => {
    filterFoods();
  }, [searchQuery, foods]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />

      <View style={styles.searchWrapper}>
        <Searchbar
          placeholder="Search a food name"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.search}
        />
      </View>
      <FlatList
        keyboardDismissMode="on-drag"
        data={filteredFoods}
        keyExtractor={item => item.id.toString()}
        // contentContainerStyle={{marginBottom: 50}}
        style={styles.wrapper}
        // contentInset={{bottom: 90}}
        renderItem={({item, index}) => (
          <SingleFood
            item={item}
            index={index}
            foods={filteredFoods}
            onPress={() => navigation?.navigate('SingleFoodScreen', {item})}
          />
        )}
        ListEmptyComponent={
          <View style={styles.noResults}>
            <Text style={styles.noResultsTxt}>No results found...</Text>
          </View>
        }
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{height: 90}}
      />
    </SafeAreaView>
  );
};

export default Foods;
