import React, { FC } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import './InputForm.scss'
import './Skeleton.scss'

interface Values {
  userName: string;
  password: string;
}

const SignupSchema: Yup.ObjectSchema<Yup.Shape<object, Values>> = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Required'),
});


const InputForm: FC<{}> = () => {
  return (
    <div className="container">
      <h1>Login Saviour</h1>
      <h4>Save your credentials from the wrath of forgetfullness</h4>
      <Formik
        initialValues={{
          userName: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 500);
          // TODO: do some state setting shit
          console.log({ values })
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="userName">User Name</label>
            <Field id="userName" name="userName" placeholder="enter your name" type="text" />
            {errors.userName && touched.userName ? (
              <div className='error-msg'>{errors.userName}</div>
            ) : null}

            <label htmlFor="password">Password</label>
            <Field id="password" name="password" placeholder="enter your password" type="password" />
            {errors.password && touched.password ? (
              <div className='error-msg'>{errors.password}</div>
            ) : null}

            <div className='submit-btn-wrapper'>
              <button type="submit">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default InputForm