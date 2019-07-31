import {css, unit, memoThemeValue} from 'curls'
import * as dT from './defaultTheme'


const sizeCSS  = (value, height, theme) => {
  const width =
    value
      ? {width: unit(value, theme.sizeUnit), minWidth: unit(value, theme.sizeUnit)}
      : {width: 'auto', contain: 'content'}

  return {
    contain: 'strict',
    ...width,
    height: unit(height || value, theme.sizeUnit)
  }
}

export const size = memoThemeValue((value, theme) => {
  const scale = theme?.icon?.scale || dT.scale

  if (scale[value] !== void 0) {
    value = scale[value]
    return sizeCSS(value, void 0, theme)
  }

  if (!isNaN(value)) {
    const intSize = parseInt(value)
    return sizeCSS(intSize, void 0, theme)
  } else {
    let [width, height] = value.split('x')
    width = width && parseFloat(width)
    height = height && parseFloat(height)
    return sizeCSS(width, height, theme)
  }
})