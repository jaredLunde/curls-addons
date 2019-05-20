import React from 'react'
import propTypes from './propTypes'
import * as styles from './styles'
import {useTransitionableToggle} from 'curls'


const
  options = {name: 'blur', styles, transitionProperties: 'filter, -webkit-filter'},
  useBlur = props => {
    props = Object.assign({}, props)
    props.from = props.from === void 0 ? 4.0 : props.from
    props.to = props.to === void 0 ? 1.0 : props.to
    return useTransitionableToggle(options, props)
  },
  Blur = props => props.children(useBlur(props))

if (__DEV__) {
  Blur.displayName = 'Blur'
  Blur.propTypes = propTypes
}

export {useBlur}
export default Blur