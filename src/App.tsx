import React, { FC, useEffect, useState } from 'react'
import { browser } from 'webextension-polyfill-ts'
import { InputForm, UpdateForm } from './components'
import { AppState, initialState, storageName } from './utils'

import styles from './App.module.scss';

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
  }, [])

  return (
    <div className={styles.appWrapper}>
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