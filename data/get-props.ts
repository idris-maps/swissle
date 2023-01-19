interface Prop {
  id: number
  name: string
  maxHeight: number
  center: [number, number]
}

const props: Prop[] = JSON.parse(await Deno.readTextFile('props.json'))

export const getProps = (id: number) => {
  const d = props.find(d => d.id === id)
  if (!d) {
    throw new Error('Could not get props for ' + id)
  }
  return d
}
