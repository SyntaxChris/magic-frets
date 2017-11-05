import _ from 'lodash'
import React, { Component } from 'react'
import './HomeView.scss'

export const FretPad = ({ fretIndex }) => {
  const fretMark = fretIndex + 1
  const Marker = () => {
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
    <div className='label'>{fretMark}</div>
    <Marker />
  </div>
}

class GuitarString extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active
    }
  }

  componentDidMount() {
    const { stringIndex } = this.props
    if (this.props.active) return this.activateString()

    return this.setState({ mute: true })
  }


  activateString () {
    const { active, gauge, stringIndex } = this.props
    const { guitarString } = this
    const setState = this.setState
    let angle = 0
    let lastTime = null
    let mute = true 

    this.setState({ active: true }, () => {
      function animate (time) {
        const frequency = 0.16/(stringIndex + 1)
        const activeString = document.getElementById(`string-${stringIndex}`)
        const mutedString = document.getElementById(`string-mute-${stringIndex}`)

        if (lastTime != null) angle += (time - lastTime) * frequency
        
        lastTime = time

        const y = 1 + (Math.sin(angle) * (gauge/0.25))

        if (activeString) {
          activeString.setAttribute('d', `M0,1 Q50,${y} 100,1`)
        } else if (mutedString) {
          mutedString.setAttribute('d', 'M 0,1 Q50,1 100,1')
        }

        return requestAnimationFrame(animate)
      }

      animate()
    })
  }

  muteString () {
    this.setState({ active: false })
  }

  render () {
    const { frets, label, stringIndex } = this.props 

    return <div className='string'>
      <div className='label'>{label}</div>
      <div
        className='fretted-sections'
        onMouseDown={() => this.activateString()}
        onMouseUp={() => this.muteString()}
      >
        {_.times(frets, (i) => <div className='fret-string-section' key={i.toString()}/>)}
      </div>
      <svg
        preserveAspectRatio='none'
        viewBox='0 0 50 2'
      > 
        {this.state.active
          ? <path
            id={`string-${stringIndex}`}
            d='M 0,1 Q50,1 100,1'
            strokeWidth={this.props.gauge}
            stroke='#b7b7b7'
            fill='none'
          />
          : <path
            id={`string-mute-${stringIndex}`}
            d='M 0,1 Q50,1 100,1'
            strokeWidth={this.props.gauge}
            stroke='#b7b7b7'
            fill='none'
          />}
      </svg>
    </div>
  }
}










export const Fretboard = ({ frets, stringProps }) => <div className='fretboard'>
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
</div>

export const HomeView = () => {
  const stringProps = [{
    active: false,
    gauge: 0.15,
    label: 'e'
  },
  {
    active: false,
    gauge: 0.17,
    label: 'B'
  },
  {
    active: false,
    gauge: 0.19,
    label: 'G'
  },
  {
    active: false,
    gauge: 0.21,
    label: 'D'
  },
  {
    active: false,
    gauge: 0.23,
    label: 'A'
  },
  {
    active: false,
    gauge: 0.25,
    label: 'E'
  }]

  return <div className='home-view'>
    <Fretboard frets={13} stringProps={stringProps} />
  </div>
}

export default HomeView
