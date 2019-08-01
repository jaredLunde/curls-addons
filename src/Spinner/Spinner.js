import React from 'react'
import {css, keyframes, useBasicBox, useStyles, pushCss, createElement} from 'curls'
import delayed from '@jaredlunde/react-delayed'
import * as styles from './styles'


const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(720deg);
  }
`

const
  defaultStyles = css`
    border-style: solid;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: ${spin} 0.72s cubic-bezier(0.7, 0, 0.6, 1) infinite;
    margin-left: auto;
    margin-right: auto;
    will-change: transform;
    contain: strict;
  `,
  options = {name: 'spinner', styles}

export const
  useSpinner = props => useStyles(options, pushCss(props, defaultStyles)),
  Spinner = React.forwardRef((props, ref) => {
    props = useBasicBox(useSpinner(props))
    props.ref = ref
    delete props.cancel
    return createElement('div', props)
  }),
  DelayedSpinner = delayed(Spinner)

if (__DEV__) {
  const propTypes = require('./propTypes').default
  DelayedSpinner.displayName = 'DelayedSpinner'
  Spinner.displayName = 'Spinner'
  Spinner.propTypes = propTypes
}

