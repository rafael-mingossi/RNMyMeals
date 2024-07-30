import dayjs, {Dayjs} from 'dayjs';

export const renderWeekDay = (weekDay: number) => {
  switch (weekDay) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
  }
};

export const renderMonthName = (month: number) => {
  switch (month) {
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
  }
};

export const getDaysInMonth = (date: Dayjs) => {
  const days = [];

  // Add actual days in the month
  for (let i = 1; i <= date.daysInMonth(); i++) {
    days.push({date: dayjs(date).date(i)});
  }

  return days;
};
