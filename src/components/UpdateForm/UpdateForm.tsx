import React, { FC, useState, useEffect } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { AppState } from '../../App'
import { InputFormProps } from '../InputForm/InputForm'

import '../Form.scss'
import '../Skeleton.scss'

interface UpdateFormProps extends InputFormProps {
  credentials: AppState
}

const UpdateSchema: Yup.ObjectSchema<Yup.Shape<object, AppState>> = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
});

const initialValues: AppState = {
  username: '',
  password: '',
}


const initialState = false

const UpdateForm: FC<UpdateFormProps> = ({ credentials: { username, password }, setCredentials }) => {

  const [isUpdated, setIsUpdated] = useState(initialState)
  let timeoutId: NodeJS.Timeout
  const clearTimeouts = () => {
    clearTimeout(timeoutId)
    console.log('3')
  }

  useEffect(() => {
    console.log('1')

    return clearTimeouts()
  })

  return (
    <div className="container">
      <h4>Login Saviour</h4>
      <h5>Update your credentials from the wrath of forgetfullness</h5>
      <Formik
        initialValues={initialValues}
        validationSchema={UpdateSchema}
        onSubmit={(values: AppState, { setSubmitting, resetForm }: FormikHelpers<AppState>) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 500);
          const updatedUsername = values.username.length > 0 ? values.username : username
          const updatedPassword = values.password.length > 0 ? values.password : password

          const updatedCredentials: AppState = {
            username: updatedUsername,
            password: updatedPassword,
          }

          setCredentials(updatedCredentials)
          setIsUpdated(true) // async action!
          // TODO: update extensionStorage
          timeoutId = setTimeout(() => {
            setIsUpdated(false)
            console.log('2')
          }, 3000)

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
                Update Credentials
              </button>
            </div>

          </Form>
        )}
      </Formik>

      {isUpdated && <div className='update-msg'>Update succesful!</div>}

    </div>
  )
}

export default UpdateForm

//clean the form after submitting