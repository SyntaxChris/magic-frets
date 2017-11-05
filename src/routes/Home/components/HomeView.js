import _ from 'lodash'
import React, { Component } from 'react'
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

class GuitarString extends Component {
  componentDidMount() {
    let angle = 0
    let lastTime = null
    const { stringIndex } = this.props
    const svgPath = document.getElementById(`guitar-string-path-${stringIndex}`)
    const frequency = 0.3/(stringIndex + 1)
    const animate = (time) => {
      //if last time is not equal to 0
      if (lastTime != null) angle += (time - lastTime) * frequency
      
      lastTime = time

      //y position from 225 to 275
      let y = 1 + (Math.sin(angle) * 1)

      svgPath.setAttribute('d', `M0,1 Q50,${y} 100,1`)

      requestAnimationFrame(animate)
    }

    animate() 
  }

  render () {
    const { stringIndex } = this.props 
    return <div className='string'>
      <svg viewBox='0 0 100 2' preserveAspectRatio='none'>
        <path
          id={`guitar-string-path-${stringIndex}`}
          d='M 0,1 Q50,1 100,1'
          strokeWidth={this.props.gauge}
          stroke='#b7b7b7'
          fill='none'
        />
      </svg>
      <animateMotion dur="2s" repeatCount="indefinite">
        <mpath xlinkHref={`#guitar-string-path-${stringIndex}`}/>
      </animateMotion>
    </div>
  }
}

export const Fretboard = ({ frets, stringGauges }) => <div className='fretboard'>
  <div className='nut' />
  <div className='frets'>
    {_.times(frets, (i) => <FretPad key={i.toString()} fretIndex={i} />)}
  </div>
  <div className='strings'>
    {stringGauges.map((gauge, i) => <GuitarString gauge={gauge} key={i.toString()} stringIndex={i} />)}
  </div>
</div>

export const HomeView = () => {
  const stringGauges = [0.15, 0.17, 0.19, 0.21, 0.23, 0.25]

  return <div className='home-view'>
    <Fretboard frets={12} stringGauges={stringGauges} />
  </div>
}

export default HomeView
