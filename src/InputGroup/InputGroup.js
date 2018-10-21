import React from 'react'
import {css} from 'emotion'
import {Row, Box, Input, Type, createComponent} from 'curls'
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

export default React.forwardRef(
  function InputGroup (props, innerRef) {
    return SFC({
      innerRef,
      ...props,
      className: [defaultCSS, props.className],
      children: function (boxProps) {
        return <Row align='stretch' wrap='no' {...boxProps} children={props.children}/>
      }
    })
  }
)


export const GroupInput = React.forwardRef(
  function GroupInput (props, ref) {
    return <Input
      type='text'
      grow
      bw={0}
      size='1'
      bg='transparent'
      ref={ref}
      {...props}
    />
  }
)


export const GroupLabel = React.forwardRef(
  function GroupLabel (props, ref) {
    return <Box
      nodeType='label'
      flex
      justify='center'
      align='center'
      css='min-height: 100%;'
      ref={ref}
      data-autosize
      {...props}
    />
  }
)
