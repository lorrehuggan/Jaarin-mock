import React from 'react';
import HTMLHead from '@components/Head';
import useSWR from 'swr';
import { UseAuth } from 'utils/hooks/useAuth';
import { jobRoutes } from 'utils/api-routes';
import { Job } from 'utils/types/job-types';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';
import { Loader } from '@mantine/core';
import Nav from '@components/Dashboard/Nav/Nav';
import SideBar from '@components/Dashboard/SideBar';
import Main from '@components/Dashboard/Main/Main';
import { AuthenticatedUser } from 'utils/types/user-types';

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
        <main className="min-h-[calc(100vh-5rem)] bg-slate-50 lg:ml-52">
          <Main data={data} user={user} />
        </main>
      </>
    );
  }
};

export default Dashboard;
