import {Breakies, Dinners, Lunchs, Snacks} from '@types';
import {create, StateCreator, StoreApi} from 'zustand';

interface ListsStore {
  lunchs: Lunchs[];
  setLunchs: (input: Lunchs[]) => void;
  breakfasts: Breakies[];
  setBreakfasts: (input: Breakies[]) => void;
  snacks: Snacks[];
  setSnacks: (input: Snacks[]) => void;
  dinners: Dinners[];
  setDinners: (input: Dinners[]) => void;
}

const createListsStore: StateCreator<ListsStore> = set => ({
  lunchs: [],
  setLunchs: (input: Lunchs[]) => set(() => ({lunchs: input})),
  breakfasts: [],
  setBreakfasts: (input: Breakies[]) => set(() => ({breakfasts: input})),
  snacks: [],
  setSnacks: (input: Snacks[]) => set(() => ({snacks: input})),
  dinners: [],
  setDinners: (input: Dinners[]) => set(() => ({dinners: input})),
});

const listsStoreRootSlice = (
  set: (
    partial:
      | ListsStore
      | Partial<ListsStore>
      | ((state: ListsStore) => ListsStore | Partial<ListsStore>),
  ) => void,
  get: () => ListsStore,
  api: StoreApi<ListsStore>,
) => ({...createListsStore(set, get, api)});

export const listsStore = create(listsStoreRootSlice);
