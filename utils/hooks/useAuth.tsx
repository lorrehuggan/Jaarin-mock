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
    if (router.pathname === '/dashboard' && !token) {
      router.push('/login');
      return;
    }
    if (router.pathname === '/login' && token) {
      router.push('/dashboard');
      return;
    }
    if (authenticatedUser.id && token) {
      return authenticatedUser;
    }
    if (token && !authenticatedUser.id) {
      const decodedToken: AuthenticatedUser = jwtDecode(token);
      const exp = fromUnixTime(decodedToken.exp);
      const authorized = isFuture(exp);
      if (authorized) {
        dispatch({
          type: 'AUTHENTICATION',
          authenticatedUser: { ...decodedToken },
        });
        return authenticatedUser;
      }
      if (!authorized && token) {
        localStorage.removeItem('token');
        dispatch({
          type: 'AUTHENTICATION',
          authenticatedUser: {
            id: '',
            email: '',
            username: '',
            iat: 0,
            exp: 0,
            createdAt: 0,
            currency: '',
          },
        });
        router.push('/login');
        return;
      }
    }
  });

  return { authenticatedUser };
};
