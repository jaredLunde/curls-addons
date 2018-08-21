import React from 'react'
import createIcon from './createIcon'


export default createIcon(
  ({pathStyle, title, ...props}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 25 25' {...props}>
      <title>{title}</title>
      <path
        d="M3.34362,9.56916a1.89945,1.89945,0,1,1,2.68645-2.686l6.45254,6.453,6.48823-6.48777a1.89929,1.89929,0,1,1,2.68554,2.68645l-9.17286,9.17332Z"
        style={pathStyle}
      />
    </svg>
  )
)
