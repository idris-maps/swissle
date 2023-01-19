const cantons = await (await fetch('https://raw.githubusercontent.com/idris-maps/swiss-geodata-2018/master/data/cantons.json')).json()

const data = cantons.features.map((d: any) => {
  const {
    KTNR: id,
    KTNAME: name,
    Z_MAX: maxHeight,
    E_CNTR: x,
    N_CNTR: y,
  } = d.properties
  return { id, name, maxHeight, center: [x, y] }
})

console.log(JSON.stringify(data))
