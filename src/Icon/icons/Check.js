import React from 'react'
import createIcon from './createIcon'


export default createIcon(
  ({pathStyle, title, ...props}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 25 25' {...props}>
      <title>{title}</title>
      <path d="M.557,12.35578a1.89945,1.89945,0,1,1,2.68645-2.686l6.45255,6.453,12.06145-12.061A1.89929,1.89929,0,1,1,24.443,6.74823L9.6969,21.49477Z" style={pathStyle}/>
      <path d="M24.69186,4.30071a1.05135,1.05135,0,0,0-1.48724,0L9.47188,18.03345,1.79538,10.35694A1.05164,1.05164,0,0,0,.30814,11.84418l9.16324,9.16325.0005-.0005.0005.0005L24.69186,5.78795A1.05135,1.05135,0,0,0,24.69186,4.30071Z" style={pathStyle}/>
    </svg>
  )
)
