import _ from 'lodash'
import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

export const FretPad = ({ fretIndex }) => {
  const Marker = () => {
    const fretMark = fretIndex + 1
    const singleDot = [3, 5, 7, 9]
    const doubleDot = [12]

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
    <Marker />
  </div>
}

export const Fretboard = ({frets}) => <div className='fretboard'>
  <div className='nut' />
  <div className='frets'>
    {_.times(frets, (i) => <FretPad key={i.toString()} fretIndex={i} />)}
  </div>
  <div className='strings'>
    <div className='string' />
    <div className='string' />
    <div className='string' />
    <div className='string' />
    <div className='string' />
    <div className='string' />
  </div>
</div>

export const HomeView = () => (
  <div className='home-view'>
    <Fretboard frets={12} />
  </div>
)

export default HomeView
