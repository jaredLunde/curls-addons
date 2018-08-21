import React from 'react'
import createIcon from './createIcon'


export default createIcon(
  ({pathStyle, ...props}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 25 25' {...props}/>
  )
)
