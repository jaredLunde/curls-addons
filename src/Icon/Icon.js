import React from 'react'
import {css, useBasicBox, useStyles, useTheme} from 'curls'
import {pascal} from 'change-case'
import * as styles from './styles'


const
  defaultStyles = css`
    width: 1em;
    height: 1em;
  `,
  options = {name: 'icon', styles}

export const
  useIcon = props => useStyles(props, options),
  Icon = React.memo(React.forwardRef((props, ref) => {
    const theme = useTheme()
    props = Object.assign({css: [defaultStyles]}, props)
    props = useBasicBox(useIcon(props))
    props.name = pascal(props.name)

    let
      SVG = (theme?.icon?.icons || {})[props.name],
      color  = theme.colors[props.color] || props.color

    props.ref = ref
    props.pathStyle = {fill: color}
    props.role = 'img'
    props['aria-label'] = props.title || props.name
    return React.createElement(SVG, props)
  }))

Icon.defaultProps = {
  color: 'currentColor'
}

if (__DEV__) {
  const propTypes = require('./propTypes').default
  Icon.displayName = 'Icon'
  Icon.propTypes = propTypes
}