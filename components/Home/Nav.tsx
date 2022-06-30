import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

type Props = {};

const Nav: React.FC<Props> = ({}) => {
  const router = useRouter();
  const path = router.pathname;
  console.log(path);

  return (
    <nav className="mx-auto flex h-24 w-2/3 items-center justify-between xl:w-1/3 ">
      <Link href="/" passHref>
        <div className="flex cursor-pointer items-center">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded bg-slate-600 p-1 font-mono uppercase text-white">
            J
          </div>
          <h2 className="font-mono text-2xl font-bold">Jaarin Beta</h2>
        </div>
      </Link>
      <ul className="flex items-center uppercase text-slate-500">
        <li className="mr-4">
          {path === '/login' ? (
            ''
          ) : (
            <Link href="/login" passHref>
              Login
            </Link>
          )}
        </li>
        <li className="">
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