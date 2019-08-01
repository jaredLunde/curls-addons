import {createRenderProp, useTransitionableToggle} from 'curls'
import * as styles from './styles'


const
  options = {name: 'blur', styles, transitionProperties: 'filter, -webkit-filter'}
export const
  useBlur = props => {
    props = Object.assign({duration: 'normal', easing: 'heavyMove'}, props)
    props.from = props.from === void 0 ? 4.0 : props.from
    props.to = props.to === void 0 ? 1.0 : props.to
    return useTransitionableToggle(options, props)
  },
  Blur = createRenderProp(useBlur)

if (__DEV__) {
  const propTypes = require('./propTypes').default
  Blur.displayName = 'Blur'
  Blur.propTypes = propTypes
}