const airportDiagrams = require('./')

const example = async () => {
  const cycle = await airportDiagrams.fetchCurrentCycle()
  console.log('Current cycle:', cycle)

  const diagrams = await airportDiagrams.list(['PANC', 'KSEA'])
  console.log(JSON.stringify(diagrams, null, 2))
}

example().then()
