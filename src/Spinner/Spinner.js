import React from 'react'
import {css, keyframes, useBasicBox, useStyles, createElement} from 'curls'
import delayed from '@jaredlunde/react-delayed'
import * as styles from './styles'
import propTypes from './propTypes'
import defaultTheme from './defaultTheme'


const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(720deg);
  }
`

const defaultCSS = css`
  border-style: solid;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.72s cubic-bezier(0.7, 0, 0.6, 1) infinite;
  margin-left: auto;
  margin-right: auto;
  will-change: transform;
  contain: strict;
`

const
  options = {name: 'spinner', styles, defaultTheme},
  Spinner = React.memo(
    React.forwardRef((props, ref) => {
      props = useBasicBox(useStyles(props, options))
      props.ref = ref
      delete props.cancel
      return createElement('div', props, defaultCSS)
    })
  ),
  DelayedSpinner = delayed(Spinner)


if (__DEV__) {
  DelayedSpinner.displayName = 'DelayedSpinner'
  Spinner.displayName = 'Spinner'
  Spinner.propTypes = propTypes
}

export {DelayedSpinner}
export default Spinner

