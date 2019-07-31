import {css, unit, memoThemeValue} from 'curls'
import * as dT from './defaultTheme'


export const hide = css`
  visibility: hidden;
  opacity: 0;
`

export const size = memoThemeValue((val, theme) => {
  const
    scale = theme?.spinner?.scale || dT.scale,
    wh = parseInt(scale[val] || val)

  return css`
    width: ${unit(wh, theme.sizeUnit)};
    height: ${unit(wh, theme.sizeUnit)};
    border-width: ${unit(Math.ceil(wh / 8), theme.sizeUnit)};
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
