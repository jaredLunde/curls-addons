import React from 'react'
import {requestTimeout, clearRequestTimeout} from '@essentials/request-timeout'
import {Transitionable} from 'curls'
import {paramCase} from 'change-case'
import memoize from 'trie-memoize'


/**
 const TransitionBox = transition(Box)({
   states: {
     exitTop: {
       opacity: 0,
       transform: 'translateY(24px)'
     },
     enterTop: {
       opacity: 1,
       transform: 'translateY(0px)'
     },
     exitBottom: {
       opacity: 0,
       transform: 'translateY(24px)'
     }
   },
   useStyle: true,
   speed: 'verySlow'
 })
 */
const getProperties = memoize(
  [WeakMap],
  states => {
    const props = []

    Object.values(states).forEach(
      state => Object.keys(state).forEach(
        k => {
          if (props.indexOf(k) === -1){
            props.push(paramCase(k))
          }
        }
      )
    )

    return props
  }
)

function getStyle (states, state, props) {
  state = typeof states[state] === 'function' ? states[state](props) : states[state]
  return state
}

export function transition (Component) {
  return ({states, duration, easing}) => React.forwardRef(
    ({state, ...props}, ref) => (
      <Transitionable duration={duration} easing={easing} property={getProperties(states)}>
        {({css: transitionCss}) => {
          const style = getStyle(states, state, props)

          return <Component
            {...props}
            css={transitionCss}
            style={props.style ? {...props.style, ...style} : style}
            ref={ref}
          />
        }}
      </Transitionable>
    )
  )
}

const tags = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'marquee',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  // SVG
  'circle',
  'clipPath',
  'defs',
  'ellipse',
  'foreignObject',
  'g',
  'image',
  'line',
  'linearGradient',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'text',
  'tspan'
]

for (let tag of tags) {
  Object.defineProperty(
    transition,
    tag,
    {value: options => transition(tag)(options)}
  )
}

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
      children: function ({css, show}) {
        addTransition(show, ...when)
        return children({css})
      }
    }

    return React.createElement(transition, transitionProps)
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
