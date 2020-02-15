import { browser } from 'webextension-polyfill-ts'
import { AppState, storageName } from './index'

export const updateStorage = (creds: AppState): void => {
  browser.storage.sync.set({ [storageName]: creds })
}

export const checkLength = (str: string): boolean => {
  return str.length > 0
}
