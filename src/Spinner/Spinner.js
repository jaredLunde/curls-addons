import React from 'react'
import {css, keyframes} from '@emotion/core'
import {BasicBox, createComponent, renderNode} from 'curls'
import delayed from '@jaredlunde/react-delayed'
import * as CSS from './CSS'
import propTypes from './propTypes'
import defaultTheme from './defaultTheme'


const as = 'div'
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

const SFC = createComponent({
  name: 'Spinner',
  themePath: 'spinner',
  CSS,
  defaultTheme,
  propTypes
})

const Spinner_ = React.memo(
  function Spinner (props) {
    return SFC({
      ...props,
      children: function (sfcProps) {
        sfcProps.children = function (boxProps) {
          boxProps.as = boxProps.as || as
          delete boxProps.cancel
          return renderNode(boxProps, defaultCSS)
        }

        return BasicBox(sfcProps)
      }
    })
  }
)

export const DelayedSpinner = delayed(Spinner_)
export default Spinner_
