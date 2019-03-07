import {oneOfType, bool, string, number} from 'prop-types'


export default {
  size: oneOfType([bool, number, string]),
  color: oneOfType([bool, string])
}
