import React, {useState, useCallback} from 'react';
import {FlatList, StyleSheet, Text, View, RefreshControl} from 'react-native';

import {ViewPager} from './ViewPager';
import {Swiper} from './Swiper.tsx';

export const VerticalList = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderItem = ({index}: {index: number}) => {
    if (index === 0) {
      return (
        <View style={styles.top}>
          <View style={styles.topContent}>
            <Text>TOP IN VERTICAL LIST</Text>
          </View>

          {/* <AnimateBox /> */}
          <Swiper />
        </View>
      );
    }
    if (index === 1) {
      return (
        <View style={styles.tabs}>
          <Text>tab inside vertical list</Text>
        </View>
      );
    }

    return <ViewPager />;
  };

  return (
    <FlatList
      data={[0, 1, 2]}
      renderItem={renderItem}
      keyExtractor={item => item + ''}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      stickyHeaderIndices={[1]}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    // height: 400,
    backgroundColor: 'yellow',
  },
  topContent: {
    height: 100,
  },
  tabs: {
    height: 100,
    backgroundColor: 'pink',
  },
  list: {
    flex: 1,
  },
});
