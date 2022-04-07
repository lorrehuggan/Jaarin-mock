import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <nav className="mx-auto flex h-24 w-2/3 items-center justify-between px-10">
        <div>
          <h1 className="font-mono text-3xl font-bold">Jaarin</h1>
        </div>
        <ul className="flex items-center uppercase text-slate-500">
          <li className="mr-4">Login</li>
          <li className="">Sign Up</li>
        </ul>
      </nav>
      <main className="flex h-[calc(100vh-6rem)] items-center">
        <div className="mx-auto w-2/3">
          <h1 className="text-center text-9xl font-bold leading-tight">
            The Sophisticated Tip App
          </h1>
          <p className="mx-auto mt-8 w-3/5 text-xl text-slate-400">
            Jaarin gives you the best tip experience with all the features you
            need for production: hybrid static & server rendering, TypeScript
            support, smart bundling, route pre-fetching, and more. No config
            needed.
          </p>
          <div className="mx-auto mt-10 flex w-3/5 items-center justify-between">
            <button className="mx-2 w-full rounded-md bg-rose-500 px-4 py-2 font-bold uppercase text-white transition-colors duration-300 ease-in-out hover:bg-rose-700">
              Sign up
            </button>
            <button className="mx-2 w-full rounded-md bg-rose-500 px-4 py-2 font-bold uppercase text-white transition-colors duration-300 ease-in-out hover:bg-rose-700">
              Login
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
