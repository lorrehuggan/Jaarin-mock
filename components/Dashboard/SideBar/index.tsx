import { useUserState } from 'context/user/userProvider';
import React from 'react';

type Props = {};

const menu = [
  {
    name: 'Settings',
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    ),
  },
  {
    name: 'Account',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    ),
  },
  {
    name: 'Shifts',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

const SideBar = (props: Props) => {
  const [{ mobileMenu }, dispatch] = useUserState();

  return (
    <section
      className={`fixed ${
        mobileMenu.isOpen ? 'left-0 shadow-xl' : '-left-52'
      } top-0 z-20  h-full w-52 border-r-[1px] border-neutral-300 bg-white transition-all duration-300 ease-in-out lg:left-0`}
    >
      <div className="flex h-20 items-center justify-center px-10">
        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded bg-slate-600 p-1 font-mono uppercase text-white">
          J
        </div>
        <h2 className="font-mono text-xs font-bold">Jaarin Beta</h2>
      </div>

      {menu.map((item, i) => (
        <div
          className="flex cursor-pointer items-center py-4 pl-9 hover:bg-slate-100"
          key={item.name}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            {item.icon}
          </svg>
          <p>{item.name}</p>
        </div>
      ))}

      <div className="mt-8 flex cursor-not-allowed items-center pl-9 text-slate-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <div>
          <p>Plugins</p>
          <p className="text-xs">coming soon</p>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
