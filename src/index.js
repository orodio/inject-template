import "babel-polyfill"
import { interleave } from '@orodio/interleave'

const isFn = fn =>
  typeof fn === 'function'

export const inject = (str, ...augs) => (data={}) => {
  return interleave(str, augs)
    .map(node => isFn(node) ? node(data) : String(node))
    .join("")
}
