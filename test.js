/* global describe, it */

const assert = require('chai').assert
const airportDiagrams = require('./index')

describe('airportDiagrams', () => {
  it('should fetch airport diagrams for a single ICAO', () => {
    return airportDiagrams('PANC').then(diagram => {
      assert(diagram)
    })
  })

  it('should fetch aiport diagrams for an array of ICAOs', () => {
    return airportDiagrams(['PANC', 'KJAX']).then(diagrams => {
      assert(diagrams.length === 2)
      diagrams.map(assert)
    })
  })

  it('should expose the list method', () => {
    return airportDiagrams.list('PANC').then(diagram => {
      assert(diagram)
    })
  })

  it('should fetch airport diagrams for an array of ICAOs using the list method', () => {
    return airportDiagrams.list(['PANC', 'KJAX']).then(diagrams => {
      assert(diagrams.length === 2)
      diagrams.map(assert)
    })
  })
})
