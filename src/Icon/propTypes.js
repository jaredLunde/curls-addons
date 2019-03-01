import {string, bool, number, oneOfType} from 'prop-types'


export default {
  size: oneOfType([string, number]),
  containStrict: bool
}
