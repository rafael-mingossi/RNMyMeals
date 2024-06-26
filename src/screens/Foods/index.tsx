import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {getFoodsById, useDeleteFood} from '@api';
import {SingleFood} from '@components';
import {Searchbar} from 'react-native-paper';
import styles from './foods.styles.ts';
import {Colours} from '@constants';
import {foodStore} from '../../stores/foodStore.ts';
import {supabase} from '@services';
import {getFoodsByUser} from '../../hooks/getFoodsByUser.ts';

type FoodsType = {
  calories: number;
  carbs: number;
  created_at: string;
  fat: number;
  fibre: number;
  food_img: string;
  id: number;
  label: string;
  protein: number;
  serv_size: number;
  serv_unit: string;
  sodium: number;
  user_id: string;
};

const Foods = () => {
  // const {getFoodsById, foods, useDeleteFood} = useFoods();
  // const {foods, isLoading} = getFoodsByUser();
  const {mutate: deleteFood} = useDeleteFood();
  // const {deleteFood} = foodStore();
  const {data: foods, error, isLoading, isFetching} = getFoodsById();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState<FoodsType[] | undefined>(
    [],
  );
  console.log('FOODS STORE =>>', foods);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const filterFoods = () => {
    if (!foods) return;
    const filtered: FoodsType[] | undefined = foods?.filter(item =>
      item.label.includes(searchQuery),
    );

    setFilteredFoods(filtered);
  };

  const onDelete = (id: number) => {
    setLoadingDelete(true);
    deleteFood(id);
    setLoadingDelete(false);
  };

  useEffect(() => {
    filterFoods();
  }, [searchQuery, foods]);

  // useEffect(() => {
  //   setFilteredFoods(foods);
  // }, []);

  if (error)
    return (
      <View style={styles.noResults}>
        <Text style={styles.noResultsTxt}>Failed to fetch...</Text>
      </View>
    );

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
      {isLoading && isFetching ? (
        <ActivityIndicator size="large" color={Colours.green} />
      ) : (
        <>
          {filteredFoods?.length! > 0 && !isLoading && searchQuery === '' ? (
            <FlatList
              data={filteredFoods}
              keyExtractor={item => item.id.toString()}
              // contentContainerStyle={{marginBottom: 50}}
              style={styles.wrapper}
              // contentInset={{bottom: 90}}
              renderItem={({item, index}) => (
                <SingleFood
                  item={item}
                  index={index}
                  foods={filteredFoods}
                  onDelete={onDelete}
                  loadingDel={loadingDelete}
                />
              )}
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{height: 90}}
            />
          ) : (
            <View style={styles.noResults}>
              <Text style={styles.noResultsTxt}>No results found...</Text>
            </View>
          )}
        </>
      )}

      {/*{filteredFoods?.length && searchQuery === '' ? (*/}
      {/*  <FlatList*/}
      {/*    data={filteredFoods}*/}
      {/*    keyExtractor={item => item.id.toString()}*/}
      {/*    // contentContainerStyle={{marginBottom: 50}}*/}
      {/*    style={styles.wrapper}*/}
      {/*    // contentInset={{bottom: 90}}*/}
      {/*    renderItem={({item, index}) => (*/}
      {/*      <SingleFood*/}
      {/*        item={item}*/}
      {/*        index={index}*/}
      {/*        foods={filteredFoods}*/}
      {/*        onDelete={onDelete}*/}
      {/*        loadingDel={loadingDelete}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*    ListFooterComponent={<View />}*/}
      {/*    ListFooterComponentStyle={{height: 90}}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <View style={styles.noResults}>*/}
      {/*    <Text style={styles.noResultsTxt}>No results found...</Text>*/}
      {/*  </View>*/}
      {/*)}*/}
    </SafeAreaView>
  );
};

export default Foods;
