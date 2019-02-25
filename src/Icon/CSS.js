import {css} from '@emotion/core'
import {toSize} from 'curls'


function sizeCSS (value, height, theme) {
  const width =
    value
      ? {width: toSize(value, theme.sizeUnit), minWidth: toSize(value, theme.sizeUnit)}
      : {width: 'auto', contain: 'content'}

  return {
    ...width,
    height: toSize(height || value, theme.sizeUnit)
  }
}


export function size (value, theme) {
  if (theme.scale[value] !== void 0) {
    value = theme.scale[value]

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
}


function createSizeFunc (value, theme) {
  return function (_, theme) {
    return size(value, theme)
  }
}

export const xxs = createSizeFunc('xxs')
export const xs = createSizeFunc('xs')
export const sm = createSizeFunc('sm')
export const md = createSizeFunc('md')
export const lg = createSizeFunc('lg')
export const xl = createSizeFunc('xl')
export const xxl = createSizeFunc('xxl')

export function color (value, theme) {
  return {color: theme.colors[value] || value}
}

export const containStrict = css`contain: strict;`
