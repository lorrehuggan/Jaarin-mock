import { fromUnixTime, isThisMonth, isThisWeek } from 'date-fns';
import { Wage } from 'utils/types/job-types';
import { getTime } from 'date-fns';

const useTips = (wages: Wage[]) => {
  let allTips: number[] = [];
  let allHours: number[] = [];
  let currentMonthTips: number[] = [];
  let currentMonthHours: number[] = [];
  let currentWeekTips: number[] = [];
  let currentWeekHours: number[] = [];

  const currenWeek = [];

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
  };
};

export default useTips;
