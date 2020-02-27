import React, { FC, useState } from 'react'
import { Formik, FormikHelpers } from 'formik'
import { FormTemplate } from '..'
import {
  AppState,
  checkLength,
  decryptPassword,
  initialState as initialUpdateFormValues,
  UpdateFormProps,
  UpdateSchema,
  updateStorage,
} from '../../utils'

import styles from '../Form.module.scss'

export const UpdateForm: FC<UpdateFormProps> = ({ credentials: { username, password }, setCredentials }) => {

  const [isUpdated, setIsUpdated] = useState(false)
  const [isEmptyUpdate, setIsEmptyUpdate] = useState(false)

  return (
    <div className={styles.container}>
      <h4>Login Saviour</h4>
      <h5>Credentials are safe!<span>*</span></h5>
      <Formik
        initialValues={initialUpdateFormValues}
        validationSchema={UpdateSchema}
        onSubmit={(values: AppState, { setSubmitting, resetForm }: FormikHelpers<AppState>) => {

          const isUsername = checkLength(values.username)
          const isPassword = checkLength(values.password)

          if (isUsername || isPassword) {

            const updatedUsername = isUsername ? values.username : username
            const updatedPassword = isPassword ? values.password : decryptPassword(password)
            const updatedCredentials: AppState = {
              username: updatedUsername,
              password: updatedPassword,
            }

            setIsEmptyUpdate(false)
            setCredentials(updatedCredentials)
            updateStorage(updatedCredentials)
            setIsUpdated(true)

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
          <FormTemplate
            errors={errors}
            touched={touched}
            buttonName='Update Credentials'
            actionType='update'
          />
        )}
      </Formik>

      {(isUpdated && !isEmptyUpdate) && <div className={styles.updateMsg}>Update successful!</div>}

      {isEmptyUpdate && <div className={styles.errorMsg}>Please fill at least one field to update!</div>}

      <div className={styles.updateMsg}><span>*</span>From the wrath of forgetfulness</div>
    </div>
  )
}
