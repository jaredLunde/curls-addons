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
  options = {name: 'spinner', styles, defaultStyles, defaultTheme},
  useSpinner = props => useStyles(props, options),
  Spinner = React.memo(
    React.forwardRef((props, ref) => {
      props = useBasicBox(useSpinner(props))
      props.ref = ref
      delete props.cancel
      return createElement('div', props)
    })
  ),
  DelayedSpinner = delayed(Spinner)


if (__DEV__) {
  DelayedSpinner.displayName = 'DelayedSpinner'
  Spinner.displayName = 'Spinner'
  Spinner.propTypes = propTypes
}

export {DelayedSpinner, useSpinner}
export default Spinner

