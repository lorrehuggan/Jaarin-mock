import React, { useState } from 'react';
import { Formik, Field, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { userRoutes } from '../../utils/api-routes';
import { AuthenticatedUser, SignUpInput, UserID } from 'utils/types/user-types';
import { useRouter } from 'next/router';
import { UseAuth } from 'utils/hooks/useAuth';
import Nav from '@components/Home/Nav';
import { Loader } from '@mantine/core';
import YupPassword from 'yup-password';
YupPassword(Yup);

type Props = {};

const signUpSchema = Yup.object({
  username: Yup.string().required('Username is required').min(3),
  email: Yup.string()
    .required('Email is required')
    .email('Must be a valid email'),
  job_title: Yup.string().required('Job Title Required').min(2),
  company_name: Yup.string().required('Company name required').min(2),
  // currency: Yup.string().required('Currency required'),
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

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      job_title: '',
      company_name: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch(userRoutes.create, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const data: UserID = await res.json();

        if (data.error) {
          const val = formik.values;
          setLoading(false);
          setError(data.error);

          return;
        }
        formik.resetForm();

        formik.resetForm();
        if (data.token) {
          localStorage.setItem('token', data.token);
          router.push(`/dashboard`);
          setLoading(false);
        }
      } catch (error: any) {
        setLoading(false);
        setError(error);
      }
      setLoading(false);
    },
    validationSchema: signUpSchema,
  });

  if (loading) {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <Loader color="gray" size="xl" />
      </main>
    );
  }

  return (
    <>
      <Nav />
      <section className="flex h-[calc(100vh-6rem)] w-[100vw] flex-col items-center justify-center ">
        <form
          onSubmit={formik.handleSubmit}
          className="w-[350px] flex-col items-center justify-center rounded bg-slate-100 p-10"
        >
          <div className="mb-4 flex flex-col justify-between">
            <label
              htmlFor="username"
              className="mb-2 font-mono text-xl uppercase"
            >
              Username
            </label>
            <input
              className="rounded p-2"
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.errors.username && formik.touched.username ? (
              <p className="mt-1 text-sm text-red-400">
                {formik.errors.username}
              </p>
            ) : null}
            <label htmlFor="email" className="my-2 font-mono text-xl uppercase">
              Email
            </label>
            <input
              className="rounded p-2"
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="mt-1 text-sm text-red-400">{formik.errors.email}</p>
            ) : null}
            <label htmlFor="email" className="my-2 font-mono text-xl uppercase">
              Job Title
            </label>
            <input
              className="rounded p-2"
              type="text"
              id="job_title"
              name="job_title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.job_title}
            />
            {formik.errors.job_title && formik.touched.job_title ? (
              <p className="mt-1 text-sm text-red-400">
                {formik.errors.job_title}
              </p>
            ) : null}
            <label htmlFor="email" className="my-2 font-mono text-xl uppercase">
              Company Name
            </label>
            <input
              className="rounded p-2"
              type="text"
              id="company_name"
              name="company_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.company_name}
            />
            {formik.errors.company_name && formik.touched.company_name ? (
              <p className="mt-1 text-sm text-red-400">
                {formik.errors.company_name}
              </p>
            ) : null}

            <label
              htmlFor="password"
              className="mb-2 font-mono text-xl uppercase"
            >
              Password
            </label>
            <input
              className="mt-1 rounded p-2"
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="mt-1 text-sm text-red-400">
                {formik.errors.password}
              </p>
            ) : null}
            <label
              htmlFor="confirmPassword"
              className="mb-2 font-mono text-xl uppercase"
            >
              Confirm Password
            </label>
            <input
              className="mt-1 rounded p-2"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <p className="mt-1 text-sm text-red-400">
                {formik.errors.confirmPassword}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="mt-4 rounded bg-jaarin-pink-500 p-2 text-slate-800 hover:bg-jaarin-pink-300 disabled:bg-slate-700"
            >
              Sign Up
            </button>
          </div>
        </form>
        {error && <p>{error}</p>}
      </section>
    </>
  );
};

export default SignUp;
