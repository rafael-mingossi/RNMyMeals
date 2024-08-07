import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {SingleFood} from '@components';
import styles from './addFoodToLists.styles.ts';
import {ScreenTopStack} from '@config';
import {useFiltered} from '@providers';

const AddFoodToLists = ({navigation}: ScreenTopStack) => {
  const {filteredFoodsContext} = useFiltered();

  return (
    <FlatList
      keyboardDismissMode="on-drag"
      data={filteredFoodsContext}
      keyExtractor={item => item.id.toString()}
      // contentContainerStyle={{marginBottom: 50}}
      style={styles.wrapper}
      // contentInset={{bottom: 90}}
      renderItem={({item, index}) => (
        <SingleFood
          hasCheckBox
          item={item}
          items={filteredFoodsContext}
          isFood
          index={index}
          onPress={() =>
            navigation.navigate('IngredientView', {item: item, isFood: true})
          }
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
  );
};

export default AddFoodToLists;
