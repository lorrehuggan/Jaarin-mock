import { fromUnixTime, isThisMonth, isThisWeek } from 'date-fns';
import { Wage } from 'utils/types/job-types';
import { getTime } from 'date-fns';
import { getDateString } from 'utils/helpers';

const useTips = (wages: Wage[]) => {
  let allTips: number[] = [];
  let allHours: number[] = [];
  let currentMonthTips: number[] = [];
  let currentMonthHours: number[] = [];
  let currentWeekTips: number[] = [];
  let currentWeekHours: number[] = [];
  let shifts: Wage[] = [];

  wages.forEach((wage) => shifts.push(wage));

  let Mondays: Wage[] = [];
  let Tuesdays: Wage[] = [];
  let Wednesdays: Wage[] = [];
  let Thursdays: Wage[] = [];
  let Fridays: Wage[] = [];
  let Saturdays: Wage[] = [];
  let Sundays: Wage[] = [];

  shifts.forEach((shift) => {
    const { day } = getDateString(shift.date);
    const currentDay = {
      tips: shift.tips,
      hours_worked: shift.hours_worked,
      date: shift.date,
    };
    switch (day) {
      case 'Mon':
        Mondays.push(currentDay);
        break;
      case 'Tue':
        Tuesdays.push(currentDay);
        break;
      case 'Wed':
        Wednesdays.push(currentDay);
        break;
      case 'Thu':
        Thursdays.push(currentDay);
        break;
      case 'Fri':
        Fridays.push(currentDay);
        break;
      case 'Sat':
        Saturdays.push(currentDay);
        break;
      case 'Sun':
        Sundays.push(currentDay);
        break;
      default:
        break;
    }
  });

  const weekData: Wage[][] = [
    Mondays,
    Tuesdays,
    Wednesdays,
    Thursdays,
    Fridays,
    Saturdays,
    Sundays,
  ];

  wages.forEach((wage) => {
    const date = fromUnixTime(wage.date);
    allTips.push(wage.tips);
    allHours.push(wage.hours_worked);
    if (isThisMonth(date)) {
      currentMonthTips.push(wage.tips);
      currentMonthHours.push(wage.hours_worked);
    }
    if (isThisWeek(date)) {
      currentWeekTips.push(wage.tips);
      currentWeekHours.push(wage.hours_worked);
    }
  });

  return {
    allTips,
    allHours,
    currentMonthHours,
    currentWeekHours,
    currentMonthTips,
    currentWeekTips,
    weekData,
  };
};

export default useTips;
