interface Item {
  center: [number, number]
  abbrev: string
}

const getDist = ({ center: [x1, y1] }: Item, { center: [x2, y2] }: Item) => {
  const a = Math.abs(x1 - x2)
  const b = Math.abs(y1 - y2)
  return Math.sqrt(a * a + b * b)
}

export const getNeighbors = (data: Item[], canton: Item) =>
  data.map(d => [d.abbrev, getDist(d, canton)])
    .sort((a, b) => a[1] > b[1] ? 1 : -1)
    .filter((_, i) => i !== 0 && i < 5)
    .map(d => String(d[0]))
