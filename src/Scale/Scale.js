import React from 'react'
import Toggle from '@render-props/toggle'
import {Transitionable, createComponent, slideUtils} from 'styled-curls'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'


const themePath = 'scale'
const SFC = createComponent({name: 'Scale', propTypes, CSS, defaultTheme, themePath})


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
            transProps.delay = slideUtils.whichDelay(toggleContext.value, props)
            return Transitionable(transProps)
          }
        })
      }}
    </Toggle>
  )
}
