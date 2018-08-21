export default icon => ({color, innerRef, name, ...svgProps}) => {
  svgProps.ref = innerRef
  svgProps.pathStyle = {fill: color || '#000'}
  return icon(svgProps)
}
