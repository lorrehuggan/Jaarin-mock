import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { userRoutes } from '../../utils/api-routes';
import { AuthenticatedUser, LoginInput, UserID } from 'utils/types/user-types';
import { useRouter } from 'next/router';
import { UseAuth } from 'utils/hooks/useAuth';
import Nav from '@components/Home/Nav';
import { Loader } from '@mantine/core';
import Link from 'next/link';

type Props = {};

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Must be 6 characters or more'),
});

const Login = (props: Props) => {
  const router = useRouter();
  const { authenticatedUser: user }: { authenticatedUser: AuthenticatedUser } =
    UseAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <Loader color="gray" size="xl" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <>
      <Nav />
      <section className="flex h-[calc(100vh-6rem)] w-[100vw] flex-col items-center justify-center ">
        <h1 className="mb-4 font-mono text-2xl text-slate-400">Login</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={async (values: LoginInput, { resetForm }) => {
            try {
              setLoading(true);
              const res = await fetch(userRoutes.login, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });
              const data: UserID = await res.json();
              resetForm();
              if (data.token) {
                localStorage.setItem('token', data.token);
                router.push(`/dashboard`);
                setLoading(false);
              }
            } catch (error: any) {
              setLoading(false);
              setError(error.message);
            }
            setLoading(false);
          }}
          validationSchema={loginSchema}
        >
          {({ errors, touched }) => (
            <Form className="w-[350px] flex-col items-center justify-center rounded bg-slate-100 p-10">
              <div className="mb-4 flex-col items-center justify-between">
                <label
                  htmlFor="username"
                  className="font-mono text-xl uppercase"
                >
                  Username
                </label>
                <div className="mt-2">
                  <Field
                    id="username"
                    placeholder="noah1987"
                    type="text"
                    name="username"
                    className="w-full p-2"
                  />
                  {errors.username && touched.username ? (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.username}
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="font-mono text-xl uppercase"
                >
                  Password
                </label>
                <div className="mt-2 flex-col items-center justify-between">
                  <Field
                    id="password"
                    placeholder="********"
                    type="password"
                    name="password"
                    className="w-full p-2"
                  />
                  {errors.password && touched.password ? (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password}
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <button
                className="mt-8 w-full rounded bg-slate-500 p-4 text-slate-50 hover:bg-slate-400 hover:text-slate-800 active:bg-violet-300"
                type="submit"
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-2">
          Don't have an account?{' '}
          <span className="cursor-pointer text-jaarin-pink-700">
            <Link href="/signup">Sign up here</Link>
          </span>
        </p>
      </section>
    </>
  );
};

export default Login;
