export function sind(deg) {
  return Math.sin((deg / 180) * Math.PI)
}

export function cosd(deg) {
  return Math.cos((deg / 180) * Math.PI)
}

export function atan2d(y, x) {
  return wrapTo360((Math.atan2(y, x) * 180) / Math.PI)
}

export function wrapTo360(deg) {
  return deg - Math.floor(deg / 360) * 360
}

export function round(value, numOfDecimals = 0) {
  return (
    Math.round(value * Math.pow(10, numOfDecimals)) /
    Math.pow(10, numOfDecimals)
  )
}

export function countDomicials(value) {
  if (Math.floor(value) !== value)
    return value.toString().split('.')[1].length || 0
  return 0
}
