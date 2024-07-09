import React from 'react';
import {FlatList, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {SingleFood} from '@components';
import {Searchbar} from 'react-native-paper';
import styles from './foods.styles.ts';
import {Colours} from '@constants';
import {ScreenStack} from '@config';
import {useFiltered} from '@providers';

const Foods = ({navigation}: ScreenStack) => {
  const {searchQuery, setSearchQuery, filteredFoodsContext} = useFiltered();

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
        data={filteredFoodsContext}
        keyExtractor={item => item.id.toString()}
        // contentContainerStyle={{marginBottom: 50}}
        style={styles.wrapper}
        // contentInset={{bottom: 90}}
        renderItem={({item, index}) => (
          <SingleFood
            item={item}
            index={index}
            foods={filteredFoodsContext}
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
