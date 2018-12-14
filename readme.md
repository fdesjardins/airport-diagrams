# airport-diagrams

Fetch the latest airport diagrams from https://www.faa.gov/

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage][coveralls-image]][coveralls-url]
[![Maintainability][code-climate-image]][code-climate-url]

## Installation

```
$ npm install --save airport-diagrams
```

## Usage

```js
airportDiagrams.list(['PANC', 'KSEA']).then(results => {
  console.log(JSON.stringify(results, null, 2))
})
```

### Output

```json
[
  [
    {
      "state": "AK",
      "city": "ANCHORAGE",
      "airport": "TED STEVENS ANCHORAGE INTL",
      "ident": "ANC (PANC)",
      "vol": "AK-1",
      "flag": "",
      "type": "APD",
      "procedure": {
        "name": "AIRPORT DIAGRAM (PDF)",
        "url": "http://aeronav.faa.gov/d-tpp/1704/01500ad.pdf#nameddest=(ANC)"
      },
      "compare": {
        "name": "N/A"
      }
    }
  ],
  [
    {
      "state": "WA",
      "city": "SEATTLE",
      "airport": "SEATTLE-TACOMA INTL",
      "ident": "SEA (KSEA)",
      "vol": "NW-1",
      "flag": "",
      "type": "APD",
      "procedure": {
        "name": "AIRPORT DIAGRAM (PDF)",
        "url": "http://aeronav.faa.gov/d-tpp/1704/00582ad.pdf#nameddest=(SEA)"
      },
      "compare": {
        "name": "N/A"
      }
    }
  ]
]
```

## API

### `airportDiagrams(icaos)`

### `airportDiagrams.list(icaos)`

#### `icaos`

Type: `string` or `array`

One of the following:

- a single ICAO code
- an array of ICAO codes

### `airportDiagrams.fetchCurrentCycle()`

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[npm-url]: https://www.npmjs.com/package/airport-diagrams
[npm-image]: https://img.shields.io/npm/v/airport-diagrams.svg?style=flat
[travis-url]: https://travis-ci.org/fdesjardins/airport-diagrams
[travis-image]: https://img.shields.io/travis/fdesjardins/airport-diagrams.svg?style=flat
[coveralls-url]: https://coveralls.io/r/fdesjardins/airport-diagrams
[coveralls-image]: https://img.shields.io/coveralls/fdesjardins/airport-diagrams.svg?style=flat
[code-climate-url]: https://codeclimate.com/github/fdesjardins/airport-diagrams/maintainability
[code-climate-image]: https://api.codeclimate.com/v1/badges/f7f7ef72ffc973ada6ab/maintainability
