import React, {useState} from 'react';
import {StatusBar, SafeAreaView, View, FlatList, Text} from 'react-native';
import {Colours} from '@constants';
import styles from './recipes.styles.ts';
import {Searchbar} from 'react-native-paper';
import {useMyRecipesList} from '@api';

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {data} = useMyRecipesList();
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
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.tCalories}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Recipes;
