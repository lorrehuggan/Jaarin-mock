import { AuthenticatedUser } from '../types/user-types';
import { useUserState } from 'context/user/userProvider';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isFuture, fromUnixTime } from 'date-fns';

export const UseAuth = () => {
  const [{ authenticatedUser }, dispatch] = useUserState();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // redirect back to dashboard if user is already logged in
      if (router.pathname === '/login') {
        router.push('/dashboard');
        return;
      }
      // decode token received from sever
      const decodedToken: AuthenticatedUser = jwtDecode(token);
      // convert token expiry date from unix time to regular date
      const exp = fromUnixTime(decodedToken.exp);
      //check if expiry is in the future and if so set user as authorize else redirect
      const authorized = isFuture(exp);
      if (authorized) {
        dispatch({
          type: 'AUTHENTICATION',
          authenticatedUser: { ...decodedToken },
        });
      } else {
        router.push('/login');
      }
      return;
    }
    //redirect if no token is present
    if (!token) {
      router.push('/login');
    }
    return () => {};
  }, [dispatch, router]);

  return { authenticatedUser };
};
