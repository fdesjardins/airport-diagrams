const cheerio = require('cheerio')
const superagent = require('superagent')

/**
 *  A shortcut to the list() method
 */
const airportDiagrams = (module.exports = (icaos, options = {}) => {
  return airportDiagrams.list(icaos, options)
})

/**
 * Main listing method; accepts one or more ICAO codes
 */
airportDiagrams.list = icaos => {
  if (Array.isArray(icaos)) {
    return Promise.all(icaos.map(listOne))
  }
  return listOne(icaos)
}

/**
 * Fetch the current diagrams distribution cycle numbers (.e.g, 1813)
 */
const fetchCurrentCycle = (airportDiagrams.fetchCurrentCycle = async () => {
  const response = await superagent.get(
    'https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/dtpp/search/'
  )
  const $ = cheerio.load(response.text)
  return $('select#cycle > option:contains(Current)').val()
})

/**
 * Using the current cycle, fetch the airport diagrams for a single ICAO code
 */
const listOne = async icao => {
  const searchCycle = await fetchCurrentCycle()
  const response = await superagent.get(
    `https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/dtpp/search/results/?cycle=${searchCycle}&ident=${icao}&sort=type&dir=asc`
  )
  return parse(response.text)
}

/**
 * Parsing helper methods
 */
const text = ($row, columnIndex) =>
  $row
    .find(`td:nth-child(${columnIndex})`)
    .text()
    .trim()

const link = ($row, columnIndex) =>
  $row
    .find(`td:nth-child(${columnIndex})`)
    .find('a')
    .attr('href')

const extractRow = $row => {
  return {
    state: text($row, 1),
    city: text($row, 2),
    airport: text($row, 3),
    ident: text($row, 4),
    vol: text($row, 5),
    flag: text($row, 6),
    procedure: {
      name: text($row, 8),
      url: link($row, 8)
    },
    compare: {
      name: text($row, 9),
      url: link($row, 9)
    }
  }
}

const isDiagramRow = $row => text($row, 7) === 'APD'

/**
 *  Parse the response HTML into JSON
 */
const parse = html => {
  const $ = cheerio.load(html)
  const $resultsTable = $('#resultsTable')

  if (!$resultsTable.html()) {
    console.error('Unable to parse the #resultsTable page element')
    return null
  }

  const results = $resultsTable
    .find('tr')
    .toArray()
    .filter(row => isDiagramRow($(row)))
    .map(row => extractRow($(row)))
    .filter(x => !!x)

  if (results.length > 0) {
    return results
  }
}
