import React from 'react'
import Toggle from '@render-props/toggle'
import {Transitionable, createComponent, getDelay} from 'curls'
import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'


const SFC = createComponent({name: 'blur', styles, defaultTheme})
const transitionProperties = 'filter, -webkit-filter'


export default function Blur ({
  children,
  from = 4.0,
  to = 1.0,
  initiallyVisible = false,
  visible,
  ...props
}) {
  return (
    <Toggle value={visible} initialValue={initiallyVisible}>
      {function (toggleContext) {
        return SFC({
          isVisible: toggleContext.value,
          from,
          to,
          ...props,
          children: function (transProps) {
            transProps.property = transitionProperties
            transProps.children = children
            transProps.show = toggleContext.on
            transProps.hide = toggleContext.off
            transProps.toggle = toggleContext.toggle
            transProps.delay = getDelay(toggleContext.value, props)
            return Transitionable(transProps)
          }
        })
      }}
    </Toggle>
  )
}

Blur.propTypes /* remove-proptypes */ = propTypes