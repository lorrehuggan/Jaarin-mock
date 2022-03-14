import React, { useEffect, useState } from 'react';
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
import { useRouter } from 'next/router';

type Props = {};

const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then((res) => res.json());

const token = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  } else {
    return;
  }
};

const Dashboard = (props: Props) => {
  const router = useRouter();
  const { authenticatedUser: user }: { authenticatedUser: AuthenticatedUser } =
    UseAuth();
  const { data, error } = useSWR<Job>([jobRoutes.base, token()], fetcher);

  useEffect(() => {
    const item = window.localStorage.getItem('token');
  }, []);

  if (!data) {
    return <p>Loading</p>;
  }

  if (data) {
    return (
      <>
        <HTMLHead title="Dashboard" />
        <main className="pb-10">
          <div className="mx-auto mt-8 flex w-[90%] items-center justify-between">
            <p className="">Dashboard</p>
            <p className="text-sm text-slate-400">{`Hi ${user.username}`}</p>
          </div>
          <UserCard job={data} user={user} />
          <AddShift />
          <DailyAreaChart wages={data.wages} />
          <ShiftCard />
        </main>
      </>
    );
  }
};

export default Dashboard;
