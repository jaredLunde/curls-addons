import React from 'react'
import Toggle from '@render-props/toggle'
import {Transitionable, createComponent, getDelay} from 'curls'
import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'


const themePath = 'scale'
const SFC = createComponent({name: 'scale', styles, defaultTheme})


const transitionProperties = 'visibility, transform, opacity'


export default function Scale ({
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

Scale.propTypes /* remove-proptypes */ = propTypes