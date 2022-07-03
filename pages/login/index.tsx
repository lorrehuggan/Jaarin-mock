import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { userRoutes } from '../../utils/api-routes';
import { AuthenticatedUser, LoginInput, UserID } from 'utils/types/user-types';
import { useRouter } from 'next/router';
import { UseAuth } from 'utils/hooks/useAuth';
import Nav from '@components/Home/Nav';
import { Loader } from '@mantine/core';
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
      <section>
        {error ? <p>{error}</p> : ''}
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={async (values: LoginInput, { resetForm }) => {
            try {
              const res = await fetch(userRoutes.login, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });
              setLoading(true);
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
            <Form className="mx-auto flex w-40 flex-col bg-slate-500 p-4">
              <label htmlFor="username">username</label>
              <Field
                id="username"
                placeholder="username"
                type="text"
                name="username"
              />
              {errors.username && touched.username ? (
                <p className="text-xs text-red-500">{errors.username}</p>
              ) : (
                ''
              )}
              <label htmlFor="password">password</label>
              <Field
                id="password"
                placeholder="password"
                type="password"
                name="password"
              />
              {errors.password && touched.password ? (
                <p>{errors.password}</p>
              ) : (
                ''
              )}
              <button
                className="bg-slate-200 active:bg-violet-300"
                type="submit"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default Login;
