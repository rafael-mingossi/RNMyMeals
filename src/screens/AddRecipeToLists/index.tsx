import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {ScreenTopStack} from '@config';
import {useFiltered} from '@providers';
import styles from './addRecipeToLists.styles.ts';
import {SingleFood} from '@components';

const AddRecipeToLists = ({navigation}: ScreenTopStack) => {
  const {filteredRecipesContext} = useFiltered();

  return (
    <FlatList
      keyboardDismissMode="on-drag"
      data={filteredRecipesContext}
      keyExtractor={item => item.id.toString()}
      // contentContainerStyle={{marginBottom: 50}}
      style={styles.wrapper}
      // contentInset={{bottom: 90}}
      renderItem={({item, index}) => (
        <SingleFood
          hasCheckBox
          item={item}
          index={index}
          foods={filteredRecipesContext}
          // onPress={() => navigation.navigate('IngredientView', {item: item})}
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
  );
};

export default AddRecipeToLists;
