import React, { useEffect } from 'react';
import HTMLHead from '@components/Head';
import UserCard from '@components/Dashboard/Overview';
import AddShift from '@components/Dashboard/AddShift';
import ShiftCard from '@components/Dashboard/ShiftCard';
import useSWR from 'swr';
import WeeklyAreaChart from '@components/Dashboard/Charts/AreaChart/Weekly';
import { AuthenticatedUser } from 'utils/types/user-types';
import { UseAuth } from 'utils/hooks/useAuth';
import { jobRoutes } from 'utils/api-routes';
import { Job } from 'utils/types/job-types';
import WeeklyRadialBarChart from '@components/Dashboard/Charts/RadialBarChart/Weekly';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';
import MonthlyAreaChart from '@components/Dashboard/Charts/AreaChart/Monthly';
import { Loader } from '@mantine/core';
import Nav from '@components/Dashboard/Nav/Nav';
import SideBar from '@components/Dashboard/SideBar';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const { token } = useLocalStorage();
  const { authenticatedUser: user }: { authenticatedUser: AuthenticatedUser } =
    UseAuth();
  const { data, error } = useSWR<Job>([jobRoutes.base, token]);

  if (!data) {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <Loader color="gray" size="xl" />
      </main>
    );
  }
  if (error) {
    return <p>Error...</p>;
  }

  if (data && user) {
    return (
      <>
        <HTMLHead title="Dashboard" />
        <Nav />
        <SideBar />
        <main className="w-[calc(100vw -6rem)] min-h-[calc(100vh-5rem)] bg-slate-50 lg:ml-52">
          <section className="grid grid-cols-1 pt-12 lg:mx-auto lg:w-[90%] lg:grid-cols-3 lg:gap-4 lg:pt-24">
            <UserCard job={data} user={user} />
            <AddShift />
            <ShiftCard wages={data?.wages} jobID={data?._id} />
          </section>
          <section className="mt-2 grid grid-cols-1 lg:mx-auto lg:w-[90%] lg:grid-cols-2 lg:gap-4">
            <WeeklyAreaChart wages={data?.wages} />
            <MonthlyAreaChart wages={data?.wages} />
          </section>
        </main>
      </>
    );
  }
};

export default Dashboard;
