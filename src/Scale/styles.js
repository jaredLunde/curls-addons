import {css} from '@emotion/core'


export const baseIsNotVisible = css`visibility: hidden; opacity: 0; transform-origin: center;`
export const baseIsVisible = css`visibility: visible; opacity: 1; transform-origin: center;`
export const isVisible_ = css`${baseIsVisible}; transform: scale(1.0);`
export const isNotVisible_ = css`${baseIsNotVisible}; transform: scale(4.0);`


export function isVisible (value, theme, props) {
  return (
    value === true
    ? props.to === 1.0
      ? isVisible_
      : css`${baseIsVisible}; transform: scale(${props.to});`
    : props.from === 4.0
      ? isNotVisible_
      : css`${baseIsNotVisible}; transform: scale(${props.from});`
  )
}
