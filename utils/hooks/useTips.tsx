import { fromUnixTime, isThisMonth, isThisWeek } from 'date-fns';
import { Wage } from 'utils/types/job-types';
import { getTime } from 'date-fns';
import {
  fullDayName,
  getDateString,
  numberReducer,
  shortDayName,
} from 'utils/helpers';

const useTips = (wages: Wage[] | undefined) => {
  let allTips: number[] = [];
  let allHours: number[] = [];
  let currentMonthTips: number[] = [];
  let currentMonthHours: number[] = [];
  let currentWeekTips: number[] = [];
  let currentWeekHours: number[] = [];
  let thisMonthsTips: Wage[] = [];
  let thisWeeksTips: Wage[] = [];
  let shifts: Wage[] = [];

  wages?.forEach((wage) => shifts.push(wage));

  //days
  let Mondays: Wage[] = [];
  let Tuesdays: Wage[] = [];
  let Wednesdays: Wage[] = [];
  let Thursdays: Wage[] = [];
  let Fridays: Wage[] = [];
  let Saturdays: Wage[] = [];
  let Sundays: Wage[] = [];

  let ThisMondays: Wage[] = [];
  let ThisTuesdays: Wage[] = [];
  let ThisWednesdays: Wage[] = [];
  let ThisThursdays: Wage[] = [];
  let ThisFridays: Wage[] = [];
  let ThisSaturdays: Wage[] = [];
  let ThisSundays: Wage[] = [];

  //months
  let Jan: Wage[] = [];
  let Feb: Wage[] = [];
  let Mar: Wage[] = [];
  let Apr: Wage[] = [];
  let May: Wage[] = [];
  let Jun: Wage[] = [];
  let Jul: Wage[] = [];
  let Aug: Wage[] = [];
  let Sep: Wage[] = [];
  let Oct: Wage[] = [];
  let Nov: Wage[] = [];
  let Dec: Wage[] = [];

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

  shifts.forEach((shift) => {
    const { month } = getDateString(shift.date);
    const currentMonth = {
      tips: shift.tips,
      hours_worked: shift.hours_worked,
      date: shift.date,
    };
    switch (month) {
      case 'Jan':
        Jan.push(currentMonth);
        break;
      case 'Feb':
        Feb.push(currentMonth);
        break;
      case 'Mar':
        Mar.push(currentMonth);
        break;
      case 'Apr':
        Apr.push(currentMonth);
        break;
      case 'May':
        May.push(currentMonth);
        break;
      case 'Jun':
        Jun.push(currentMonth);
        break;
      case 'Jul':
        Jul.push(currentMonth);
        break;
      case 'Aug':
        Aug.push(currentMonth);
        break;
      case 'Sep':
        Sep.push(currentMonth);
        break;
      case 'Oct':
        Oct.push(currentMonth);
        break;
      case 'Nov':
        Nov.push(currentMonth);
        break;
      case 'Dec':
        Dec.push(currentMonth);
        break;
      default:
        break;
    }
  });

  shifts.forEach((shift) => {
    const { day } = getDateString(shift.date);
    const date = fromUnixTime(shift.date);
    const currentDay = {
      tips: shift.tips,
      hours_worked: shift.hours_worked,
      date: shift.date,
    };
    switch (day) {
      case 'Mon':
        if (isThisWeek(date)) {
          ThisMondays.push(currentDay);
        }
        break;
      case 'Tue':
        if (isThisWeek(date)) {
          ThisTuesdays.push(currentDay);
        }
        break;
      case 'Wed':
        if (isThisWeek(date)) {
          ThisWednesdays.push(currentDay);
        }
        break;
      case 'Thu':
        if (isThisWeek(date)) {
          ThisThursdays.push(currentDay);
        }
        break;
      case 'Fri':
        if (isThisWeek(date)) {
          ThisFridays.push(currentDay);
        }
        break;
      case 'Sat':
        if (isThisWeek(date)) {
          ThisSaturdays.push(currentDay);
        }
        break;
      case 'Sun':
        if (isThisWeek(date)) {
          ThisSundays.push(currentDay);
        }
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

  const monthData: Wage[][] = [
    Jan,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec,
  ];

  const thisWeekData: Wage[][] = [
    ThisMondays,
    ThisTuesdays,
    ThisWednesdays,
    ThisThursdays,
    ThisFridays,
    ThisSaturdays,
    ThisSundays,
  ];

  wages?.forEach((wage) => {
    const date = fromUnixTime(wage.date);
    allTips.push(wage.tips);
    allHours.push(wage.hours_worked);
    if (isThisMonth(date)) {
      currentMonthTips.push(wage.tips);
      currentMonthHours.push(wage.hours_worked);
      thisMonthsTips.push({
        tips: wage.tips,
        hours_worked: wage.hours_worked,
        date: wage.date,
      });
    }
    if (isThisWeek(date)) {
      currentWeekTips.push(wage.tips);
      currentWeekHours.push(wage.hours_worked);
      thisWeeksTips.push({
        tips: wage.tips,
        hours_worked: wage.hours_worked,
        date: wage.date,
      });
    }
  });

  const data = weekData!.map((week) => {
    const days = week.map((day, i) => {
      return { ...day, name: shortDayName[i] };
    });
    return days;
  });

  const WeekDataArray = fullDayName.map((day, i) => {
    return {
      tips: data[i].map((arg) => {
        return arg.tips;
      }),
      hours: data[i].map((arg) => {
        return arg.hours_worked;
      }),
      date: data[i].map((arg) => {
        return arg.date;
      }),
      name: data[i].map((arg) => {
        return arg.name;
      }),
    };
  });

  const totalWeekData = shortDayName.map((day, i) => {
    return {
      name: shortDayName[i],
      tips: Number(numberReducer(WeekDataArray[i].tips).toFixed(2)),
      hours: Number(numberReducer(WeekDataArray[i].hours).toFixed(0)),
    };
  });

  const _thisWeekData = thisWeekData!.map((week) => {
    const days = week.map((day, i) => {
      return { ...day, name: shortDayName[i] };
    });
    return days;
  });

  const _thisWeekDataArray = fullDayName.map((day, i) => {
    return {
      tips: _thisWeekData[i].map((arg) => {
        return arg.tips;
      }),
      hours: _thisWeekData[i].map((arg) => {
        return arg.hours_worked;
      }),
      date: _thisWeekData[i].map((arg) => {
        return arg.date;
      }),
      name: _thisWeekData[i].map((arg) => {
        return arg.name;
      }),
    };
  });

  const totalThisWeekData = shortDayName.map((day, i) => {
    return {
      name: shortDayName[i],
      tips: Number(numberReducer(_thisWeekDataArray[i].tips).toFixed(2)),
      hours: Number(numberReducer(_thisWeekDataArray[i].hours).toFixed(0)),
    };
  });

  return {
    allTips,
    allHours,
    currentMonthHours,
    currentWeekHours,
    currentMonthTips,
    currentWeekTips,
    thisMonthsTips,
    thisWeeksTips,
    weekData,
    monthData,
    thisWeekData,
  };
};

export default useTips;
