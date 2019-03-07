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
    border-width: ${toSize(Math.ceil(wh / 8), theme.sizeUnit)};
  `
})

export const color = memoThemeValue((val, theme) => {
  const color = theme.colors[val] || val

  return css`
    border-top-color: ${color};
    border-right-color: ${color};
    border-left-color: ${color};
    border-bottom-color: transparent;
  `
})
