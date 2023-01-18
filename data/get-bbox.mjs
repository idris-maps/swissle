const bboxInit = [Infinity, Infinity, -Infinity, -Infinity]

const bboxReducer = ([xMin, yMin, xMax, yMax], [x, y]) => [
  Math.min(xMin, x),
  Math.min(yMin, y),
  Math.max(xMax, x),
  Math.max(yMax, y),
]

const getBboxFromLine = line => line.reduce(bboxReducer, bboxInit)

const getBboxFromPolygon = polygon =>
  polygon
    .reduce((r, line) => {
      const [xMin, yMin, xMax, yMax] = getBboxFromLine(line)
      return [...r, [xMin, yMin], [xMax, yMax]]
    }, [])
    .reduce(bboxReducer, bboxInit)

const getBboxFromMultiPolygon = multipolygon =>
  multipolygon
    .reduce((r, polygon) => {
      const [xMin, yMin, xMax, yMax] = getBboxFromPolygon(polygon)
      return [...r, [xMin, yMin], [xMax, yMax]]
    }, [])
    .reduce(bboxReducer, bboxInit)

export const getBbox = feature => {
  if (feature.geometry.type === 'Polygon') {
    return getBboxFromPolygon(feature.geometry.coordinates)
  }
  return getBboxFromMultiPolygon(feature.geometry.coordinates)
}