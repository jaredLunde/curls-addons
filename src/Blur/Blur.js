import React from 'react'
import Toggle from '@render-props/toggle'
import {Transitionable, createComponent} from 'styled-curls'
import {slideUtils} from 'styled-curls'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'


const themePath = 'blur'
const SFC = createComponent({name: 'Blur', propTypes, CSS, defaultTheme, themePath})


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
            transProps.delay = slideUtils.whichDelay(toggleContext.value, props)
            return Transitionable(transProps)
          }
        })
      }}
    </Toggle>
  )
}
