import React from 'react'
import {useBasicBox, useStyles} from 'curls'
import {pascal} from 'change-case'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import propTypes from './propTypes'


const options = {name: 'icon', styles, defaultTheme}
const Icon = React.memo(
  React.forwardRef(
    (props, ref) => {
      const {icons, ...svgProps} = useBasicBox(useStyles(props, options))
      svgProps.name = pascal(svgProps.name)
      let
        SVG = icons[svgProps.name],
        color

      if (svgProps.style.color) {
        color = svgProps.style.color
        delete svgProps.style.color
      }

      svgProps.ref = ref
      svgProps.pathStyle = {fill: color || '#000'}
      svgProps.role = 'img'
      svgProps['aria-label'] = svgProps.title || svgProps.name
      return React.createElement(SVG, svgProps)
    }
  )
)

if (__DEV__) {
  Icon.displayName = 'Icon'
  Icon.propTypes = propTypes
}

export default Icon