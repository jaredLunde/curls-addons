import React from 'react'
import {BasicBox, createComponent} from 'curls'
import {pascal} from 'change-case'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import propTypes from './propTypes'


const SFC = createComponent({name: 'icon', styles, defaultTheme})

const Icon = React.memo(
  React.forwardRef(
    function Icon (props, innerRef) {
      return SFC({
        ...props,
        children: function (boxProps) {
          return BasicBox({
            ...boxProps,
            children: function ({icons, name, ...svgProps}) {
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
)

export default Icon
Icon.propTypes /* remove-proptypes */ = propTypes