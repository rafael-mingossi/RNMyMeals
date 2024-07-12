import React from 'react';
import {View, StatusBar} from 'react-native';
import styles from './addListItems.styles.ts';
import {ButtonText} from '@components';
import {ListItemsPropsNavigation, TopTabsNavigator} from '@config';
import {Searchbar} from 'react-native-paper';
import {Colours} from '@constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFiltered, useLists} from '@providers';
import {calendarStore, listsStore} from '@stores';

const AddListItems = ({route, navigation}: ListItemsPropsNavigation) => {
  const insets = useSafeAreaInsets();
  const {searchQuery, setSearchQuery} = useFiltered();
  const {lunchs} = listsStore();
  const {date} = calendarStore();
  const {addLunch, lunchItems, updateLunch} = useLists();

  const getIdToUpdateLunch = () => {
    return lunchs.find(item => item.dateAdded === date.format('YYYY-MM-DD'))
      ?.id;
  };

  const handleLog = () => {
    const lunchFiltered = lunchs?.filter(
      item => item.dateAdded === date.format('YYYY-MM-DD'),
    );

    if (route?.params.listItem === 'lunch') {
      lunchFiltered.length
        ? updateLunch(getIdToUpdateLunch()!, () => navigation.goBack())
        : addLunch(() => navigation.goBack());
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

        <ButtonText
          children={'Log'}
          onPress={handleLog}
          disabled={!lunchItems.length}
        />
      </View>
    </View>
  );
};
export default AddListItems;
