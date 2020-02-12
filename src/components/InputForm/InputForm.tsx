import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { AppState } from '../../App'

import '../Form.scss'
import '../Skeleton.scss'

const SignupSchema: Yup.ObjectSchema<Yup.Shape<object, AppState>> = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Required'),
});

export interface InputFormProps {
  setCredentials: Dispatch<SetStateAction<AppState>>
}

const initialValues: AppState = {
  username: '',
  password: '',
}

const InputForm: FC<InputFormProps> = ({ setCredentials }) => {

  // let timeoutId: NodeJS.Timeout
  // const clearTimeouts = () => {
  //   clearTimeout(timeoutId)
  //   console.log('3')
  // }

  useEffect(() => {
    console.log('1')

    return setCredentials(initialValues)
  })

  return (
    <div className="container">
      <h4>Login Saviour</h4>
      <h5>Save your credentials from the wrath of forgetfullness</h5>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values: AppState, { setSubmitting, resetForm }: FormikHelpers<AppState>) => {
          // timeoutId = setCredentials(values)

          // TODO: update extensionStorage,
          setSubmitting(false)
          resetForm()
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="username">User Name</label>
            <Field id="username" name="username" placeholder="enter username" type="text" />
            {errors.username && touched.username ? (
              <div className='error-msg'>{errors.username}</div>
            ) : null}

            <label htmlFor="password">Password</label>
            <Field id="password" name="password" placeholder="enter your password" type="password" />
            {errors.password && touched.password ? (
              <div className='error-msg'>{errors.password}</div>
            ) : null}

            <div className='submit-btn-wrapper'>
              <button type="submit" className='submit-btn'>
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

//clean the form after submitting
// what the shnitzel memory leak? setCredentials must be unsubscribed