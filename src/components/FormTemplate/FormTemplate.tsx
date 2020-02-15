import React, { FC } from 'react'
import { Field, Form } from 'formik'
import { FormTemplateProps } from '../../utils'

export const FormTemplate: FC<FormTemplateProps> = ({ errors, touched, buttonName }) => (
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
        {buttonName}
      </button>
    </div>
  </Form>
)

