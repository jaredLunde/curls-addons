// @jsx jsx
import React from 'react'
import {css, jsx, Row, Box, Input, useStyles, createElement} from 'curls'
import * as defaultTheme from './defaultTheme'


const
  options = {name: 'inputGroup', defaultTheme},
  defaultCSS = css`
  & input {
    box-shadow: none !important;
  }
`
const InputGroup = React.forwardRef(
  (props, ref) => {
    props = useStyles(props, options)
    props.align = 'stretch'
    props.wrap = 'no'
    props.ref = ref
    return createElement(Row, props, defaultCSS)
  },
)

export const GroupInput = React.forwardRef(
  (props, ref) => <Input
    type='text'
    grow
    bw='0'
    size='1'
    bg='transparent'
    ref={ref}
    {...props}
  />,
)

export const GroupLabel = React.forwardRef(
  (props, ref) => <Box
    as='label'
    flex
    justify='center'
    align='center'
    minH='100%'
    ref={ref}
    data-autosize
    {...props}
  />,
)

if (__DEV__) {
  InputGroup.displayName = 'InputGroup'
  GroupInput.displayName = 'GroupInput'
  GroupLabel.displayName = 'GroupLabel'
}

export default InputGroup