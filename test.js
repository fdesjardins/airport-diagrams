/* global describe, it */

const airportDiagrams = require('./index')

describe('airportDiagrams', () => {
  it('should fetch airport diagrams for a single ICAO', (done) => {
    airportDiagrams('KFDC').then(() => done())
  })

  it('should fetch aiport diagrams for an array of ICAOs', (done) => {
    airportDiagrams(['KFDC', 'KZBW']).then(() => done())
  })

  it('should expose the list method', (done) => {
    airportDiagrams.list('KFDC').then(() => done())
  })

  it('should fetch airport diagrams for an array of ICAOs using the list method', (done) => {
    airportDiagrams.list(['KFDC', 'KZBW']).then(() => done())
  })
})
