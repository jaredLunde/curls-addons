import React from 'react'
import {BasicBox, createComponent} from 'curls'
import {pascal} from 'change-case'
import pure from 'react-purity'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import propTypes from './propTypes'


const themePath = 'icon'
const SFC = createComponent({
  name: 'Icon',
  CSS,
  defaultTheme,
  propTypes,
  themePath
})


export default pure(
  function Icon (props) {
    return SFC({
      ...props,
      children: function (boxProps) {
        return BasicBox({
          ...boxProps,
          children: function ({icons, name, innerRef, ...svgProps}) {
            name = pascal(name)
            const SVG = icons[name]

            let color

            if (svgProps.style.color) {
              color = svgProps.style.color
              delete svgProps.style.color
            }

            svgProps.ref = innerRef
            svgProps.pathStyle = {fill: color || '#000'}

            return <SVG
              name={name}
              aria-label={svgProps.title || name}
              role='img'
              {...svgProps}
            />
          }
        })
      }
    })
  }
)
