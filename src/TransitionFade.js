import React from 'react'
import {Fade} from 'styled-curls'
import {createTransition} from './Transition'


export default createTransition({
  name: 'TransitionFade',
  transition: Fade,
  defaultFrom: 0,
  defaultTo: 1.0,
  defaultEasing: 'heavyMove'
})
