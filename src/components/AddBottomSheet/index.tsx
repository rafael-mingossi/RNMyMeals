import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Portal, PortalHost} from '@gorhom/portal';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useCallback, useMemo} from 'react';

const AddBottomSheet = () => {
  // Creates a reference to the DOM element that we can interact with
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  // Setting the points to which we want the bottom sheet to be set to
  // Using '-30' here so that it is not seen when it is not presented
  // const snapPoints = React.useMemo(() => [-30, '75%'], []);

  const deviceHeight = Dimensions.get('window').height;
  const snapPoints = useMemo(
    () => (deviceHeight >= 800 ? ['47%'] : ['55%']),
    [deviceHeight],
  );
  // Callback function that gets called when the bottom sheet changes
  // const handleSheetChanges = React.useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  // Expands the bottom sheet when our button is pressed
  const onAddButtonPress = () => {
    bottomSheetRef?.current?.expand();
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
  // const {dismiss} = useBottomSheetModal();

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
          // onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.bottomSheetTitle}>Add Customer</Text>
          </View>
        </BottomSheet>
      </Portal>
      <PortalHost name={'custom_host'} />
    </>
  );
};

export default AddBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 50,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: '500',
  },
  addButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16247d',
    width: 50,
    height: 50,
    top: -15,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#f2f2f2',
  },
});
