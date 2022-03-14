import React from 'react';
import { ResponsiveContainer, Tooltip, AreaChart, Area, XAxis } from 'recharts';
import { Wage } from 'utils/types/job-types';
import { HandleCurrency, numberReducer } from 'utils/helpers';
import useTips from 'utils/hooks/useTips';

type Props = {
  wages: Wage[];
};
interface ITips {
  currentWeekTips?: number[];
  currentWeekHours?: number[];
  weekData?: Wage[][];
}

const DailyAreaChart: React.FC<Props> = ({ wages }) => {
  const { currentWeekTips, currentWeekHours, weekData } = useTips(wages);

  return (
    <section className="mx-auto my-6 w-[90%] overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 pt-4 shadow-lg">
      <Details
        currentWeekHours={currentWeekHours}
        currentWeekTips={currentWeekTips}
      />
      <Weekly
        currentWeekTips={currentWeekTips}
        currentWeekHours={currentWeekHours}
        weekData={weekData}
      />
    </section>
  );
};

export default DailyAreaChart;

const Details: React.FC<ITips> = ({ currentWeekTips, currentWeekHours }) => {
  return (
    <div className="mb-8 flex items-center justify-between px-4">
      <div className="flex">
        <div className="flex items-center">
          <div className="mr-1 h-2 w-2 rounded-full bg-pink-400"></div>
          <p className="text-xs text-pink-400">Total/Tips</p>
        </div>
        <div className="ml-2 flex items-center">
          <div className="mr-1 h-2 w-2 rounded-full bg-indigo-400"></div>
          <p className="text-xs text-indigo-400">Total/Hours</p>
        </div>
      </div>
      <div className="flex">
        <div className="">
          <div className="rounded-xl bg-green-400/50 p-1">
            <p className="text-center text-base text-green-800">{`${HandleCurrency()}${numberReducer(
              currentWeekTips!
            ).toFixed(2)}`}</p>
          </div>
          <p className=" text-xs text-slate-400">Received this week</p>
        </div>
      </div>
    </div>
  );
};

const Weekly: React.FC<ITips> = ({ weekData }) => {
  const shortDayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const fullDayName = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
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
      name: WeekDataArray[i].name,
      tips: Number(numberReducer(WeekDataArray[i].tips).toFixed(2)),
      hours: Number(numberReducer(WeekDataArray[i].hours).toFixed(0)),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width={400}
        height={400}
        data={totalWeekData}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="_tips" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgb(249 168 212)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="rgb(249 168 212)" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="hours" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#818CF8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#818CF8" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <Tooltip />
        <XAxis dataKey="name" hide={false} />

        <Area
          type="monotone"
          dataKey="tips"
          stroke="rgb(244 114 182)"
          fill="url(#_tips)"
          fillOpacity={0.95}
          strokeWidth={0}
          animationEasing="ease-in-out"
        />
        <Area
          type="monotone"
          dataKey="hours"
          stroke="#818CF8"
          fill="url(#hours)"
          fillOpacity={0.95}
          strokeWidth={0}
          animationEasing="ease-in-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
