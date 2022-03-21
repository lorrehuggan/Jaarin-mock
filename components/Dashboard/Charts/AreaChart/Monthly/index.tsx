import React, { useState } from 'react';
import { ResponsiveContainer, Tooltip, AreaChart, Area, XAxis } from 'recharts';
import { Wage } from 'utils/types/job-types';
import { HandleCurrency, numberReducer, shortMonthName } from 'utils/helpers';
import useTips from 'utils/hooks/useTips';
import { TiInfoLarge } from 'react-icons/ti';
import { Popover } from '@mantine/core';
type Props = {
  wages: Wage[];
};
interface ITips {
  currentWeekTips?: number[];
  currentWeekHours?: number[];
  monthData: WageData[];
}

interface WageData {
  name: string;
  tips: number;
  hours: number;
}

interface WageMonthData {
  monthData: WageData[];
}

const MonthlyAreaChart: React.FC<Props> = ({ wages }) => {
  const { currentWeekTips, currentWeekHours, monthData } = useTips(wages);

  const data = monthData!.map((month) => {
    const months = month.map((_month, i) => {
      return { ..._month, name: shortMonthName };
    });
    return months;
  });

  const monthDataArray = shortMonthName.map((month, i) => {
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

  const totalMonthData = shortMonthName.map((day, i) => {
    return {
      name: shortMonthName[i],
      tips: Number(numberReducer(monthDataArray[i].tips).toFixed(2)),
      hours: Number(numberReducer(monthDataArray[i].hours).toFixed(0)),
    };
  });

  return (
    <section className="mx-auto my-6 w-[90%] overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 pt-4 shadow-lg">
      <Details
        currentWeekHours={currentWeekHours}
        currentWeekTips={currentWeekTips}
        monthData={totalMonthData}
      />
      <Monthly monthData={totalMonthData} />
    </section>
  );
};

export default MonthlyAreaChart;

const Details: React.FC<ITips> = ({
  currentWeekTips,
  currentWeekHours,
  monthData,
}) => {
  const [opened, setOpened] = useState(false);
  const weekTips = monthData.map((month) => {
    return month.tips;
  });

  const highestTips = Math.max.apply(null, weekTips);

  const highestTipsDay = monthData.filter((month) => {
    return month.tips === highestTips;
  });

  return (
    <div className="relative mb-8 flex items-center justify-between px-4">
      <div>
        <p className="text-sm text-slate-400">All Time Monthly Chart</p>
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
      </div>

      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        target={
          <button onClick={() => setOpened((o) => !o)}>
            <TiInfoLarge size={24} />
          </button>
        }
        width={160}
        position="left"
      >
        <div className="mb-4 flex  justify-center">
          <div>
            <div className="rounded-xl bg-green-400/50 p-1">
              <p className="text-center text-base text-green-800">{`${HandleCurrency()}${numberReducer(
                currentWeekTips!
              ).toFixed(2)}`}</p>
            </div>
            <p className=" text-xs text-slate-400">Received this month</p>
          </div>
        </div>
        <div className="mb-4 flex justify-center">
          <div>
            <div className="w-full rounded-xl bg-green-400/50 p-1">
              <p className="text-center text-base text-green-800">
                {numberReducer(currentWeekHours!).toFixed(1)}hr
              </p>
            </div>
            <p className=" text-xs text-slate-400">Shift Hours this month</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            <div className="rounded-xl bg-green-400/50 p-1">
              <p className="text-center text-base text-green-800">
                {highestTips === 0 ? 'N/A' : highestTipsDay[0].name}
              </p>
            </div>
            <p className=" text-xs text-slate-400">Top Earnings month</p>
          </div>
        </div>
      </Popover>
    </div>
  );
};

const Monthly: React.FC<WageMonthData> = ({ monthData }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width={400}
        height={400}
        data={monthData}
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
