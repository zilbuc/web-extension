import React, { FC } from 'react'
import { Field, Form } from 'formik'
import { FormTemplateProps } from '../../utils'

import styles from '../Form.module.scss'

export const FormTemplate: FC<FormTemplateProps> = ({ errors, touched, buttonName, actionType }) => (
  <Form>
    <label htmlFor="username">User Name</label>
    <Field id="username" name="username" placeholder={`${actionType} username`} type="text" autofocus />
    {errors.username && touched.username ? (
      <div className={styles.errorMsg}>{errors.username}</div>
    ) : null}

    <label htmlFor="password">Password</label>
    <Field id="password" name="password" placeholder={`${actionType} your password`} type="password" />
    {errors.password && touched.password ? (
      <div className={styles.errorMsg}>{errors.password}</div>
    ) : null}

    <div className={styles.submitButtonWrapper}>
      <button type="submit" className={styles.submitButton}>
        {buttonName}
      </button>
    </div>
  </Form>
)

