import React from 'react';
import HTMLHead from '../../components/Head';
import UserCard from '../../components/Dashboard/UserCard';
import AddShift from '../../components/Dashboard/AddShift';
import ShiftCard from '../../components/Dashboard/ShiftCard';
type Props = {};

const Dashboard = (props: Props) => {
  return (
    <>
      <HTMLHead title="Dashboard" />
      <main>
        <UserCard />
        <AddShift />
        <ShiftCard />
      </main>
    </>
  );
};

export default Dashboard;
