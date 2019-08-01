import {createRenderProp, useTransitionableToggle} from 'curls'
import * as styles from './styles'


const
  options = {name: 'scale', styles, transitionProperties: 'visibility, transform, opacity'}
export const
  useScale = props => {
    props = Object.assign({duration: 'normal', easing: 'heavyMove'}, props)
    props.from = props.from === void 0 ? 4.0 : props.from
    props.to = props.to === void 0 ? 1.0 : props.to
    return useTransitionableToggle(options, props)
  },
  Scale = createRenderProp(useScale)

if (__DEV__) {
  const propTypes = require('./propTypes').default
  Scale.displayName = 'Scale'
  Scale.propTypes = propTypes
}