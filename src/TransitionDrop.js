import React from 'react'
import {Drop} from 'curls'
import {createTransition} from './Transition'


export default createTransition({
  name: 'TransitionDrop',
  transition: Drop,
  defaultEasing: 'heavyMove'
})
