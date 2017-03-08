# airport-diagrams

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-image]][npm-url]
[![Coverage][coveralls-image]][coveralls-url]

Fetch the latest airport diagrams from https://www.faa.gov/

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
        "url": "http://aeronav.faa.gov/d-tpp/1610/01500ad.pdf#search=PANC"
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
      "flag": "C",
      "type": "APD",
      "procedure": {
        "name": "AIRPORT DIAGRAM (PDF)",
        "url": "http://aeronav.faa.gov/d-tpp/1610/00582ad.pdf#search=KSEA"
      },
      "compare": {
        "name": "Compare (PDF)",
        "url": "http://aeronav.faa.gov/d-tpp/1610/compare_pdf/00582ad_cmp.pdf"
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
