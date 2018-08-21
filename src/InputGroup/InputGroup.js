import React from 'react'
import {css} from 'emotion'
import {Row, Box, Input} from 'styled-curls'
import createComponent from '../createComponent'
import Type from '../Type'
import * as defaultTheme from './defaultTheme'


const nodeType = 'div'
const SFC = createComponent({
  name: 'InputGroup',
  defaultTheme,
  themePath: 'inputGroup'
})

const defaultCSS = css`
  & input {
    box-shadow: none !important;
  }
`

export default function InputGroup (props) {
  return SFC({
    ...props,
    className: [defaultCSS, props.className],
    children: function (boxProps) {
      return Row({
        align: 'stretch',
        wrap: 'no',
        ...boxProps
      })
    }
  })
}


export function GroupInput (props) {
  return <Input
    type='text'
    grow
    bw={0}
    size='1'
    bg='transparent'
    {...props}
  />
}


export function GroupLabel (props) {
  return <Box
    nodeType='label'
    h='100%'
    flex
    justify='center'
    align='center'
    data-autosize
    {...props}
  />
}
