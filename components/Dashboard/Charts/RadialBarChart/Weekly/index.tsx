import Section from '@components/Dashboard/DashboardSection';
import React, { useState } from 'react';
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { HandleCurrency, numberReducer } from 'utils/helpers';
import useTips from 'utils/hooks/useTips';
import { Wage } from 'utils/types/job-types';

type Props = {
  wages: Wage[];
};

const chartColors = [
  {
    fill: '#8884d8',
  },
  {
    fill: '#83a6ed',
  },
  {
    fill: '#8dd1e1',
  },
  {
    fill: '#82ca9d',
  },
  {
    fill: '#a4de6c',
  },
  {
    fill: '#d0ed57',
  },
  {
    fill: '#ffc658',
  },
];

const WeeklyRadialBarChart: React.FC<Props> = ({ wages }) => {
  let [isOpen, setIsOpen] = useState(true);
  const { currentWeekTips, currentWeekHours, weekData } = useTips(wages);
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
      name: day,
      tips: Number(numberReducer(WeekDataArray[i].tips).toFixed(2)),
      hours: Number(numberReducer(WeekDataArray[i].hours).toFixed(0)),
      fill: chartColors[i].fill,
    };
  });
  return (
    <Section>
      <div className=" relative flex items-center justify-between ">
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
      <ResponsiveContainer width="100%" height={280}>
        <RadialBarChart
          width={830}
          height={200}
          innerRadius="10%"
          outerRadius="80%"
          data={totalWeekData}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar background dataKey="tips" />

          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="-mt-16 flex w-full items-center justify-between">
        {shortDayName.map((day, i) => {
          return (
            <div
              style={{ backgroundColor: `${chartColors[i].fill}` }}
              key={day}
              className="flex items-center justify-center rounded-lg p-2"
            >
              <p className="text-xs font-black text-white">{day}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default WeeklyRadialBarChart;
