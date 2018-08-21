import React from 'react'
import PropTypes from 'prop-types'
import ViewportConsumer from '@render-props/viewport'
import {requestTimeout, clearRequestTimeout} from '@render-props/utils'
import {Drawer, Row, Type} from 'styled-curls'
import Icon from './Icon'


export function AlertBox ({
  n,
  id,
  code,
  message,
  color = 'lightBlue',
  bc = 'lightBlue',
  ...props
}) {
  return  (
    <Row
      nodeType='li'
      wrap='no'
      align='center'
      p={3}
      m={3}
      bw='1'
      br={1}
      bc={bc}
      bg='lightestGrey'
      key={id || n}
      css='max-width: 600px'
      {...props}
    >
      {n === 0 && (
        <Icon name='close' size='xs' color={bc} m='r2'/>
      )}

      <Type center fluid color={color}>
        {message}
      </Type>
    </Row>
  )
}


export class Alerts_ extends React.PureComponent {
  static displayName = 'Alerts'
  static propTypes = {
    duration: PropTypes.number.isRequired,
    alerts: PropTypes.array
  }

  static defaultProps = {
    duration: 6000
  }

  componentDidMount () {
    this.showAndHide()
  }

  componentDidUpdate ({alerts}) {
    if (alerts !== this.props.alerts) {
      this.showAndHide()
    }
  }

  componentWillUnmount () {
    this.clearTimeouts()
  }

  hideTimeout = null

  showAndHide () {
    const {show, hide, duration} = this.props
    this.clearTimeouts()
    show()
    this.hideTimeout = requestTimeout(hide, duration + 10)
  }

  clearTimeouts () {
    if (this.hideTimeout) clearRequestTimeout(this.hideTimeout);
  }

  render () {
    return this.props.DrawerBox({
      nodeType: 'ul',
      flex: true,
      pos: 'absolute',
      justify: 'center',
      onClick: this.props.hide,
      style: {
        cursor: 'pointer',
        top: this.props.scrollY
      },
      children: () => this.props.alerts.map(
        (err, n) => this.props.AlertBox({n, ...err})
      )
    })
  }
}



export default function Alerts ({alerts, alertBox, ...props}) {
  if (!alerts) {
    return null
  }

  return alerts.length > 0 && (
    <Drawer fast fromTop {...props}>
      {function ({DrawerBox, toggle, show, hide, isVisible}) {
        return (
          <ViewportConsumer observe='scrollY'>
            {function (vpProps) {
              return (
                <Alerts_
                  toggle={toggle}
                  show={show}
                  hide={hide}
                  isVisible={isVisible}
                  DrawerBox={DrawerBox}
                  AlertBox={alertBox || AlertBox}
                  alerts={alerts}
                  {...vpProps}
                />
              )
            }}
          </ViewportConsumer>
        )
      }}
    </Drawer>
  )
}
