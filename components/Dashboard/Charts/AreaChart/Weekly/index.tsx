import React, { useState } from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  Legend,
} from 'recharts';
import { TiChartLine } from 'react-icons/ti';

type Props = {};

interface State {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const data = [
  {
    name: 'monday',
    tips: 5.5,
    hours: 8,
  },
  {
    name: 'tuesday',
    tips: 7.9,
    hours: 10,
  },
  {
    name: 'wednesday',
    tips: 4,
    hours: 12,
  },
  {
    name: 'thursday',
    tips: 6,
    hours: 3,
  },
  {
    name: 'friday',
    tips: 2.9,
    hours: 5,
  },
  {
    name: 'saturday',
    tips: 13.5,
    hours: 7,
  },
  {
    name: 'sunday',
    tips: 4,
    hours: 11,
  },
];
const monthlyData = [
  {
    name: 'monday',
    tips: 5.5,
    hours: 8,
  },
  {
    name: 'tuesday',
    tips: 9.9,
    hours: 10,
  },
  {
    name: 'wednesday',
    tips: 25.5,
    hours: 12,
  },
  {
    name: 'thursday',
    tips: 20.5,
    hours: 3,
  },
  {
    name: 'friday',
    tips: 22.9,
    hours: 5,
  },
  {
    name: 'saturday',
    tips: 13.5,
    hours: 7,
  },
  {
    name: 'sunday',
    tips: 11,
    hours: 11,
  },
];

const DailyAreaChart = (props: Props) => {
  const [state, setState] = useState(true);
  return (
    <section className="mx-auto my-6 w-[90%] overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 pt-4 shadow-lg">
      <Details />
      {state ? <Weekly /> : <Monthly />}
    </section>
  );
};

export default DailyAreaChart;

const Details = () => {
  return (
    <div className="mb-8 flex items-center justify-between px-4">
      <div>
        <p className="text-base">£73.00</p>
        <p className=" text-xs text-slate-400">Received this week</p>
      </div>
      <div className="flex items-center justify-end rounded-xl bg-green-300/40 p-1">
        <p className=" text-green-800">12%</p>
        <TiChartLine className="ml-1 text-2xl text-green-800" />
      </div>
    </div>
  );
};

const Weekly = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width={400}
        height={400}
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="tips" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgb(249 168 212)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="rgb(249 168 212)" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="hours" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#818CF8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#818CF8" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <Tooltip />
        <XAxis dataKey="name" hide={true} />
        <Legend
          verticalAlign="top"
          height={36}
          iconType="circle"
          iconSize={10}
        />
        <Area
          type="monotone"
          dataKey="tips"
          stroke="rgb(244 114 182)"
          fill="url(#tips)"
          fillOpacity={0.85}
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

const Monthly = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width={400}
        height={400}
        data={monthlyData}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="colortips" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgb(249 168 212)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="rgb(249 168 212)" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <Tooltip />
        <XAxis dataKey="name" hide={true} />
        <Area
          type="monotone"
          dataKey="tips"
          stroke="rgb(244 114 182)"
          fill="url(#colortips)"
          fillOpacity={0.85}
          strokeWidth={1}
          animationEasing="ease-in-out"
        />
        <Area
          type="monotone"
          dataKey="hours"
          stroke="rgb(244 114 182)"
          fill="url(#colortips)"
          fillOpacity={0.95}
          strokeWidth={1}
          animationEasing="ease-in-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
