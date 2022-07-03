import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

type Props = {};

const Nav: React.FC<Props> = ({}) => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <nav className="mx-auto flex h-24 w-2/3 items-center justify-between xl:w-1/3 ">
      <Link href="/" passHref>
        <div className="flex transform cursor-pointer items-center transition-all duration-200 ease-in-out hover:-translate-x-4">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded bg-slate-600 p-1 font-mono uppercase text-white">
            J
          </div>
          <Link href="/" passHref>
            <h2 className="font-mono text-2xl font-bold">
              Jaarin{' '}
              <span className=" bg-jaarin-pink-500/30 p-2 font-sans text-xl">
                alpha
              </span>
            </h2>
          </Link>
        </div>
      </Link>
      <ul className="flex items-center uppercase text-slate-500">
        <li className="hover:text-jaarin-pink-500">
          {path === '/login' ? (
            ''
          ) : (
            <Link href="/login" passHref>
              Login
            </Link>
          )}
        </li>
        <li className="ml-4 hover:text-jaarin-pink-500">
          {path === '/signup' ? (
            ''
          ) : (
            <Link href="/signup" passHref>
              Sign Up
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
