import Nav from '@components/Home/Nav';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import TipPic from '../public/assets/tippic.jpg';

const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <main className="flex h-[calc(100vh-6rem)] items-center">
        <div className="mx-auto w-2/3 xl:w-1/3 ">
          <div className="grid grid-cols-1 gap-8">
            <h1 className="text-8xl font-bold leading-tight">
              The Sophisticated Tip App
            </h1>

            <p className="mx-auto w-full text-xl text-slate-400">
              Jaarin gives you the best tip experience with all the features you
              need to successfully track your tip income with key data points
              like how much tips are you earning on a particular day which
              empowers you to adjust based on performance.
            </p>
            <div className="mx-auto flex w-full items-center justify-between">
              <Link href="/signup" passHref>
                <button className="mr-2 h-full w-full rounded-md bg-rose-500 px-4 py-2 font-bold uppercase text-white transition-colors duration-300 ease-in-out hover:bg-rose-700">
                  Sign up
                </button>
              </Link>
              <Link href="/login" passHref>
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
