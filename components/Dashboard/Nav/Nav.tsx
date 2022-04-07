import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { UseAuth } from 'utils/hooks/useAuth';
import { AuthenticatedUser } from 'utils/types/user-types';
import { Popover } from '@mantine/core';
type Props = {};

const Nav = (props: Props) => {
  const [uOpened, setUOpened] = useState(false);
  const { authenticatedUser: user }: { authenticatedUser: AuthenticatedUser } =
    UseAuth();
  const router = useRouter();
  const handleLogout = (): void => {
    localStorage.removeItem('token');
    router.push('/');
  };
  const usernameFirstCharacter = user.username.split('')[0];
  return (
    <section className="flex h-20 items-center justify-between border-b-[1px] border-neutral-300 bg-white px-10 lg:ml-52">
      <div>
        <p className="">
          👋<span className="">{` ${user.username}`}</span>
        </p>
      </div>
      <ul className="flex items-center justify-between lg:w-[10%]">
        <li>
          <Popover
            opened={uOpened}
            position="bottom"
            onClose={() => setUOpened(false)}
            target={
              <div
                onClick={() => setUOpened(!uOpened)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-pink-500 p-4"
              >
                <p className="uppercase text-white">{usernameFirstCharacter}</p>
              </div>
            }
          >
            <div
              onClick={handleLogout}
              className="cursor-pointer p-2 hover:bg-neutral-50"
            >
              <div className="flex w-full items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 h-5 w-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>

                <p className="cursor-pointer text-sm text-red-500 transition-colors duration-200 ease-out">
                  Log-out
                </p>
              </div>
            </div>
          </Popover>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </li>
      </ul>
    </section>
  );
};

export default Nav;
