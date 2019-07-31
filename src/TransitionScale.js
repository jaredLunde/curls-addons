import React from 'react'
import {Scale} from './Scale'
import {createTransition} from './Transition'


export default createTransition({
  name: 'TransitionScale',
  transition: Scale,
  defaultFrom: 3.6,
  defaultTo: 1.0,
  defaultEasing: 'heavyMove'
})
