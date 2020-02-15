import * as Yup from 'yup'
import { AppState } from './index'

export const SignupSchema: Yup.ObjectSchema<Yup.Shape<object, AppState>> = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Required'),
})

export const UpdateSchema: Yup.ObjectSchema<Yup.Shape<object, AppState>> = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
})
