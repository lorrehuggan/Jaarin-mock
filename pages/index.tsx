import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import TipPic from '../public/assets/tippic.jpg';

const Home: NextPage = () => {
  return (
    <>
      <nav className="mx-auto flex h-24 w-2/3 items-center justify-between ">
        <div className="flex items-center">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded bg-slate-600 p-1 font-mono uppercase text-white">
            J
          </div>
          <h2 className="font-mono text-2xl font-bold">Jaarin</h2>
        </div>
        <ul className="flex items-center uppercase text-slate-500">
          <li className="mr-4">
            <Link href="/login" passHref>
              Login
            </Link>
          </li>
          <li className="">
            <Link href="/signup" passHref>
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex h-[calc(100vh-6rem)] items-center">
        <div className="mx-auto w-2/3">
          <div className="grid grid-cols-2 gap-8">
            <h1 className="text-8xl font-bold leading-tight">
              The Sophisticated Tip App
            </h1>
            <div className="relative h-full w-full">
              <Image
                className=" rounded-md"
                src={TipPic}
                alt="profile"
                layout="fill"
              />
            </div>
            <p className="mx-auto w-full text-xl text-slate-400">
              Jaarin gives you the best tip experience with all the features you
              need for production: hybrid static & server rendering, TypeScript
              support, smart bundling, route pre-fetching, and more. No config
              needed.
            </p>
            <div className="mx-auto flex w-full items-center justify-between">
              <Link href="/signup" passHref>
                <button className="mr-2 h-full w-full rounded-md bg-rose-500 px-4 py-2 font-bold uppercase text-white transition-colors duration-300 ease-in-out hover:bg-rose-700">
                  Sign up
                </button>
              </Link>
              <Link href="login" passHref>
                <button className="m;-2 h-full w-full rounded-md bg-rose-500 px-4 py-2 font-bold uppercase text-white transition-colors duration-300 ease-in-out hover:bg-rose-700">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
