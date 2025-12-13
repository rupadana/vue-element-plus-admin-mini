import { defineStore } from 'pinia'
import { store } from '../index'

interface lockInfo {
  isLock?: boolean
  password?: string
}

interface LockState {
  lockInfo: lockInfo
}

export const useLockStore = defineStore('lock', {
  state: (): LockState => {
    return {
      lockInfo: {
        // isLock: false, // Whether to lock screen
        // password: '' // lock screen password
      }
    }
  },
  getters: {
    getLockInfo(): lockInfo {
      return this.lockInfo
    }
  },
  actions: {
    setLockInfo(lockInfo: lockInfo) {
      this.lockInfo = lockInfo
    },
    resetLockInfo() {
      this.lockInfo = {}
    },
    unLock(password: string) {
      if (this.lockInfo?.password === password) {
        this.resetLockInfo()
        return true
      } else {
        return false
      }
    }
  },
  persist: true
})

export const useLockStoreWithOut = () => {
  return useLockStore(store)
}
