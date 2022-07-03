import Nav from '@components/Home/Nav';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <main className="relative flex h-[calc(100vh-6rem)] items-center">
        <div className="relative mx-auto w-2/3 xl:w-1/3">
          <div className=" grid grid-cols-1 gap-8">
            <h1 className="text-8xl font-bold leading-tight">
              The Sophisticated Tip App
            </h1>
            <p className="mx-auto w-full text-xl text-slate-400">
              Jaarin gives you the best tip experience with all the features you
              need to successfully track your tip income with key data points
              like how much tips are you earning on a particular day which
              empowers you to adjust based on performance.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
