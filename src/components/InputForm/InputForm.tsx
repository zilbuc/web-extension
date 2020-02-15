import React, { FC, useEffect } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
// import { browser } from 'webextension-polyfill-ts'
// import chromep from 'chrome-promise'
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
  setCredentials(credentials: AppState): void
}

const initialValues: AppState = {
  username: '',
  password: '',
}

declare const chrome: any

// const { chrome } = window
// let chrm: any;

// const chrm = window.chrome 

export const updateStorage = (creds: AppState): void => {
  chrome.storage.local.set(creds, () => {
    console.log('Value is set to ' + creds.password);
  });
  // if (chromep.runtime) {
  // chromep.storage.local.set(creds)
  //   .then(() => {
  //     alert('foo set')

  //     console.log(chromep.storage.local.get(creds))
  //   })
  // }
}

const InputForm: FC<InputFormProps> = ({ setCredentials }) => {

  let timeoutId: number

  useEffect(() => {
    return () => clearTimeout(timeoutId)
  })

  return (
    <div className="container">
      <h4>Login Saviour</h4>
      <h5>Save your credentials from the wrath of forgetfullness</h5>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values: AppState, { setSubmitting }: FormikHelpers<AppState>) => {
          timeoutId = setTimeout(() => setCredentials(values))

          updateStorage(values)
          // TODO: update extensionStorage,
          setSubmitting(false)
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