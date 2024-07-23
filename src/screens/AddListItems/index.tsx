import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  LayoutChangeEvent,
  Pressable,
  Image,
  BackHandler,
} from 'react-native';
import styles from './addListItems.styles.ts';
import {ButtonText} from '@components';
import {ListItemsPropsNavigation, TopTabsNavigator} from '@config';
import {Icon, Searchbar, Portal} from 'react-native-paper';
import {Colours} from '@constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFiltered, useLists} from '@providers';
import {calendarStore, listsStore} from '@stores';
import BottomSheet, {BottomSheetMethods} from '@devvie/bottom-sheet';
import {hS, vS} from '@utils';
// import Animated, {
//   SlideOutRight,
//   SlideInRight,
//   SlideOutLeft,
//   withRepeat,
// } from 'react-native-reanimated';

const AddListItems = ({route, navigation}: ListItemsPropsNavigation) => {
  const insets = useSafeAreaInsets();
  const {searchQuery, setSearchQuery} = useFiltered();
  const {lunchs, breakfasts} = listsStore();
  const {date} = calendarStore();
  const {addMeal, mealsItems, updateMeal, clearCart} = useLists();
  const sheetRef = useRef<BottomSheetMethods>(null);
  const layoutRef = useRef<View>(null);
  const [childHeight, setChildHeight] = useState(0);

  const mealName = route?.params.listItem;

  if (!mealName) {
    navigation.goBack();
  }

  // const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  // Handle Android back button behavior
  const handleBackPress = () => {
    if (mealsItems.length) {
      sheetRef.current?.open(); // Open bottom sheet for confirmation
      return true; // Prevent default back action
    } else {
      navigation.goBack(); // Go back if no items in cart
    }
    return false; // Allow default back action if needed
  };

  useEffect(() => {
    const backSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backSubscription.remove();
  }, [mealsItems.length]);

  //Getting the total height of the cart items + bottom buttons
  const handleLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setChildHeight(height);
  };

  const onAddButtonPress = () => {
    sheetRef.current?.open();
  };

  const onModalClose = () => {
    sheetRef?.current?.close();
  };

  const getIdToUpdateMeal = () => {
    switch (mealName) {
      case 'lunch':
        return lunchs.find(item => item.dateAdded === date.format('YYYY-MM-DD'))
          ?.id;

      case 'breakie':
        return breakfasts.find(
          item => item.dateAdded === date.format('YYYY-MM-DD'),
        )?.id;
    }
  };

  const handleFilteredMeal = () => {
    switch (mealName) {
      case 'lunch':
        return lunchs?.filter(
          item => item.dateAdded === date.format('YYYY-MM-DD'),
        );

      case 'breakie':
        return breakfasts?.filter(
          item => item.dateAdded === date.format('YYYY-MM-DD'),
        );
    }
  };
  const handleLog = () => {
    const mealToFilter = handleFilteredMeal();

    if (!mealToFilter) {
      return;
    }

    switch (mealName) {
      case 'lunch':
        return mealToFilter.length
          ? updateMeal(
              getIdToUpdateMeal()!,
              () => {
                navigation.goBack();
                clearCart();
              },
              mealName,
            )
          : addMeal(() => {
              navigation.goBack();
              clearCart();
            }, mealName);
      case 'breakie':
        return mealToFilter.length
          ? updateMeal(
              getIdToUpdateMeal()!,
              () => {
                navigation.goBack();
                clearCart();
              },
              mealName,
            )
          : addMeal(() => {
              navigation.goBack();
              clearCart();
            }, mealName);
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
      {mealsItems.length ? (
        <Pressable onPress={onAddButtonPress} style={styles.cartBtn}>
          <Icon size={hS(35)} source={'bucket-outline'} color={Colours.white} />
          <Text style={styles.carTxt}>{mealsItems.length}</Text>
        </Pressable>
      ) : null}

      {/*{mealsItems.length ? (*/}
      {/*  <AnimatedPressable*/}
      {/*    onPress={onAddButtonPress}*/}
      {/*    entering={SlideInRight.duration(200).delay(100)}*/}
      {/*    exiting={SlideOutRight}*/}
      {/*    style={styles.cartBtn}>*/}
      {/*    <Icon size={hS(35)} source={'bucket-outline'} color={Colours.white} />*/}
      {/*    <Text style={styles.carTxt}>{mealsItems.length}</Text>*/}
      {/*  </AnimatedPressable>*/}
      {/*) : null}*/}

      <Portal>
        <BottomSheet
          ref={sheetRef}
          backdropMaskColor={'#00000072'}
          height={childHeight ? childHeight + vS(30) : 100}
          style={styles.wrapperBottomSheet}
          closeDuration={300}>
          <View
            style={styles.contentContainer}
            ref={layoutRef}
            onLayout={handleLayout}>
            {mealsItems.map(item => (
              <View style={styles.imgTxtWrapper} key={item.id}>
                <View style={styles.imgAndText}>
                  <Image
                    source={{
                      uri:
                        item.food?.itemFood?.food_img! ||
                        item.recipe?.itemRecipe?.img!,
                    }}
                    style={styles.img}
                  />
                  <View style={styles.textWrapper}>
                    <Text style={styles.textLabel}>
                      {item.food?.itemFood?.label ||
                        item.recipe?.itemRecipe?.name}
                    </Text>
                    <Text style={styles.text}>
                      {item.food?.itemFood?.calories ||
                        item.recipe?.itemRecipe?.tCalories}{' '}
                      cals
                      <Text style={{color: Colours.black}}>
                        {' '}
                        / Serv. (
                        {item.food?.itemFood?.serv_size ||
                          item.recipe?.itemRecipe?.serving}{' '}
                        {item.food?.itemFood?.serv_unit ||
                          item.recipe?.itemRecipe?.serv_unit}
                        )
                      </Text>
                    </Text>
                  </View>
                </View>
                {/*<Pressable*/}
                {/*  style={styles.delete}*/}
                {/*  onPress={() => handleDeleteItem(item.id)}>*/}
                {/*  <Icon*/}
                {/*    size={hS(22)}*/}
                {/*    source={'delete'}*/}
                {/*    color={Colours.midRed}*/}
                {/*  />*/}
                {/*</Pressable>*/}
              </View>
            ))}
            <View style={styles.buttonsWrapper}>
              <ButtonText
                children={'Discard'}
                onPress={() => {
                  clearCart();
                  onModalClose();
                }}
              />

              <ButtonText
                children={'Log'}
                onPress={handleLog}
                disabled={!mealsItems.length}
              />
            </View>
          </View>
        </BottomSheet>
      </Portal>
      <View style={styles.buttonsWrapper}>
        <ButtonText
          children={'Return'}
          onPress={
            mealsItems.length
              ? () => onAddButtonPress()
              : () => navigation.goBack()
          }
        />

        <ButtonText
          children={'Log'}
          onPress={handleLog}
          disabled={!mealsItems.length}
        />
      </View>
    </View>
  );
};
export default AddListItems;
