import { AuthenticatedUser } from './../types/user-types';
import { fromUnixTime } from 'date-fns';
import { useUserState } from 'context/user/userProvider';

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
