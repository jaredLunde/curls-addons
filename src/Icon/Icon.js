import React from 'react'
import {useBasicBox, useStyles, useTheme} from 'curls'
import {pascal} from 'change-case'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import propTypes from './propTypes'


const
  options = {name: 'icon', styles, defaultTheme},
  useIcon = props => useStyles(props, options),
  Icon = React.memo(
    React.forwardRef(
      (props, ref) => {
        const
          {icons, ...svgProps} = useBasicBox(useIcon(props)),
          theme = useTheme(options)
        svgProps.name = pascal(svgProps.name)
        let
          SVG = icons[svgProps.name],
          color

        props.color = props.color || theme.defaultProps.color
        if (props.color)
          color = theme.colors[props.color] || props.color
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

export {useIcon}
export default Icon