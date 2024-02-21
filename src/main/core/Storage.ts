import { safeStorage } from 'electron'
import Store from 'electron-store'

/**
 * A wrapper around electron-store to provide a simple API for storing and
 * retrieving data from the main process.
 *
 * The data is encrypted and decrypted using the safeStorage module.
 * The data is also cached in memory to reduce the number of reads
 * from the file system.
 */
class Storage<TStore extends Record<string, unknown>> {
  #ENCODING: BufferEncoding = 'latin1'
  #CACHE_SIZE = 5 as const

  #store: Store<TStore> | null = null
  #cache: Map<keyof TStore, TStore[keyof TStore]> = new Map()
  #keysIter = this.#cache.keys()

  constructor(name: string, encryptionKey: string) {
    this.#store = new Store<TStore>({
      name,
      watch: true,
      encryptionKey
    })
  }

  #addToCache = <TKey extends keyof TStore>(
    key: TKey,
    value: TStore[typeof key]
  ) => {
    this.#cache.set(key, value)

    if (this.#cache.size > this.#CACHE_SIZE) {
      this.#cache.delete(this.#keysIter.next().value)
    }
  }

  #getFromCache = <TKey extends keyof TStore>(
    key: TKey
  ): TStore[typeof key] | null => {
    if (!this.#cache.has(key)) return null

    const valueFromCache = this.#cache.get(key)
    if (!valueFromCache) return null

    return valueFromCache as TStore[typeof key]
  }

  set = <TKey extends keyof TStore>(key: TKey, value: TStore[typeof key]) => {
    if (!this.#store) return

    const strValue = JSON.stringify(value)
    const valueBuffer = safeStorage.encryptString(strValue)
    const strBuffer = valueBuffer.toString(this.#ENCODING)

    this.#store.set(key.toString(), strBuffer)
    this.#addToCache(key, value)
  }

  get = <TKey extends keyof TStore>(key: TKey): TStore[typeof key] | null => {
    if (!this.#store) return null

    const valueFromCache = this.#getFromCache(key)
    if (valueFromCache) return valueFromCache

    if (!this.#store.has(key)) return null

    const valueFromStore = this.#store.get(key) as string
    const valueBuffer = Buffer.from(valueFromStore, this.#ENCODING)

    const decryptedBuffer = safeStorage.decryptString(valueBuffer)
    return JSON.parse(decryptedBuffer)
  }

  delete = <TKey extends keyof TStore>(key: TKey) => {
    if (!this.#store) return

    if (this.#cache.has(key)) this.#cache.delete(key)
    if (this.#store.has(key)) this.#store.delete(key)
  }
}

export default Storage
