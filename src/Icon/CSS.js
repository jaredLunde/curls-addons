import {css} from 'emotion'
import {toSize} from 'styled-curls'


function sizeCSS (value, height) {
  const width =
    value
      ? {width: toSize(value), minWidth: toSize(value)}
      : {width: 'auto', contain: 'content'}

  return {
    ...width,
    height: toSize(height || value)
  }
}


export function size (value, theme) {
  if (theme.scale[value] !== void 0) {
    value = theme.scale[value]

    return sizeCSS(value)
  }

  if (!isNaN(value)) {
    const intSize = parseInt(value)
    return sizeCSS(intSize)
  } else {
    let [width, height] = value.split('x')
    width = width && parseFloat(width)
    height = height && parseFloat(height)
    return sizeCSS(width, height)
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
