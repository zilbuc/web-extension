import React, { FC, useEffect } from 'react'
import { Formik, FormikHelpers } from 'formik'
import { FormTemplate } from '../../components'
import {
  AppState,
  initialState as initialValues,
  InputFormProps,
  SignupSchema,
  updateStorage
} from '../../utils'

import '../Form.scss'
import '../Skeleton.scss'

export const InputForm: FC<InputFormProps> = ({ setCredentials }) => {

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
          setSubmitting(false)
        }}
      >
        {({ errors, touched }) => (
          <FormTemplate
            errors={errors}
            touched={touched}
            buttonName='Submit Credentials'
          />
        )}
      </Formik>
    </div>
  )
}