import React, {useCallback, useEffect, useMemo, useReducer} from 'react';
import {BreakieDetails} from '@types';
import {useBreakfastDetails} from '@api';
import {calendarStore, listsStore} from '@stores';
import {useLists} from '@providers';
import {BaseMeal, Loader} from '@components';
import {ScreenStack} from '@config';

interface State {
  selectedItems: number[];
  items: BreakieDetails[];
}

type Action =
  | {type: 'SET_ITEMS'; payload: BreakieDetails[]}
  | {type: 'TOGGLE_ITEM'; payload: number}
  | {type: 'CLEAR_SELECTION'};

const initialState: State = {
  selectedItems: [],
  items: [],
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'TOGGLE_ITEM':
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload],
      };
    case 'CLEAR_SELECTION':
      return {...state, selectedItems: []};
    default:
      return state;
  }
}

const BreakieComponent = ({navigation}: ScreenStack) => {
  const {date} = calendarStore();
  const {breakfasts} = listsStore();
  const {deleteMealItems} = useLists();
  const [state, dispatch] = useReducer(reducer, initialState);

  const mealId = () => {
    return breakfasts?.filter(
      item => item.dateAdded?.toString() === date.format('YYYY-MM-DD'),
    )?.[0]?.id;
  };

  const {data, isLoading} = useBreakfastDetails(mealId());

  useEffect(() => {
    if (data && data.breakfast_items) {
      dispatch({type: 'SET_ITEMS', payload: data.breakfast_items});
    }
  }, [data]);

  const itemsToBeDeleted = useMemo(() => {
    return state.items.filter(item => !state.selectedItems.includes(item.id));
  }, [state.items, state.selectedItems]);

  const handleSelectItem = useCallback((id: number) => {
    dispatch({type: 'TOGGLE_ITEM', payload: id});
  }, []);

  const handleDiscardSelection = useCallback(() => {
    dispatch({type: 'CLEAR_SELECTION'});
  }, []);

  const handleDeleteSelected = useCallback(() => {
    console.log('LOG BREAKIE ITEMS =>>', itemsToBeDeleted);
    deleteMealItems<BreakieDetails>(
      data?.id!,
      () => {
        dispatch({type: 'CLEAR_SELECTION'});
        navigation.goBack();
      },
      itemsToBeDeleted,
      date.format('MM/DD/YYYY'),
      state.selectedItems,
      'breakie',
    );
  }, [state.selectedItems, navigation, date, itemsToBeDeleted]);

  return isLoading ? (
    <Loader />
  ) : (
    <BaseMeal<BreakieDetails>
      data={data?.breakfast_items || []}
      selectedItems={state.selectedItems}
      handleDiscardSelection={handleDiscardSelection}
      handleDeleteSelected={handleDeleteSelected}
      handleSelectItem={handleSelectItem}
    />
  );
};

export default BreakieComponent;

// Similar components for Breakfast, Snack, and Dinner
