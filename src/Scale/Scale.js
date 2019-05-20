import React from 'react'
import propTypes from './propTypes'
import * as styles from './styles'
import {useTransitionableToggle} from 'curls'


const
  options = {name: 'scale', styles, transitionProperties: 'visibility, transform, opacity'},
  useScale = props => {
    props = Object.assign({}, props)
    props.from = props.from === void 0 ? 4.0 : props.from
    props.to = props.to === void 0 ? 1.0 : props.to
    return useTransitionableToggle(options, props)
  },
  Scale = props => props.children(useScale(props))

if (__DEV__) {
  Scale.displayName = 'Scale'
  Scale.propTypes = propTypes
}

export {useScale}
export default Scale