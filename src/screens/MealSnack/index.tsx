import React from 'react';
import {SnackDetails} from '@types';
import {useSnackDetails} from '@api';
import {BaseMeal, Loader} from '@components';
import {ScreenStack} from '@config';
import {useMealReducer, useMealOperations} from '@hooks';

const SnackComponent = ({navigation}: ScreenStack) => {
  const [state, dispatch] = useMealReducer<SnackDetails>();

  const {
    isLoading,
    data,
    selectedItems,
    handleSelectItem,
    handleDiscardSelection,
    handleDeleteSelected,
  } = useMealOperations<SnackDetails>({
    mealType: 'snack',
    useMealDetails: useSnackDetails,
    state,
    dispatch,
    navigation,
  });

  return isLoading ? (
    <Loader />
  ) : (
    <BaseMeal<SnackDetails>
      data={data}
      selectedItems={selectedItems}
      handleDiscardSelection={handleDiscardSelection}
      handleDeleteSelected={handleDeleteSelected}
      handleSelectItem={handleSelectItem}
    />
  );
};

export default SnackComponent;
