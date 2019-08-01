import React from 'react'
import {css, useBasicBox, useStyles, useTheme, pushCss} from 'curls'
import {pascal} from 'change-case'
import * as styles from './styles'


const
  defaultStyles = css`
    width: 1em;
    height: 1em;
    fill: currentColor;
  `,
  options = {name: 'icon', styles}

export const
  useIcon = props => useStyles(options, pushCss(props, defaultStyles)),
  Icon = React.memo(React.forwardRef((props, ref) => {
    const theme = useTheme()
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

if (__DEV__) {
  const propTypes = require('./propTypes').default
  Icon.displayName = 'Icon'
  Icon.propTypes = propTypes
}