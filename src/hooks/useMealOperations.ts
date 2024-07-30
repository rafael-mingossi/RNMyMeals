import {Dispatch, useCallback, useEffect, useMemo} from 'react';
import {calendarStore, listsStore} from '@stores';
import {useLists} from '@providers';
import {MealState} from './useMealReducer';
import {MealDetails, MealTypes} from '@types';
import {UseQueryResult} from '@tanstack/react-query';

interface UseMealOperationsProps<T extends MealDetails> {
  mealType: MealTypes;
  useMealDetails: (id: number) => UseQueryResult<any, Error>;
  state: MealState<T>;
  dispatch: Dispatch<any>;
  navigation: any;
}

export function useMealOperations<T extends MealDetails>({
  mealType,
  useMealDetails,
  state,
  dispatch,
  navigation,
}: UseMealOperationsProps<T>) {
  const {date} = calendarStore();
  const meals = listsStore()[`${mealType}s`];
  const {deleteMealItems} = useLists();

  const mealId = useMemo(() => {
    return meals.find(
      item => item.dateAdded?.toString() === date.format('YYYY-MM-DD'),
    )?.id;
  }, [date]);

  const {data, isLoading} = useMealDetails(mealId!);

  useEffect(() => {
    if (data && data[`${mealType}_items`]) {
      dispatch({type: 'SET_ITEMS', payload: data[`${mealType}_items`]});
    }
  }, [data, mealType, dispatch]);

  const itemsToBeDeleted = useMemo(() => {
    return state.items.filter(item => !state.selectedItems.includes(item.id));
  }, [state.items, state.selectedItems]);

  const handleSelectItem = useCallback(
    (id: number) => {
      dispatch({type: 'TOGGLE_ITEM', payload: id});
    },
    [dispatch],
  );

  const handleDiscardSelection = useCallback(() => {
    dispatch({type: 'CLEAR_SELECTION'});
  }, [dispatch]);

  const handleDeleteSelected = useCallback(() => {
    deleteMealItems<T>(
      Number(data?.id!),
      () => {
        dispatch({type: 'CLEAR_SELECTION'});
        navigation.goBack();
      },
      itemsToBeDeleted,
      date.format('MM/DD/YYYY'),
      state.selectedItems,
      mealType,
    );
  }, [
    state.selectedItems,
    navigation,
    date,
    itemsToBeDeleted,
    data?.id,
    deleteMealItems,
    dispatch,
  ]);

  return {
    isLoading,
    data: data?.[`${mealType}_items`] || [],
    selectedItems: state.selectedItems,
    handleSelectItem,
    handleDiscardSelection,
    handleDeleteSelected,
  };
}
