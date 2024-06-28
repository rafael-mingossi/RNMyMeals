import React, {useState} from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colours} from '@constants';
import styles from './recipes.styles.ts';
import {Searchbar} from 'react-native-paper';
import {useMyRecipesList} from '@api';
import {Avatar, Card, IconButton} from 'react-native-paper';

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
      </View>

      <FlatList
        data={data}
        style={styles.flatList}
        renderItem={({item}) => (
          <TouchableOpacity>
            <Card.Title
              titleStyle={styles.flatListItem}
              subtitleStyle={styles.flatListItem}
              title={item.name}
              subtitle={`${item.tCalories} cals`}
              left={() => (
                <Image
                  source={require('../../assets/images/default_food.png')}
                  style={styles.icon}
                />
              )}
              // left={props => <Avatar.Icon {...props} icon="check" />}
              // right={props => (
              //   <IconButton
              //     {...props}
              //     icon="dots-vertical"
              //     onPress={() => {}}
              //   />
              // )}
            />
          </TouchableOpacity>
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
