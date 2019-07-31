import React from 'react'
import {Blur} from './Blur'
import {createTransition} from './Transition'


export default createTransition({
  name: 'TransitionBlur',
  transition: Blur,
  defaultFrom: 0,
  defaultTo: 1.0,
  defaultEasing: 'heavyMove'
})
