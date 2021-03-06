import {
  sind,
  cosd,
  atan2d,
  wrapTo360,
  round,
  countDomicials,
} from './MathUtils'

test('sine function in degrees', () => {
  expect(sind(90)).toBe(1)
  expect(Math.round(sind(180))).toBe(0)
})

test('cosine function in degrees', () => {
  expect(Math.round(cosd(90))).toBe(0)
  expect(cosd(180)).toBe(-1)
})

test('arctangent function with 2 arguments, y/x, in degrees', () => {
  expect(atan2d(1, 1)).toBe(45)
  expect(atan2d(1, -1)).toBe(135)
  expect(atan2d(-1, -1)).toBe(225)
  expect(atan2d(-1, 1)).toBe(315)
})

test('Reducing an angle to between 0 and 360 degrees', () => {
  expect(wrapTo360(-720)).toBe(0)
  expect(wrapTo360(-400)).toBe(320)
  expect(wrapTo360(-360)).toBe(0)
  expect(wrapTo360(-355)).toBe(5)
  expect(wrapTo360(350)).toBe(350)
  expect(wrapTo360(360)).toBe(0)
  expect(wrapTo360(370)).toBe(10)
  expect(wrapTo360(720)).toBe(0)
})

test('Round a value to the nearest integer', () => {
  expect(round(123.45678)).toBe(123)
  expect(round(123.45678, 2)).toBe(123.46)
})

test('Count nunber of domicials', () => {
  expect(countDomicials(23)).toBe(0)
  expect(countDomicials(23.453453)).toBe(6)
})
