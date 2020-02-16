import { browser } from 'webextension-polyfill-ts'
import { AppState, storageName } from './index'
import CryptoJS from 'crypto-js'

export const updateStorage = (creds: AppState): void => {
  const pin = '1234'
  creds.password = CryptoJS.AES.encrypt(creds.password, pin).toString()
  browser.storage.sync.set({ [storageName]: creds })
}

export const checkLength = (str: string): boolean => {
  return str.length > 0
}