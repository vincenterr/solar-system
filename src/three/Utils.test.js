import {
  getDayNumber,
  getOblecl,
  getEccentricAnomalyInDeg,
  getEccentricAnomaly,
  getTrueAnomaly,
  getRadialDistance,
  getTrueLongitude,
  getPosInEclRectCoord,
  getPositionInEclRectCoord,
  getPosInEquatRectCoord,
  getRightAscension,
  getDeclination,
  getMeanLongitude,
  getsiderealTime,
  getPosInEclSphericalCoord,
} from './Utils'
import * as MathUtils from './MathUtils'
import { sun } from './OrbitalElementsData'

test('Getting day number', () => {
  const date = new Date('1990-04-19T00:00:00')

  expect(getDayNumber(date)).toBe(-3543)
})

test('Getting obliquity of the ecliptic', () => {
  const dayNumber = -3543

  expect(MathUtils.round(getOblecl(dayNumber), 4)).toBe(23.4406)
})

test('Getting eccentric anomaly in degrees', () => {
  const d = -3543
  const M = MathUtils.wrapTo360(sun.M.value + sun.M.variation * d)
  const e = sun.e.value + sun.e.variation * d
  const E = getEccentricAnomalyInDeg(M, e)

  expect(MathUtils.round(M, 4)).toBe(104.0653)
  expect(MathUtils.round(e, 6)).toBe(0.016713)
  expect(MathUtils.round(E, 4)).toBe(104.9904)
})

test('Getting eccentric anomaly', () => {
  const MOfMoon = 266.0954
  const eOfMoon = 0.0549
  const EOfMoon = getEccentricAnomaly(MOfMoon, eOfMoon)
  const MOfMercury = 69.5153
  const eOfMercury = 0.205633
  const EOfMercury = getEccentricAnomaly(MOfMercury, eOfMercury)

  expect(MathUtils.round(EOfMoon, 4)).toBe(262.9735)
  expect(MathUtils.round(EOfMercury, 4)).toBe(81.1572)
})

test('Getting true anomaly in degrees', () => {
  const E = 104.9904
  const e = 0.016713

  expect(MathUtils.round(getTrueAnomaly(E, e), 4)).toBe(105.9134)
})

test('Getting Radial distance', () => {
  const a = 1
  const E = 104.9904
  const e = 0.016713

  expect(MathUtils.round(getRadialDistance(a, E, e), 6)).toBe(1.004323)
})

test('Getting mean longitude', () => {
  const d = -3543
  const N = MathUtils.wrapTo360(sun.N.value + sun.N.variation * d)
  const w = MathUtils.round(
    MathUtils.wrapTo360(sun.w.value + sun.w.variation * d),
    4
  )
  const M = MathUtils.wrapTo360(sun.M.value + sun.M.variation * d)
  const L = MathUtils.round(getMeanLongitude(N, w, M), 4)

  expect(L).toBe(26.8388)
})

test('Getting true longitude', () => {
  const d = -3543
  const N = MathUtils.wrapTo360(sun.N.value + sun.N.variation * d)
  const w = MathUtils.round(
    MathUtils.wrapTo360(sun.w.value + sun.w.variation * d),
    4
  )
  const M = MathUtils.wrapTo360(sun.M.value + sun.M.variation * d)
  const e = sun.e.value + sun.e.variation * d
  const E = getEccentricAnomalyInDeg(M, e)
  const v = MathUtils.round(getTrueAnomaly(E, e), 4)

  expect(N).toBe(0)
  expect(w).toBe(282.7735)
  expect(MathUtils.round(getTrueLongitude(N, w, v), 4)).toBe(28.6869)
})

test('Getting position in ecliptic rectangular coordinates', () => {
  const r = 1.004323
  const l = 28.6869
  const { x, y, z } = getPosInEclRectCoord(r, l)

  expect(MathUtils.round(x, 6)).toBe(0.881048)
  expect(MathUtils.round(y, 6)).toBe(0.482098)
  expect(z).toBe(0)
})

test('Get position in ecliptic rectangular coordinates', () => {
  const N = 48.2163
  const i = 7.0045
  const w = 29.0882
  const a = 0.387098
  const e = 0.205633
  const M = 69.5153
  const E = getEccentricAnomaly(M, e)
  const r = getRadialDistance(a, MathUtils.round(E, 4), e)
  const v = getTrueAnomaly(E, e)
  const { x, y, z } = getPositionInEclRectCoord(N, i, w, r, v)

  expect(MathUtils.round(r, 6)).toBe(0.374862)
  expect(MathUtils.round(v, 4)).toBe(93.0727)
  expect(MathUtils.round(x, 6)).toBe(-0.367821)
  expect(MathUtils.round(y, 6)).toBe(0.061084)
  expect(MathUtils.round(z, 6)).toBe(0.038699)
})

test('Get position in ecliptic sherical coordinates', () => {
  const x = -0.367821
  const y = 0.061084
  const z = 0.038699
  const { r, long, lat } = getPosInEclSphericalCoord(x, y, z)

  expect(MathUtils.round(r, 6)).toBe(0.374862)
  expect(MathUtils.round(long, 4)).toBe(170.5709)
  expect(MathUtils.round(lat, 4)).toBe(5.9255)
})

test('Getting position in equatorial rectangular coordinates', () => {
  const xecl = 0.881048
  const yecl = 0.482098
  const zecl = 0
  const oblecl = 23.4406
  const { x, y, z } = getPosInEquatRectCoord(xecl, yecl, zecl, oblecl)

  expect(MathUtils.round(x, 6)).toBe(0.881048)
  expect(MathUtils.round(y, 6)).toBe(0.442312)
  expect(MathUtils.round(z, 6)).toBe(0.191778)
})

test('Getting right ascension', () => {
  const xequat = 0.881048
  const yequat = 0.442312
  const ra = getRightAscension(xequat, yequat)

  expect(MathUtils.round(ra, 4)).toBe(26.658)
})

test('Getting declination', () => {
  const xequat = 0.881048
  const yequat = 0.442312
  const zequat = 0.191778
  const dcel = getDeclination(xequat, yequat, zequat)

  expect(MathUtils.round(dcel, 4)).toBe(11.0084)
})

test('Getting sidereal time', () => {
  const UT = 0
  const longitude = 15
  const L = 26.8388
  const siderealTime = getsiderealTime(UT, longitude, L)

  expect(MathUtils.round(siderealTime, 5)).toBe(14.78925)
})
