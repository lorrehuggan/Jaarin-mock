import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useSWR from 'swr';
import { userRoutes } from '../../utils/api-routes';
type Props = {};

interface Values {
  username: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Must be 6 characters or more'),
});

const Login = (props: Props) => {
  return (
    <section>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (values: Values, { resetForm }) => {
          const { username, password } = values;
          console.log(username, password);
          resetForm();
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
            {errors.username && touched.password ? (
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
