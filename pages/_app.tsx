import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { JobProvider } from 'context/job/JobProvider';
import { UserProvider } from 'context/user/userProvider';
import { userInitialState, userReducer } from 'context/user/UserReducer.';
import { jobInitialState, jobReducer } from 'context/job/JobReducer.';
import { SWRConfig } from 'swr';
import { ToastProvider } from 'react-toast-notifications';

const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <JobProvider initialState={jobInitialState} reducer={jobReducer}>
        <UserProvider initialState={userInitialState} reducer={userReducer}>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </UserProvider>
      </JobProvider>
    </SWRConfig>
  );
}

export default MyApp;
