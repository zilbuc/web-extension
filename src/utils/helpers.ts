import { browser } from 'webextension-polyfill-ts'
import { AppState, pin, storageName } from './index'
import CryptoJS from 'crypto-js'

export const updateStorage = (creds: AppState): void => {

  creds.password = CryptoJS.AES.encrypt(creds.password, pin).toString()

  browser.storage.sync.set({ [storageName]: creds })
}

export const checkLength = (str: string): boolean => str.length > 0

export const decryptPassword = (password: string) => CryptoJS.AES.decrypt(password, pin).toString(CryptoJS.enc.Utf8)
