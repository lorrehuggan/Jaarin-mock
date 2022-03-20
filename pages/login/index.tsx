import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { userRoutes } from '../../utils/api-routes';
import { LoginInput, UserID } from 'utils/types/user-types';
import { useRouter } from 'next/router';
type Props = {};

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Must be 6 characters or more'),
});

const Login = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <section>
      {loading ? <p>loading..</p> : <p>not loading..</p>}
      {error ? <p>{error}</p> : ''}
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (values: LoginInput, { resetForm }) => {
          setLoading(true);
          try {
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
            <button className="bg-slate-200 active:bg-violet-300" type="submit">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Login;
