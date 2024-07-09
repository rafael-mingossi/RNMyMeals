import React from 'react';
import {View, StatusBar} from 'react-native';
import styles from './addListItems.styles.ts';
import {ButtonText} from '@components';
import {ListItemsPropsNavigation, TopTabsNavigator} from '@config';
import {Searchbar} from 'react-native-paper';
import {Colours} from '@constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFiltered} from '@providers';
import {useLists} from '../../providers/ListsProvider.tsx';

const AddListItems = ({route, navigation}: ListItemsPropsNavigation) => {
  const insets = useSafeAreaInsets();
  const {searchQuery, setSearchQuery} = useFiltered();
  const {addLunch} = useLists();

  const handleLog = () => {
    if (route?.params.listItem === 'lunch') {
      addLunch(() => navigation.goBack());
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
      <TopTabsNavigator />

      <View style={styles.buttonsWrapper}>
        <ButtonText children={'Return'} onPress={() => navigation.goBack()} />

        <ButtonText children={'Log'} onPress={handleLog} />
      </View>
    </View>
  );
};
export default AddListItems;
