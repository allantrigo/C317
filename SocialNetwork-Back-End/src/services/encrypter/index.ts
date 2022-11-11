import { createHash } from 'crypto'
import cryptoJS = require('crypto-js')
import { binary } from 'joi'

export default abstract class Encrypter {
  static encrypt (text: string, passphrase: string) {
    return cryptoJS.AES.encrypt(text, passphrase).toString()
  }

  static decrypt (ciphertext: string, passphrase: string) {
    const bytes = cryptoJS.AES.decrypt(ciphertext, passphrase)
    const originalText = bytes.toString(cryptoJS.enc.Utf8)
    return originalText
  }

  static hash (json: {
    firstName: string
    lastName: string
    email: string
    birthday: string
  }) {
    const toHash: string =
      json.firstName + json.lastName + json.email + json.birthday

    return createHash('sha1')
    .update(toHash, "utf8")
    .digest('hex')
  }
}
