import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  LayoutChangeEvent,
} from 'react-native';
import {Icon} from 'react-native-paper';
import {Portal} from 'react-native-paper';
import styles from './addBottomSheet.styles.ts';

import {NavigationScreenProp} from '@config';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {BottomSheetMethods} from '@devvie/bottom-sheet';
import {hS} from '@utils';
import {Colours} from '@constants';

const AddBottomSheet = () => {
  const sheetRef = useRef<BottomSheetMethods>(null);
  const navigation: NavigationScreenProp = useNavigation();

  const layoutRef = useRef<View>(null);
  const [childHeight, setChildHeight] = useState(0);

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

  return (
    <>
      <TouchableOpacity
        onPress={onAddButtonPress}
        style={styles.addButtonWrapper}>
        <Icon size={hS(40)} source={'plus'} color={Colours.white} />
      </TouchableOpacity>
      <Portal>
        <BottomSheet
          ref={sheetRef}
          backdropMaskColor={'#00000072'}
          height={childHeight}
          style={styles.wrapper}
          closeDuration={300}>
          <View
            style={styles.contentContainer}
            ref={layoutRef}
            onLayout={handleLayout}>
            <TouchableOpacity>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/images/img_breakie.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.bottomSheetTitle}>Breakie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onModalClose();
                navigation.navigate('AddListItems', {listItem: 'lunch'});
              }}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/images/img_lunch.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.bottomSheetTitle}>Lunch</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/images/img_dinner.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.bottomSheetTitle}>Dinner</Text>
            </TouchableOpacity>
            <View style={styles.bottomIcons}>
              <TouchableOpacity>
                <View style={styles.iconWrapper}>
                  <Image
                    source={require('../../assets/images/img_snack.png')}
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.bottomSheetTitle}>Snacks</Text>
              </TouchableOpacity>
              <TouchableOpacity
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
                <Text style={styles.bottomSheetTitle}>+ Food</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onModalClose();
                  navigation.navigate('AddRecipe');
                }}>
                <View style={styles.iconWrapper}>
                  <Image
                    source={require('../../assets/images/img_recipe.png')}
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.bottomSheetTitle}>+ Recipe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </Portal>
      {/*<PortalHost name={'custom_host'} />*/}
    </>
  );
};

export default AddBottomSheet;
