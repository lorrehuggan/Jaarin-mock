import React from 'react';
import { Job } from 'utils/types/job-types';
import { AuthenticatedUser } from 'utils/types/user-types';
import UserCard from '@components/Dashboard/Overview';
import AddShift from '@components/Dashboard/AddShift';
import ShiftCard from '@components/Dashboard/ShiftCard';
import WeeklyAreaChart from '@components/Dashboard/Charts/AreaChart/Weekly';
import MonthlyAreaChart from '@components/Dashboard/Charts/AreaChart/Monthly';

interface Props {
  data: Job;
  user: AuthenticatedUser;
}

const Main: React.FC<Props> = ({ data, user }) => {
  return (
    <>
      <section className="grid grid-cols-1 pt-12 lg:mx-auto lg:w-[90%] lg:grid-cols-3 lg:gap-4 lg:pt-24">
        <UserCard job={data} user={user} />
        <AddShift />
        <ShiftCard wages={data?.wages} jobID={data?._id} />
      </section>
      <section className="mt-2 grid grid-cols-1 lg:mx-auto lg:w-[90%] lg:grid-cols-2 lg:gap-4">
        <WeeklyAreaChart wages={data?.wages} />
        <MonthlyAreaChart wages={data?.wages} />
      </section>
    </>
  );
};

export default Main;
