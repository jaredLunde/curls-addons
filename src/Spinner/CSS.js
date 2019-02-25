import {toSize, nullIfFalse} from 'curls'
import {css} from '@emotion/core'


export const hide = css`
  visibility: hidden;
  opacity: 0;
`

export const size = nullIfFalse((val, theme) => {
  const wh = parseInt(theme.scale[val] || val)

  return css`
    width: ${toSize(wh, theme.sizeUnit)};
    height: ${toSize(wh, theme.sizeUnit)};
    border-width: ${toSize(wh, Math.ceil(wh / 8))};
  `
})

export const xxs = (_, theme) => size('xxs', theme)
export const xs = (_, theme) => size('xs', theme)
export const sm = (_, theme) => size('sm', theme)
export const md = (_, theme) => size('md', theme)
export const lg = (_, theme) => size('lg', theme)
export const xl = (_, theme) => size('xl', theme)
export const xxl = (_, theme) => size('xxl', theme)


export const color = nullIfFalse((val, theme) => {
  const color = theme.colors[val] || val

  return css`
    border-top-color: ${color};
    border-right-color: ${color};
    border-left-color: ${color};
    border-bottom-color: transparent;
  `
})
