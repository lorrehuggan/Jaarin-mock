import { Wage } from './../types/job-types';
import { compareDesc, fromUnixTime } from 'date-fns';
import { useUserState } from 'context/user/userProvider';
import { jobRoutes } from 'utils/api-routes';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';

interface DateObject {
  day: string;
  month: string;
  date: string;
  time: string;
}

export function getDateString(date: number): DateObject {
  const string = fromUnixTime(date).toString().split(' ');

  return {
    day: string[0],
    month: string[1],
    date: string[2],
    time: string[3],
  };
}

export function numberReducer(numArray: number[]): number {
  return numArray.reduce((total: number, item: number) => {
    return total + item;
  }, 0);
}

export function HandleCurrency(): string {
  const [{ authenticatedUser: user }] = useUserState();
  switch (user?.currency) {
    case 'GBP':
      return '£';
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    default:
      return '$';
  }
}

export function sortDatesDesc(wage: Wage[] | undefined) {
  return wage?.sort((a, b) => compareDesc(Number(a.date), Number(b.date)));
}

export const shortDayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const fullDayName = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const fullMonthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const shortMonthName = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];
