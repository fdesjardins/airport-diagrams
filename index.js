const Promise = require('bluebird')
const request = Promise.promisify(require('request'))
const cheerio = require('cheerio')

// Provide a shortcut to the list method
const airportDiagrams = module.exports = (icaos, options = {}) => {
  return airportDiagrams.list(icaos, options)
}

// Main listing method; accepts one or more ICAO codes
airportDiagrams.list = (icaos, options = {}) => {
  if (Array.isArray(icaos)) {
    return Promise.all(icaos.map(listOne))
  }
  return listOne(icaos)
}

const listOne = (icao) => {
  return request(`https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/dtpp/search/results/?cycle=1613&ident=${icao}&sort=type&dir=asc`)
    .then(res => parse(res.body))
}

// Parse the response HTML
const parse = (html) => {
  const $ = cheerio.load(html)
  const $resultsTable = $('#resultsTable')

  if (!$resultsTable.html()) {
    return null
  }

  const results = $resultsTable.find('tr').toArray().map(row => {
    const $row = $(row)
    const type = $row.find('td:nth-child(7)').text().trim()

    if (type === 'APD') {
      const state = $row.find('td:nth-child(1)').text().trim()
      const city = $row.find('td:nth-child(2)').text().trim()
      const airport = $row.find('td:nth-child(3)').text().trim()
      const ident = $row.find('td:nth-child(4)').text().trim()
      const vol = $row.find('td:nth-child(5)').text().trim()
      const flag = $row.find('td:nth-child(6)').text().trim()
      const procedure = {
        name: $row.find('td:nth-child(8)').text().trim(),
        url: $row.find('td:nth-child(8)').find('a').attr('href')
      }
      const compare = {
        name: $row.find('td:nth-child(9)').text().trim(),
        url: $row.find('td:nth-child(9)').find('a').attr('href')
      }

      return {
        state,
        city,
        airport,
        ident,
        vol,
        flag,
        type,
        procedure,
        compare
      }
    }
  }).filter(x => !!x)

  if (results.length > 0) {
    return results
  }
  return null
}
