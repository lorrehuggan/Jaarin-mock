import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from 'context/user/userProvider';
import { userInitialState, userReducer } from 'context/user/UserReducer.';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider initialState={userInitialState} reducer={userReducer}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
