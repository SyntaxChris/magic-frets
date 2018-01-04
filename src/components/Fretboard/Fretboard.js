import _ from 'lodash'
import { connect } from 'react-redux'
import Draggable from 'react-draggable'
import FretboardMatrix from '../FretboardMatrix'
import GuitarString from '../GuitarString'
import Note from '../Note'
import React, { Component } from 'react'
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
    <Marker />
    <div className='label'>{fretMark}</div>
  </div>
}

class Fretboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xPosition: null,
      maxBound: null,
      minBound: null
    }
  }

  onStart (e) {
    this.setState({
      xPosition: null,
      maxBound: null,
      minBound: null,
      percentage: 0
    })
  }

  onDrag (e) {
    if (!this.state.minBound) {
      this.setState({
        minBound: e.target.offsetParent.offsetLeft + (e.target.clientWidth/2),
        maxBound: e.target.offsetParent.clientWidth + e.target.offsetParent.offsetLeft - (e.target.clientWidth/2)
      })
    }

    if (this.state.minBound) {
      const { minBound, maxBound } = this.state

      if (e.screenX >= minBound && e.screenX <= maxBound) {
        this.setState({ xPosition: e.screenX }, () => {
          const total = this.state.maxBound - this.state.minBound
          let percentage = (e.screenX - minBound)/total

          if (percentage > .95) percentage = 1
          if (percentage < .05) percentage = 0

          this.setState({ percentage })
        })
      }
    }
  }

  openStrings () {
    const openStrings = []

    this.props.tuning.forEach((string) => {
      openStrings.push(string[0])
    })

    if (openStrings[0].value === openStrings[openStrings.length - 1].value) {
      openStrings[0].value = openStrings[0].value.toLowerCase()
    }

    return openStrings
  }

  render () {
    const dragHandlers = {
      onStart: this.onStart.bind(this),
      onDrag: this.onDrag.bind(this)
    }

    const frets = 24
    const strings = 6
    const { frettedNotes } = this.props 

    return <div className='fretboard-container'>
      <div className='view-slider-container'>
        <Draggable
          axis='x'
          bounds='parent'
          {...dragHandlers}
        >
          <div className='view-slider' />
        </Draggable>
      </div>

      <div className='string-labels'>
        {this.openStrings().map((val, i) => {
          // return <div
          //   className={`string-label${_.includes(frettedNotes[i], 0) ? ' active' : ''}`}
          //   key={i.toString()}
          // >
          //   {val}
          // </div>
          return <Note
            root={true}
            fretPosition={0}
            key={i.toString()}
            stringPosition={i}
          />
        })}
      </div>

      <div className='view-box'>
        <div
          className='fretboard'
          style={{ marginLeft: `${2 + this.state.percentage * -49}%`}}
        >
          <FretboardMatrix
            frets={frets}
            strings={strings}
          />
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
      </div>
    </div>
  }
}

export default Fretboard
