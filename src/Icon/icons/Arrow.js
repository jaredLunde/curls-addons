import React from 'react'
import createIcon from './createIcon'


export const ArrowRight = createIcon(
  ({pathStyle, title, ...props}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" {...props}>
      <title>{title}</title>
      <path
        d="M21.67737,9.8139,16.70709,4.84381a1.89929,1.89929,0,1,0-2.68646,2.68555l3.07117,3.07117-14.55573.00024a1.89929,1.89929,0,1,0-.00061,3.79858H17.0921l-3.07074,3.0708a1.89929,1.89929,0,1,0,2.68555,2.68646l4.97052-4.97052L24.36353,12.5Z"
        style={pathStyle}
      />
    </svg>
  )
)


export const Arrow = ({style, rotate, ...props}) => {
  rotate = rotate && `rotate(${rotate})`

  return ArrowRight({
    style: {
      WebkitTransform: rotate,
      transform: rotate,
      ...style
    },
    ...props
  })
}

export const ArrowDown = props => Arrow({rotate: '90deg', ...props})
export const ArrowUp = props => Arrow({rotate: '-90deg', ...props})
export const ArrowLeft = props => Arrow({rotate: '180deg', ...props})


export default Arrow
