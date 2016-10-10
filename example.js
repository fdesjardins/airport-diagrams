const airportDiagrams = require('./')

airportDiagrams.list(['PANC', 'KSEA']).then(results => {
  console.log(JSON.stringify(results, null, 2))
})
