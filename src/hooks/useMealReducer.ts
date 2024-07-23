import {useReducer} from 'react';

export interface MealState<T> {
  selectedItems: number[];
  items: T[];
}

type MealAction<T> =
  | {type: 'SET_ITEMS'; payload: T[]}
  | {type: 'TOGGLE_ITEM'; payload: number}
  | {type: 'CLEAR_SELECTION'};

const initialState: MealState<any> = {
  selectedItems: [],
  items: [],
};

function mealReducer<T>(
  state: MealState<T>,
  action: MealAction<T>,
): MealState<T> {
  switch (action.type) {
    case 'SET_ITEMS':
      return {...state, items: action.payload};
    case 'TOGGLE_ITEM':
      return {
        ...state,
        selectedItems: state.selectedItems.includes(action.payload)
          ? state.selectedItems.filter(id => id !== action.payload)
          : [...state.selectedItems, action.payload],
      };
    case 'CLEAR_SELECTION':
      return {...state, selectedItems: []};
    default:
      return state;
  }
}

export function useMealReducer<T>() {
  return useReducer(mealReducer<T>, initialState);
}
