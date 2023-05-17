
import { v1 } from 'uuid'

export const uuidV6 = () => {
  const raw = v1()

  const prefix = `${raw.substring(15, 18)}${raw.substring(9, 13)}${raw.substring(0, 5)}6${raw.substring(5, 8)}`
  const prefixFormatted = `${prefix.substr(0, 8)}-${prefix.substr(8, 4)}-${prefix.substr(12)}`

  return `${prefixFormatted}${raw.substr(18)}`
}