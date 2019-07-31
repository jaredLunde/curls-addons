import React, {useEffect} from 'react'
import useWindowScroll from '@react-hook/window-scroll'
import {requestTimeout, clearRequestTimeout} from '@essentials/request-timeout'
import {Drawer, DrawerBox, Box, Text} from 'curls'
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
    <Box
      flex
      as='li'
      wrap='no'
      align='center'
      p={3}
      m={3}
      bw='1'
      br={1}
      bc={bc}
      bg='lightestGrey'
      maxW='600'
      key={id || n}
      {...props}
    >
      {n === 0 && (
        <Icon name='close' size='xs' color={bc} m='r2'/>
      )}

      <Text center fluid color={color}>
        {message}
      </Text>
    </Box>
  )
}

const Alerts_ = ({duration = 6000, show, hide, alerts, AlertBox, portal}) => {
  const scrollY = useWindowScroll(60 /*fps*/)

  useEffect(
    () => {
      show()
      const hideTimeout = requestTimeout(hide, duration + 10)
      return () => clearRequestTimeout(hideTimeout)
    },
    [alerts]
  )

  return <DrawerBox
    as='ul'
    flex
    column
    pos='absolute'
    align='center'
    w='100%'
    portal={portal}
    onClick={hide}
    style={{cursor: 'pointer', top: scrollY}}
    children={alerts.map(
      (err, n) => AlertBox({
        n,
        count: alerts.length,
        ...(typeof err === 'string' ? {message: err} : err)
      })
    )}
  />
}


export function Alerts ({alerts, children, portal, duration, ...props}) {
  if (!alerts) return null
  return alerts.length > 0 && (
    <Drawer fromTop duration='fast' {...props}>
      {({show, hide}) => (
        <Alerts_
          show={show}
          hide={hide}
          AlertBox={children}
          alerts={alerts}
          duration={duration}
          portal={portal}
        />
      )}
    </Drawer>
  )
}
