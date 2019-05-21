// @jsx jsx
import React from 'react'
import {css, jsx, Row, Box, Input, useStyles, createElement} from 'curls'
import * as defaultTheme from './defaultTheme'


const
  defaultStyles = css`
    & input {
      box-shadow: none !important;
    }
  `,
  options = {name: 'inputGroup', defaultStyles, defaultTheme},
  useInputGroup = props => useStyles(props, options)

const InputGroup = React.forwardRef(
  (props, ref) => {
    props = useInputGroup(props)
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

export {useInputGroup}
export default InputGroup