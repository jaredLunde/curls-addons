import React from 'react'
import {requestTimeout, clearRequestTimeout} from '@render-props/utils'


export function createTransition ({
  name,
  transition,
  defaultFrom,
  defaultTo,
  defaultEasing = 'swiftMove',
  defaultSpeed = 'med',
  defaultDelay = 0
}) {
  function Transitioner_ ({
    from = defaultFrom,
    to = defaultTo,
    onMount = true,
    onUpdate = false,
    easing = defaultEasing,
    speed = defaultSpeed,
    delay = defaultDelay,
    addTransition,
    removeTransition,
    children,
    ...props
  }) {
    const when = []

    if (onMount) {
      when.push('onMount')
    }

    if (onUpdate) {
      when.push('onUpdate')
    }

    const transitionProps = {
      from,
      to,
      easing,
      speed,
      delay,
      ...props,
      children: function ({className, show}) {
        addTransition(show, ...when)
        return children({className})
      }
    }

    return transition(transitionProps)
  }

  function Transitioner (props) {
    return <Transition children={ctx => Transitioner_({...ctx, ...props})}/>
  }

  if (__DEV__) {
    Transitioner.displayName = name
  }

  return Transitioner
}



export default class Transition extends React.Component {
  constructor (props) {
    super(props)
    this.timeouts = new Set()
    this.transitions = new Map()
    this.transitionContext = {
      addTransition: this.addTransition,
      removeTransition: this.removeTransition
    }
  }

  componentDidMount () {
    this.runTransitions('onMount')
  }

  componentDidUpdate () {
    this.runTransitions('onUpdate')
  }

  componentWillUnmount () {
    this.timeouts.forEach(to => clearRequestTimeout(to))
  }

  runTransitions (when) {
    const transitions = this.transitions.get(when)

    if (transitions !== void 0) {
      if (when === 'onMount') {
        const timeout = requestTimeout(
          () => {
            transitions.forEach(t => t())
            this.timeouts.delete(timeout)
          },
          100
        )

        this.timeouts.add(timeout)
      }
      else {
        transitions.forEach(t => t())
      }
    }
  }

  addTransition = (transition, ...when) => {
    when = when.length === 0 ? ['onMount'] : when

    when.forEach(timing => {
      const transitions = this.transitions.get(timing) || new Set()
      transitions.add(transition)
      this.transitions.set(timing, transitions)
    })

  }

  removeTransition = (transition, ...when) => {
    when = when.length === 0 ? ['onMount'] : when

    when.forEach(timing => {
      const transitions = this.transitions.get(timing)
      transitions.delete(transition)
    })
  }

  render () {
    return this.props.children(this.transitionContext)
  }
}
