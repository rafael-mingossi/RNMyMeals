import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, StatusBar, FlatList} from 'react-native';
import styles from './addListItems.styles.ts';
import {ButtonText, SingleFood} from '@components';
import {ListItemsPropsNavigation} from '@config';
import {Searchbar} from 'react-native-paper';
import {Colours} from '@constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {foodStore} from '@stores';
import {Tables} from '@types';

type Food = Tables<'foods'>;

const AddListItems = ({route, navigation}: ListItemsPropsNavigation) => {
  const insets = useSafeAreaInsets();
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

  const handleLog = () => {
    if (route?.params.listItem === 'lunch') {
      console.log('LUNCH');
    }
  };

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1,
        backgroundColor: Colours.green,
      }}>
      <StatusBar backgroundColor={Colours.green} />
      <View style={styles.searchWrapper}>
        <Searchbar
          placeholder="Search a food name"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.search}
        />
      </View>
      {/*<ScrollView contentContainerStyle={styles.scrollView} bounces={false}>*/}
      <FlatList
        keyboardDismissMode="on-drag"
        data={filteredFoods}
        keyExtractor={item => item.id.toString()}
        // contentContainerStyle={{marginBottom: 50}}
        style={styles.wrapper}
        // contentInset={{bottom: 90}}
        renderItem={({item, index}) => (
          <SingleFood
            hasCheckBox
            item={item}
            index={index}
            foods={filteredFoods}
            onPress={() => navigation.navigate('IngredientView', {item: item})}
          />
        )}
        // ListEmptyComponent={
        //   <View style={styles.noResults}>
        //     <Text style={styles.noResultsTxt}>No results found...</Text>
        //   </View>
        // }
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{height: 90}}
      />
      {/*</ScrollView>*/}

      <View style={styles.buttonsWrapper}>
        <ButtonText children={'Return'} onPress={() => navigation.goBack()} />

        <ButtonText children={'Log'} onPress={handleLog} />
      </View>
    </View>
  );
};

export default AddListItems;
