import React, { FC, useEffect, useState } from 'react'
import { browser } from 'webextension-polyfill-ts'
import { InputForm, UpdateForm } from './components'
import { AppState, initialState, storageName } from './utils'

import './App.scss';

// TODO: 
// * modify webpack - DONE - is .map needed?....
// * update texts
// * add Crypto
// * change SCSS to suggested lib
// * add catch block for storage?
// * add content scripts
// * test of firefox
// * add cypress tests for app - meh, it can be tested only as extension? ... sucks
// * add tests for extension + storage?
const App: FC<{}> = () => {

  const [credentials, setCredentials] = useState(initialState)

  useEffect(() => {
    browser.storage.sync.get(storageName)
      .then(({ creds }) => {
        if (creds) {
          const savedCreds: AppState = {
            username: creds.username,
            password: creds.password,
          }
          setCredentials(savedCreds)
        }
      })
  })

  return (
    <div className='app-wrapper'>
      {credentials.username.length === 0
        ? <InputForm setCredentials={setCredentials} />
        : <UpdateForm
          credentials={credentials}
          setCredentials={setCredentials}
        />
      }
    </div>
  )
}

export default App