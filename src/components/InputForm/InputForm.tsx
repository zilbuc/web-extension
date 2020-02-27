import React, { FC, useEffect } from 'react'
import { Formik, FormikHelpers } from 'formik'
import { FormTemplate } from '..'
import {
  AppState,
  initialState as initialValues,
  InputFormProps,
  SignupSchema,
  updateStorage
} from '../../utils'

import styles from '../Form.module.scss'

export const InputForm: FC<InputFormProps> = ({ setCredentials }) => {

  let timeoutId: number

  useEffect(() => {
    return () => clearTimeout(timeoutId)
  })

  return (
    <div className={styles.container}>
      <h4>Login Saviour</h4>
      <h5>Save your credentials from the wrath of forgetfulness</h5>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values: AppState, { setSubmitting }: FormikHelpers<AppState>) => {
          timeoutId = setTimeout(() => setCredentials(values))

          updateStorage(values)
          setSubmitting(false)
        }}
      >
        {({ errors, touched }) => (
          <FormTemplate
            errors={errors}
            touched={touched}
            buttonName='Submit Credentials'
            actionType='enter'
          />
        )}
      </Formik>
    </div>
  )
}
