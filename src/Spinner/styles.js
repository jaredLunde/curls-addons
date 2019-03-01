import {toSize, memoThemeValue} from 'curls'
import {css} from '@emotion/core'


export const hide = css`
  visibility: hidden;
  opacity: 0;
`

export const size = memoThemeValue((val, theme) => {
  const wh = parseInt(theme.scale[val] || val)

  return css`
    width: ${toSize(wh, theme.sizeUnit)};
    height: ${toSize(wh, theme.sizeUnit)};
    border-width: ${toSize(wh, Math.ceil(wh / 8))};
  `
})

export const xxs = memoThemeValue((_, theme) => size('xxs', theme))
export const xs = memoThemeValue((_, theme) => size('xs', theme))
export const sm = memoThemeValue((_, theme) => size('sm', theme))
export const md = memoThemeValue((_, theme) => size('md', theme))
export const lg = memoThemeValue((_, theme) => size('lg', theme))
export const xl = memoThemeValue((_, theme) => size('xl', theme))
export const xxl = memoThemeValue((_, theme) => size('xxl', theme))


export const color = memoThemeValue((val, theme) => {
  const color = theme.colors[val] || val

  return css`
    border-top-color: ${color};
    border-right-color: ${color};
    border-left-color: ${color};
    border-bottom-color: transparent;
  `
})
