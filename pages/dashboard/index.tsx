import React, { useEffect } from 'react';
import HTMLHead from '@components/Head';
import UserCard from '@components/Dashboard/UserCard';
import AddShift from '@components/Dashboard/AddShift';
import ShiftCard from '@components/Dashboard/ShiftCard';
import useSWR from 'swr';
import { LineChart } from '@components/Dashboard/Charts/LineChart/Daily';

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <>
      <HTMLHead title="Dashboard" />
      <main>
        <div className="mx-auto mt-8 flex w-[90%] items-center justify-between">
          <p className="">Dashboard</p>
          <p>Username</p>
        </div>
        <UserCard />
        <AddShift />
        <ShiftCard />
        <LineChart />
      </main>
    </>
  );
};

export default Dashboard;
