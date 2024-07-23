import {Tables} from '@types';
import {create, StateCreator, StoreApi} from 'zustand';

interface ListsStore {
  lunchs: Lunchs[];
  setLunchs: (input: Lunchs[]) => void;
  breakfasts: Breakies[];
  setBreakfasts: (input: Breakies[]) => void;
}

type Lunchs = Tables<'lunchs'>;
type Breakies = Tables<'breakfasts'>;

const createListsStore: StateCreator<ListsStore> = (set, get) => ({
  lunchs: [],
  setLunchs: (input: Lunchs[]) => set(() => ({lunchs: input})),
  breakfasts: [],
  setBreakfasts: (input: Breakies[]) => set(() => ({breakfasts: input})),
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
