import React from 'react';
import {DinnerDetails} from '@types';
import {useDinnerDetails} from '@api';
import {BaseMeal, Loader} from '@components';
import {ScreenStack} from '@config';
import {useMealReducer, useMealOperations} from '@hooks';

const DinnerComponent = ({navigation}: ScreenStack) => {
  const [state, dispatch] = useMealReducer<DinnerDetails>();

  const {
    isLoading,
    data,
    selectedItems,
    handleSelectItem,
    handleDiscardSelection,
    handleDeleteSelected,
  } = useMealOperations<DinnerDetails>({
    mealType: 'dinner',
    useMealDetails: useDinnerDetails,
    state,
    dispatch,
    navigation,
  });

  return isLoading ? (
    <Loader />
  ) : (
    <BaseMeal<DinnerDetails>
      data={data}
      selectedItems={selectedItems}
      handleDiscardSelection={handleDiscardSelection}
      handleDeleteSelected={handleDeleteSelected}
      handleSelectItem={handleSelectItem}
    />
  );
};

export default DinnerComponent;
