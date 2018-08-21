import React from 'react'
import {BasicBox, Box, createComponent, getTheme, ThemeConsumer} from 'styled-curls'
import universal from 'react-universal-component'
import memoize from 'lru-memoize-map'
import invariant from 'invariant'
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
    const name = pascal(props.name)

    return SFC({
      ...props,
      children: function (boxProps) {
        return BasicBox({
          ...boxProps,
          children: function ({icons, name, ref, ...svgProps}) {
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
