import {css} from '@emotion/core'


export const isVisible_ = css`filter: none;`
export const isNotVisible_ = css`filter: blur(4px);`


export function isVisible (value, theme, props) {
  return (
    value === true
    ? props.to === 1.0
      ? isVisible_
      : css`filter: blur(${props.to});`
    : props.from === 4.0
      ? isNotVisible_
      : css`filter: blur(${props.from});`
  )
}
