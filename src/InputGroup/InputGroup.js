// @jsx jsx
import React from 'react'
import {css, jsx, useBox, Box, Input, useStyles, pushCss, createElement} from 'curls'


const
  defaultStyles = css`
    & input {
      box-shadow: none !important;
    }
  `,
  options = {name: 'inputGroup'}
export const
  useInputGroup = props => useStyles(options, pushCss(props, defaultStyles)),
  InputGroup = React.forwardRef((props, ref) => {
    props = useBox(useInputGroup(props))
    props.align = 'stretch'
    props.wrap = 'no'
    props.ref = ref
    return createElement('div', props)
  })

export const GroupInput = React.forwardRef((props, ref) => <Input
  type='text'
  grow
  bw='0'
  size='1'
  bg='transparent'
  ref={ref}
  {...props}
/>)

export const GroupLabel = React.forwardRef((props, ref) => <Box
  as='label'
  flex
  justify='center'
  align='center'
  minH='100%'
  ref={ref}
  data-autosize
  {...props}
/>)

if (__DEV__) {
  InputGroup.displayName = 'InputGroup'
  GroupInput.displayName = 'GroupInput'
  GroupLabel.displayName = 'GroupLabel'
}