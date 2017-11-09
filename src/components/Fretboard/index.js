import FretboardMatrix from '../FretboardMatrix'
import GuitarString from '../GuitarString'
import React from 'react'
import './fretboard.scss'

const stringProps = [
  {
    active: false,
    gauge: 0.07,
    label: 'e'
  },
  {
    active: false,
    gauge: 0.09,
    label: 'B'
  },
  {
    active: false,
    gauge: 0.10,
    label: 'G'
  },
  {
    active: false,
    gauge: 0.11,
    label: 'D'
  },
  {
    active: false,
    gauge: 0.12,
    label: 'A'
  },
  {
    active: false,
    gauge: 0.13,
    label: 'E'
  }
]

const FretPad = ({ fretIndex }) => {
  const fretMark = fretIndex + 1
  const Marker = () => {
    const singleDot = [3, 5, 7, 9, 15, 17, 19, 21]
    const doubleDot = [12, 24]

    if (singleDot.includes(fretMark)) {
      return <div className='dot' />
    }

    if (doubleDot.includes(fretMark)) {
      return <div className='double-dots'>
        <div className='dot' />
        <div className='dot' />
      </div>
    }

    return null
  }

  return <div className='fret'>
    <div className='label'>{fretMark}</div>
    <Marker />
  </div>
}

const FretPositionMarkers = () => <div className='string-markers'>
  <div className='string-marker one' />
  <div className='string-marker two' />
  <div className='string-marker three' />
  <div className='string-marker four' />
  <div className='string-marker five' />
  <div className='string-marker six' />
</div>



export const Fretboard = ({ frets, strings }) => <div className='fretboard'>
  <FretPositionMarkers />
  <FretboardMatrix frets={frets} strings={strings} />
  <div className='nut' />
  <div className='frets'>{_.times(frets, (i) => <FretPad key={i.toString()} fretIndex={i} />)}</div>
  <div className='strings'>
    {stringProps.map((prop, i) => {
      return <GuitarString
        active={prop.active}
        frets={frets}
        label={prop.label}
        gauge={prop.gauge}
        key={i.toString()}
        stringIndex={i}
      />
    })}
  </div>
  <div className='fretboard-butt' />
</div>

export default Fretboard