import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheet,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import {Portal, PortalHost} from '@gorhom/portal';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useCallback, useMemo, useState} from 'react';
import styles from './addBottomSheet.styles.ts';
import {BottomSheetPropsNavigation} from '@config';
import {useNavigation} from '@react-navigation/native';
import {runOnJS, useAnimatedReaction, Easing} from 'react-native-reanimated';

const AddBottomSheet = () => {
  // Creates a reference to the DOM element that we can interact with
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const navigation: BottomSheetPropsNavigation = useNavigation();

  const deviceHeight = Dimensions.get('window').height;
  const snapPoints = useMemo(
    () => (deviceHeight >= 800 ? ['43%'] : ['55%']),
    [deviceHeight],
  );

  function useBottomSheetBoundary(boundary: number) {
    const {animatedPosition} = useBottomSheet();
    const [isBelowBoundary, setIsBelowBoundary] = useState(true);

    useAnimatedReaction(
      () => deviceHeight - animatedPosition.value,
      (estimatedHeight, previous) => {
        if (estimatedHeight < (previous ?? 0) && estimatedHeight < boundary) {
          runOnJS(setIsBelowBoundary)(true);
        } else if (
          estimatedHeight > (previous ?? 0) &&
          estimatedHeight > boundary
        ) {
          runOnJS(setIsBelowBoundary)(false);
        }
      },
    );

    return isBelowBoundary ? 'below' : 'above';
  }

  console.log(useBottomSheetBoundary);

  // Expands the bottom sheet when our button is pressed
  const onAddButtonPress = () => {
    bottomSheetRef?.current?.expand();
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const onModalClose = () => {
    bottomSheetRef?.current?.close();
  };
  const renderBackdrop = useCallback(
    (newProps: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...newProps}
      />
    ),
    [],
  );

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 200,
    easing: Easing.exp,
  });

  return (
    <>
      <TouchableOpacity
        onPress={onAddButtonPress}
        style={styles.addButtonWrapper}>
        <FontAwesomeIcon icon={faPlus} color={'#fff'} size={30} />
      </TouchableOpacity>
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1} // Hide the bottom sheet when we first load our component
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}
          animationConfigs={animationConfigs}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.wrapper}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/images/img_breakie.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.bottomSheetTitle}>Breakfast</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrapper}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/images/img_lunch.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.bottomSheetTitle}>Lunch</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrapper}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/images/img_dinner.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.bottomSheetTitle}>Dinner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrapper}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/images/img_snack.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.bottomSheetTitle}>Snacks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrapper}
              onPress={() => {
                onModalClose();
                navigation.navigate('AddFoodRoot');
              }}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/images/img_add_food.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.bottomSheetTitle}>Add Food</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </Portal>
      <PortalHost name={'custom_host'} />
    </>
  );
};

export default AddBottomSheet;
