import crypto from 'crypto'

export function useGravatar(email: string) {
  const gravatarId = crypto
    .createHash('md5')
    .update(email.toLowerCase().trim())
    .digest('hex')
  return `https://secure.gravatar.com/avatar/${gravatarId}`
}
