import React, { FC, useState } from 'react';
import InputForm from './components/InputForm/InputForm'
import UpdateForm from './components/UpdateForm/UpdateForm'

import './App.scss';

export interface AppState {
  username: string
  password: string
}

const initialState: AppState = {
  username: '',
  password: '',
}

const App: FC<{}> = () => {

  const [credentials, setCredentials] = useState(initialState)

  // TODO: update state with useEffect from extensionStorageAPI
  return (
    <>
      {credentials.username.length === 0
        ? <InputForm setCredentials={setCredentials} />
        : <UpdateForm
          credentials={credentials}
          setCredentials={setCredentials}
        />

        // <UpdateForm credentials={credentials} setCredentials={setCredentials} />
      }
    </>
  )
}

export default App;
