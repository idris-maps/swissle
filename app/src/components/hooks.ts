import { useRef, useEffect, useState } from 'preact/hooks'

export const useFocus = <T = HTMLElement>() => {
  const ref = useRef<T>()
  useEffect(() => {
    // @ts-ignore
    if (ref.current && ref.current.focus) {
      // @ts-ignore
      ref.current.focus()
    }
  }, [])
  return ref
}

const wait = (ms: number) => new Promise(r => {
  setTimeout(r, ms)
})

export const useCelebration = () => {
  const getCelebration = () => {
    const celebration = document.createElement('div')
    celebration.classList.add('celebration')
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('stroke', 'currentColor')
    svg.setAttribute('stroke-width', '2')
    svg.setAttribute('stroke-linecap', 'round')
    svg.setAttribute('stroke-linejoin', 'round')
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
    polyline.setAttribute('points', '20 6 9 17 4 12')

    svg.appendChild(polyline)
    celebration.appendChild(svg)

    return celebration
  }

  const celebrate = async () => {
    const celebration = getCelebration()
    document.body.append(celebration)
    await wait(500)
    document.body.removeChild(celebration)
    return
  }

  return celebrate
}
