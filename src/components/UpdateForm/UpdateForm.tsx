import React, { FC, useState } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { AppState } from '../../App'
import { InputFormProps, updateStorage } from '../InputForm/InputForm'

import '../Form.scss'
import '../Skeleton.scss'
import { setTimeout } from 'timers'

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

// type Creds = Yup.InferType<typeof UpdateSchema>;

const initialUpdateFormValues: AppState = {
  username: '',
  password: '',
}


const initialState = false

const checkLength = (str: string): boolean => {
  return str.length > 0
}

const UpdateForm: FC<UpdateFormProps> = ({ credentials: { username, password }, setCredentials }) => {

  const [isUpdated, setIsUpdated] = useState(initialState)
  const [isEmptyUpdate, setIsEmptyUpdate] = useState(initialState)

  return (
    <div className="container">
      <h4>Login Saviour</h4>
      <h5>Update your credentials from the wrath of forgetfullness</h5>
      <Formik
        initialValues={initialUpdateFormValues}
        validationSchema={UpdateSchema}
        onSubmit={(values: AppState, { setSubmitting, resetForm }: FormikHelpers<AppState>) => {

          const isUsername = checkLength(values.username)
          const isPassword = checkLength(values.password)

          if (isUsername || isPassword) {

            const updatedUsername = isUsername ? values.username : username
            const updatedPassword = isPassword ? values.password : password
            const updatedCredentials: AppState = {
              username: updatedUsername,
              password: updatedPassword,
            }

            setIsEmptyUpdate(false)
            setCredentials(updatedCredentials)
            updateStorage(updatedCredentials)
            setIsUpdated(true)
            // TODO: update extensionStorage

            setTimeout(() => {
              setIsUpdated(false)
            }, 3000)

            resetForm()
          } else {
            setIsEmptyUpdate(true)
          }

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
                Update Credentials
              </button>
            </div>

          </Form>
        )}
      </Formik>

      {isUpdated && <div className='update-msg'>Update succesful!</div>}

      {isEmptyUpdate && <div className='error-msg'>Please fill at least one fied to update!</div>}

    </div>
  )
}

export default UpdateForm