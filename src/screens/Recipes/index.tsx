import React, {useState} from 'react';
import {StatusBar, SafeAreaView, View} from 'react-native';
import {Colours} from '@constants';
import styles from './recipes.styles.ts';
import {Searchbar} from 'react-native-paper';

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
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
    </SafeAreaView>
  );
};

export default Recipes;
