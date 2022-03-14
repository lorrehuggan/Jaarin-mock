import { getDateString, numberReducer } from 'utils/helpers';
import { Wage } from 'utils/types/job-types';

export const useWeeklyData = (wages: Wage[]) => {
  let shifts: Wage[] = [];

  wages.forEach((wage) => shifts.push(wage));

  const dayArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let _MonTips: number[] = [];
  let _TueTips: number[] = [];
  let _WedTips: number[] = [];
  let _ThuTips: number[] = [];
  let _FriTips: number[] = [];
  let _SatTips: number[] = [];
  let _SunTips: number[] = [];

  let _MonHours: number[] = [];
  let _TueHours: number[] = [];
  let _WedHours: number[] = [];
  let _ThuHours: number[] = [];
  let _FriHours: number[] = [];
  let _SatHours: number[] = [];
  let _SunHours: number[] = [];

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
        _MonTips.push(shift.tips);
        _MonHours.push(shift.hours_worked);
        Mondays.push(currentDay);
        break;
      case 'Tue':
        _TueTips.push(shift.tips);
        _TueHours.push(shift.hours_worked);
        Tuesdays.push(currentDay);
        break;
      case 'Wed':
        _WedTips.push(shift.tips);
        _WedHours.push(shift.hours_worked);
        Wednesdays.push(currentDay);
        break;
      case 'Thu':
        _ThuTips.push(shift.tips);
        _ThuHours.push(shift.hours_worked);
        Thursdays.push(currentDay);
        break;
      case 'Fri':
        _FriTips.push(shift.tips);
        _FriHours.push(shift.hours_worked);
        Fridays.push(currentDay);
        break;
      case 'Sat':
        _SatTips.push(shift.tips);
        _SatHours.push(shift.hours_worked);
        Saturdays.push(currentDay);
        break;
      case 'Sun':
        _SunTips.push(shift.tips);
        _SunHours.push(shift.hours_worked);
        Sundays.push(currentDay);
        break;
      default:
        break;
    }
  });

  let MonTips: number = numberReducer(_MonTips);
  let TueTips: number = numberReducer(_TueTips);
  let WedTips: number = numberReducer(_WedTips);
  let ThuTips: number = numberReducer(_ThuTips);
  let FriTips: number = numberReducer(_FriTips);
  let SatTips: number = numberReducer(_SatTips);
  let SunTips: number = numberReducer(_SunTips);

  let MonHours: number = numberReducer(_MonHours);
  let TueHours: number = numberReducer(_TueHours);
  let WedHours: number = numberReducer(_WedHours);
  let ThuHours: number = numberReducer(_ThuHours);
  let FriHours: number = numberReducer(_FriHours);
  let SatHours: number = numberReducer(_SatHours);
  let SunHours: number = numberReducer(_SunHours);

  const weeklyTips = [
    Number(MonTips.toFixed(2)),
    Number(TueTips.toFixed(2)),
    Number(WedTips.toFixed(2)),
    Number(ThuTips.toFixed(2)),
    Number(FriTips.toFixed(2)),
    Number(SatTips.toFixed(2)),
    Number(SunTips.toFixed(2)),
  ];
  const weeklyHours = [
    Number(MonHours),
    Number(TueHours),
    Number(WedHours),
    Number(ThuHours),
    Number(FriHours),
    Number(SatHours),
    Number(SunHours),
  ];

  const weeklyTipsObj = {
    monday: Number(MonHours),
    tuesday: Number(TueHours),
    wednesday: Number(WedHours),
    thursday: Number(ThuHours),
    friday: Number(FriHours),
    saturday: Number(SatHours),
    sunday: Number(SunHours),
  };

  const weekData: Wage[][] = [
    Mondays,
    Tuesdays,
    Wednesdays,
    Thursdays,
    Fridays,
    Saturdays,
    Sundays,
  ];

  interface IWeekData {
    Mondays: Wage[];
    Tuesdays: Wage[];
    Wednesdays: Wage[];
    Thursdays: Wage[];
    Fridays: Wage[];
    Saturdays: Wage[];
    Sundays: Wage[];
  }

  const WeekData: IWeekData = {
    Mondays,
    Tuesdays,
    Wednesdays,
    Thursdays,
    Fridays,
    Saturdays,
    Sundays,
  };

  return {
    weeklyHours,
    weeklyTips,
    weeklyTipsObj,
    weekData,
    WeekData,
  };
};
