import React from 'react'
import createIcon from './createIcon'


export default createIcon(
  ({pathStyle, title, ...props}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 25 25' {...props}>
      <title>{title}</title>
      <circle cx="3.85" cy="12.5" r="1.85" style={pathStyle}/>
      <circle cx="12.5" cy="12.5" r="1.85" style={pathStyle}/>
      <circle cx="21.15" cy="12.5" r="1.85" style={pathStyle}/>
    </svg>
  )
)
