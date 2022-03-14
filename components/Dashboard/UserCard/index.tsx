import React, { useMemo } from 'react';
import { FiSettings } from 'react-icons/fi';
import Section from '../DashboardSection';
import { TiUser } from 'react-icons/ti';
import { Job } from 'utils/types/job-types';
import {
  isThisMonth,
  fromUnixTime,
  isThisWeek,
  formatDistanceToNow,
} from 'date-fns';
import { handleCurrency, numberReducer } from 'utils/helpers';
import { AuthenticatedUser } from 'utils/types/user-types';

type Props = {
  job: Job | undefined;
  user: AuthenticatedUser;
};

const UserCard: React.FC<Props> = ({ job, user }) => {
  let allTips: number[] = [];
  let monthTips: number[] = [];
  let weekTips: number[] = [];

  job?.wages.forEach((wage) => {
    const fromUnix = fromUnixTime(wage.date);
    allTips.push(wage.tips);
    if (isThisMonth(fromUnix)) {
      monthTips.push(wage.tips);
    }
    if (isThisWeek(fromUnix)) {
      weekTips.push(wage.tips);
    }
  });

  const userMemberLength = useMemo(
    () =>
      formatDistanceToNow(job?.createdAt!, {
        addSuffix: true,
      }),
    [job]
  );

  return (
    <Section>
      <div className="flex items-center justify-between">
        <h4 className="text-2xl">Overview</h4>
        <TiUser className="text-3xl" />
      </div>
      <div className="mb-8">
        <p className="text-xs text-slate-500">{job?.company_name}</p>
      </div>
      <div className="mt-4 mb-10 grid w-full grid-cols-3 gap-2">
        <Analytic
          currency={user.currency}
          name="Total"
          data={numberReducer(allTips)}
        />
        <Analytic
          currency={user.currency}
          name="This Week"
          data={numberReducer(weekTips)}
        />
        <Analytic
          currency={user.currency}
          name="This Month"
          data={numberReducer(monthTips)}
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <FiSettings className="text-lg" />
        <p className="text-xs capitalize text-slate-400">
          {`User since ${userMemberLength} `}
        </p>
      </div>
    </Section>
  );
};

export default UserCard;

interface IAnalytic {
  name: string;
  data: number;
  currency: string;
}

const Analytic: React.FC<IAnalytic> = ({ name, data, currency }) => {
  return (
    <div className="rounded-md border-2 border-slate-200/50 py-6 px-2">
      <p className="text-center text-xs ">{name}</p>
      <p className=" text-center text-lg font-bold text-pink-400">
        <span className="text-xs">{handleCurrency(currency)}</span>
        {data.toFixed(2)}
      </p>
    </div>
  );
};
