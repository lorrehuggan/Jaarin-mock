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
      const decodedToken: AuthenticatedUser = jwtDecode(token);
      const exp = fromUnixTime(decodedToken.exp);
      const authorized = isFuture(exp);
      if (authorized) {
        dispatch({ type: 'AUTHENTICATION', authenticatedUser: decodedToken });
      } else {
        router.push('/login');
      }
      return;
    }
    if (!token) {
      router.push('/login');
    }
  }, [dispatch, router]);

  return { authenticatedUser };
};
