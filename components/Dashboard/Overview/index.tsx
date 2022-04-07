import React, { useMemo, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import Section from '../DashboardSection';
import { TiUser } from 'react-icons/ti';
import { Job } from 'utils/types/job-types';
import { formatDistanceToNow } from 'date-fns';
import { HandleCurrency, numberReducer } from 'utils/helpers';
import { AuthenticatedUser } from 'utils/types/user-types';
import useTips from 'utils/hooks/useTips';
import useSWR from 'swr';

type Props = {
  job: Job | undefined;
  user: AuthenticatedUser;
};

interface IQuotes {
  author: string;
  quote: string;
}

const Overview: React.FC<Props> = ({ job, user }) => {
  const { allTips, currentMonthTips, currentWeekTips } = useTips(job?.wages);
  const [state, setState] = useState(0);

  return (
    <Section>
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-bold">Overview</h4>
        <TiUser className="text-3xl" />
      </div>
      <div className="mb-8">
        <p className="text-sm text-slate-400">{job?.company_name}</p>
      </div>
      <div className="mt-4 grid w-full grid-cols-3 gap-2">
        <Analytic
          currency={user.currency}
          name="Received"
          data={numberReducer(allTips)}
        />
        <Analytic
          currency={user.currency}
          name="This Week"
          data={numberReducer(currentWeekTips)}
        />
        <Analytic
          currency={user.currency}
          name="This Month"
          data={numberReducer(currentMonthTips)}
        />
      </div>
    </Section>
  );
};

export default Overview;

interface IAnalytic {
  name: string;
  data: number;
  currency: string;
}

const Analytic: React.FC<IAnalytic> = ({ name, data, currency }) => {
  return (
    <div className="rounded-md border-2 border-slate-200 py-6 px-2">
      <p className="text-center text-sm ">{name}</p>
      <p className=" text-center text-xl font-bold text-slate-400">
        <span className="text-sm">{HandleCurrency()}</span>
        {data.toFixed(2)}
      </p>
    </div>
  );
};
