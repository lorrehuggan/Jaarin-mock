import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { userRoutes } from '../../utils/api-routes';
import { AuthenticatedUser, SignUpInput } from 'utils/types/user-types';
import { useRouter } from 'next/router';
import { UseAuth } from 'utils/hooks/useAuth';
import Nav from '@components/Home/Nav';
import { Loader } from '@mantine/core';
import YupPassword from 'yup-password';
YupPassword(Yup);

type Props = {};

const signUpSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').min(3),
  email: Yup.string()
    .required('Email is required')
    .email('Must be a valid email'),
  currency: Yup.string().required('Currency required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Must be 6 characters or more'),
  confirmPassword: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const SignUp = (props: Props) => {
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
        <Formik
          initialValues={{
            username: '',
            email: '',
            currency: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={async (values: SignUpInput, { resetForm }) => {
            console.log('ping');
            console.log(values);
            try {
              // setLoading(true);
              // const res = await fetch(userRoutes.login, {
              //   method: 'POST',
              //   headers: {
              //     'Content-Type': 'application/json',
              //   },
              //   body: JSON.stringify(values),
              // });
              // const data: UserID = await res.json();
              resetForm();
              // if (data.token) {
              //   localStorage.setItem('token', data.token);
              //   router.push(`/dashboard`);
              //   setLoading(false);
              // }
            } catch (error: any) {
              setLoading(false);
              setError(error.message);
            }
            // setLoading(false);
          }}
          validationSchema={signUpSchema}
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
              <div className="mb-4 flex-col items-center justify-between">
                <label
                  htmlFor="currency"
                  className="font-mono text-xl uppercase"
                >
                  Currency
                </label>
                <div>
                  <div className="mt-2 flex w-full justify-between">
                    <div>
                      <label>GBP</label>
                      <Field
                        id="GBP"
                        placeholder="noah1987"
                        type="radio"
                        name="currency"
                        className="ml-1"
                        value="GBP"
                        label="USD"
                      />
                    </div>
                    <div>
                      <label>USD</label>
                      <Field
                        id="USD"
                        placeholder="noah1987"
                        type="radio"
                        name="currency"
                        className="ml-1"
                        value="USD"
                        label="USD"
                      />
                    </div>
                    <div>
                      <label>EUR</label>
                      <Field
                        id="EUR"
                        placeholder="noah1987"
                        type="radio"
                        name="currency"
                        className="ml-1"
                        value="EUR"
                        label="EUR"
                      />
                    </div>
                  </div>

                  {errors.currency && touched.currency ? (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.currency}
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
              <div className="mt-2">
                <label
                  htmlFor="confirmPassword"
                  className="font-mono text-xl uppercase"
                >
                  Confirm password
                </label>
                <div className="mt-2 flex-col items-center justify-between">
                  <Field
                    id="confirmPassword"
                    placeholder="********"
                    type="password"
                    name="confirmPassword"
                    className="w-full p-2"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.confirmPassword}
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
                Lets Get Started
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default SignUp;
