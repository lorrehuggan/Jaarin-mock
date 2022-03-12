import React from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { FiSettings } from 'react-icons/fi';
import Section from '../DashboardSection';
import { TiUser } from 'react-icons/ti';

type Props = {};

const UserCard = (props: Props) => {
  return (
    <Section>
      <div className="flex items-center justify-between">
        <h4 className="text-2xl">Overview</h4>
        <TiUser className="text-3xl" />
      </div>
      <div className="mb-8">
        <p className="text-xs text-slate-500">Job at Company</p>
      </div>
      <div className="mt-4 mb-10 grid w-full grid-cols-3 gap-2">
        <Analytic name="Total" data="80.00" />
        <Analytic name="This Week" data="7.80" />
        <Analytic name="This Month" data="17.60" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <FiSettings className="text-lg" />
        <p className="text-xs capitalize text-slate-400">
          user since 28 days ago
        </p>
      </div>
    </Section>
  );
};

export default UserCard;

interface IAnalytic {
  name: string;
  data: string;
}

const Analytic: React.FC<IAnalytic> = ({ name, data }) => {
  return (
    <div className="rounded-md border-2 border-slate-200/50 p-2">
      <p className="text-center text-xs ">{name}</p>
      <p className="text-center text-lg font-bold text-pink-400">{`${data}`}</p>
    </div>
  );
};
