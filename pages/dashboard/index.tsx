import React from 'react';
import HTMLHead from '@components/Head';
import UserCard from '@components/Dashboard/UserCard';
import AddShift from '@components/Dashboard/AddShift';
import ShiftCard from '@components/Dashboard/ShiftCard';
import useSWR from 'swr';
import DailyAreaChart from '@components/Dashboard/Charts/AreaChart/Weekly';
import { AuthenticatedUser } from 'utils/types/user-types';
import { UseAuth } from 'utils/hooks/useAuth';
import { jobRoutes } from 'utils/api-routes';
import { Job } from 'utils/types/job-types';

type Props = {};

const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then((res) => res.json());

const Dashboard = (props: Props) => {
  const { authenticatedUser: user }: { authenticatedUser: AuthenticatedUser } =
    UseAuth();
  const { data } = useSWR<Job>(
    [jobRoutes.base, localStorage.getItem('token')],
    fetcher
  );

  return (
    <>
      <HTMLHead title="Dashboard" />
      <main className="pb-10">
        <div className="mx-auto mt-8 flex w-[90%] items-center justify-between">
          <p className="">{data?.company_name}</p>
          <p>{`Hi ${user.currency}`}</p>
        </div>
        <UserCard />
        <AddShift />
        <DailyAreaChart />
        <ShiftCard />
      </main>
    </>
  );
};

export default Dashboard;
