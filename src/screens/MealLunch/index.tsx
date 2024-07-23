import React from 'react';
import {LunchDetails} from '@types';
import {useLunchDetails} from '@api';
import {BaseMeal, Loader} from '@components';
import {ScreenStack} from '@config';
import {useMealReducer, useMealOperations} from '@hooks';

const LunchComponent = ({navigation}: ScreenStack) => {
  const [state, dispatch] = useMealReducer<LunchDetails>();

  const {
    isLoading,
    data,
    selectedItems,
    handleSelectItem,
    handleDiscardSelection,
    handleDeleteSelected,
  } = useMealOperations<LunchDetails>({
    mealType: 'lunch',
    useMealDetails: useLunchDetails,
    state,
    dispatch,
    navigation,
  });

  return isLoading ? (
    <Loader />
  ) : (
    <BaseMeal<LunchDetails>
      data={data}
      selectedItems={selectedItems}
      handleDiscardSelection={handleDiscardSelection}
      handleDeleteSelected={handleDeleteSelected}
      handleSelectItem={handleSelectItem}
    />
  );
};

export default LunchComponent;
