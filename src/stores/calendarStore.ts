import {create, StateCreator, StoreApi} from 'zustand';
import dayjs, {Dayjs} from 'dayjs';

import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.guess();

interface CalendarStore {
  date: Dayjs;
  setDate: (value: Dayjs) => void;
}

const createCalendarStore: StateCreator<CalendarStore> = (set, get) => ({
  date: dayjs(),
  setDate: (value: Dayjs) => set(() => ({date: value})),
});

const calendarStoreRootSlice = (
  set: (
    partial:
      | CalendarStore
      | Partial<CalendarStore>
      | ((state: CalendarStore) => CalendarStore | Partial<CalendarStore>),
  ) => void,
  get: () => CalendarStore,
  api: StoreApi<CalendarStore>,
) => ({...createCalendarStore(set, get, api)});

export const calendarStore = create(calendarStoreRootSlice);
