import { AuthenticatedUser } from '../types/user-types';
import { useUserState } from 'context/user/userProvider';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const UseAuth = () => {
  const [{ authenticatedUser }, dispatch] = useUserState();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decodedToken: AuthenticatedUser = jwtDecode(
        localStorage?.getItem('token')!
      );
      if (decodedToken != null && decodedToken.exp * 1000 < Date.now()) {
        router.push('/login');
      } else {
        dispatch({
          type: 'AUTHENTICATION',
          authenticatedUser: decodedToken,
        });
      }
    } else {
      router.push('/login');
    }
  }, [router, dispatch]);

  return { authenticatedUser };
};
