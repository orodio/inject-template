import "babel-polyfill"
import { interleave } from '@orodio/interleave'

// isFn :: any -> Boolean
const isFn = fn =>
  typeof fn === 'function'

// inject :: <[String], ...[String | Function]> -> Object -> String
export const inject = (str, ...augs) => (data={}) => {
  return interleave(str, augs)
    .map(node => isFn(node) ? node(data) : String(node))
    .join("")
}
