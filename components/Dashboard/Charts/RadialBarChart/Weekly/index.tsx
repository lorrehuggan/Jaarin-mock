import Section from '@components/Dashboard/DashboardSection';
import React, { useState } from 'react';
import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { HandleCurrency, numberReducer, shortDayName } from 'utils/helpers';
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
  const { currentWeekTips, totalWeekData } = useTips(wages);

  //mod totalWeekData to add additional rechart props
  const _totalWeekData = shortDayName.map((day, i) => {
    return { ...totalWeekData[i], name: day, fill: chartColors[i].fill };
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
          cx="50%"
          cy="50%"
          innerRadius="8%"
          outerRadius="80%"
          barSize={10}
          data={_totalWeekData}
        >
          <RadialBar background dataKey="tips" />

          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className=" flex w-full items-center justify-between">
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
