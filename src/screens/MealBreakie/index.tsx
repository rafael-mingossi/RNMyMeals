import React from 'react';
import {BreakieDetails} from '@types';
import {useBreakfastDetails} from '@api';
import {BaseMeal, Loader} from '@components';
import {ScreenStack} from '@config';
import {useMealReducer, useMealOperations} from '@hooks';

const BreakieComponent = ({navigation}: ScreenStack) => {
  const [state, dispatch] = useMealReducer<BreakieDetails>();

  const {
    isLoading,
    data,
    selectedItems,
    handleSelectItem,
    handleDiscardSelection,
    handleDeleteSelected,
  } = useMealOperations<BreakieDetails>({
    mealType: 'breakfast',
    useMealDetails: useBreakfastDetails,
    state,
    dispatch,
    navigation,
  });
  return isLoading ? (
    <Loader />
  ) : (
    <BaseMeal<BreakieDetails>
      data={data}
      selectedItems={selectedItems}
      handleDiscardSelection={handleDiscardSelection}
      handleDeleteSelected={handleDeleteSelected}
      handleSelectItem={handleSelectItem}
    />
  );
};

export default BreakieComponent;
