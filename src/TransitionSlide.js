import React from 'react'
import {Slide} from 'curls'
import {createTransition} from './Transition'


export default createTransition({
  name: 'TransitionSlide',
  transition: Slide,
  defaultEasing: 'heavyMove'
})
