import React from 'react';
import Section from '../DashboardSection';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
type Props = {};

interface Values {
  date: number;
  hours_worked: number;
}

const AddShiftSchema = Yup.object().shape({
  date: Yup.number().required('Required'),
  hours_worked: Yup.number().min(2, 'Invalid').max(24, 'Invalid'),
});

const AddShift = (props: Props) => {
  return (
    <Section>
      <div>
        <h4 className="text-2xl font-black">Add Shift</h4>
      </div>
      <Formik
        initialValues={{
          date: 0,
          hours_worked: 0,
        }}
        onSubmit={async (values: Values) => {
          console.log(values);
        }}
        validationSchema={AddShiftSchema}
      >
        {({ errors, touched }) => (
          <Form className="mx-auto mt-4 w-full">
            <label htmlFor="date">Enter Date</label>
            <Field
              id="date"
              name="date"
              type="number"
              placeholder="Enter Shift Date"
              className="my-2 w-full rounded bg-slate-800 p-2 text-white"
            />
            {errors.date ? <p>{errors.date}</p> : null}
            <label htmlFor="hours_worked">Shift Length</label>
            <Field
              id="hours_worked"
              placeholder="Shift Length"
              type="number"
              name="hours_worked"
              className="my-2 w-full rounded bg-slate-800 p-2 text-white"
            />
            {errors.date ? <p>{errors.hours_worked}</p> : null}
            <button
              type="submit"
              className="mt-2 w-full rounded bg-slate-400 p-2 text-center font-black"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Section>
  );
};

export default AddShift;
