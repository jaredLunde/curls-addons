// @jsx jsx
import React from 'react'
import {css, jsx, useBox, Box, Input, useStyles, createElement} from 'curls'

const
  defaultStyles = css`
    & input {
      box-shadow: none !important;
    }
  `,
  options = {name: 'inputGroup'}
export const
  useInputGroup = props => useStyles(props, options),
  InputGroup = React.forwardRef(
    (props, ref) => {
      props = Object.assign({css: [defaultStyles]}, props)
      props.align = 'stretch'
      props.wrap = 'no'
      props = useBox(useInputGroup(props))
      props.ref = ref
      return createElement('div', props)
    },
  )

InputGroup.defaultProps = {
  flex: true,
  bg: 'white',
  m: 0,
  p: 2,
  bc: 'translucentLight',
  bw: 1,
  br: 5,
  color: 'darkGrey'
}

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