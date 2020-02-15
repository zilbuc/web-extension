import { FormikErrors, FormikTouched } from 'formik'

export interface AppState {
  username: string
  password: string
}

export interface InputFormProps {
  setCredentials(credentials: AppState): void
}

export interface UpdateFormProps extends InputFormProps {
  credentials: AppState
}

export interface FormTemplateProps {
  errors: FormikErrors<AppState>
  touched: FormikTouched<AppState>
  buttonName: string
  actionType: string
}