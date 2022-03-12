import React, { useState } from 'react';
import Section from '../DashboardSection';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from '@mantine/dates';
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
  const [value, onChange] = useState<Date | null>(new Date());

  return (
    <Section>
      <div className="mb-4">
        <h4 className="text-2xl">Add Shift</h4>
      </div>
      <Formik
        initialValues={{
          date: 0,
          hours_worked: 0,
        }}
        onSubmit={async (values: Values) => {
          console.log({ ...values, date: value });
        }}
        validationSchema={AddShiftSchema}
      >
        {({ errors, touched }) => (
          <Form className="mx-auto mt-2 w-full">
            <label htmlFor="date" className="text-sm text-slate-500">
              Enter Date
            </label>
            <DatePicker
              dropdownType="modal"
              className="my-2"
              value={value}
              onChange={onChange}
            />
            <label htmlFor="hours_worked" className="text-sm text-slate-500">
              Shift Length
            </label>
            <Field
              id="hours_worked"
              placeholder="Shift Length"
              type="number"
              name="hours_worked"
              className="my-2 w-full rounded bg-slate-300 px-4 py-2 text-white"
            />
            {errors.date ? <p>{errors.hours_worked}</p> : null}
            <button
              type="submit"
              className="mt-2 w-full rounded bg-slate-300 p-2 text-center uppercase transition-colors duration-300 ease-in-out hover:bg-pink-400"
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
