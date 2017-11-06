import _ from 'lodash'
import React, { Component } from 'react'
import './HomeView.scss'

export const FretPad = ({ fretIndex }) => {
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

class GuitarString extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active,
      fretPosition: 0
    }
    this.fretPositionCoordinates = [
      'L5,1',
      'L10,1',
      'L15,1',
      'L20,1',
      'L25,1',
      'L30,1',
      'L35,1',
      'L40,1',
      'L45,1',
      'L50,1',
      'L55,1',
      'L60,1',
      'L65,1'
    ]
  }

  componentDidMount() {
    const { stringIndex } = this.props
    if (this.props.active) return this.activateString()

    return this.setState({ mute: true })
  }


  activateString (fretIndex) {
    const { active, gauge, stringIndex } = this.props
    let angle = 0
    let lastTime = null
    let mute = true 

    this.setState({
      active: true,
      fretPosition: fretIndex + 1
    }, () => {
      const { fretIndex } = this.state

      function animate (time) {
        const frequency = 0.25/(stringIndex + 1)
        const activeString = document.getElementById(`string-${stringIndex}`)
        const mutedString = document.getElementById(`string-mute-${stringIndex}`)

        if (lastTime != null) angle += (time - lastTime) * frequency
        
        const y = 1 + (Math.sin(angle) * (gauge/0.25))
        const fretPositionPath = `M0,1 L5,1 Q50,${y} 100,1`

        lastTime = time
        
        if (activeString) {
          activeString.setAttribute('d', fretPositionPath)
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

    return <div
      className='string'
      onMouseLeave={() => this.muteString()}
    >
      <div className='label'>{label}</div>
      <div className='fretted-sections'>
        {_.times(frets, (i) => {
          return <div
            className='fret-string-section'
            key={i.toString()}
            onMouseDown={() => this.activateString(i)}
            onMouseUp={() => this.muteString()}
          />
        })}
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
            stroke='rgba(178, 173, 148, 0.6)'
            fill='none'
          />
          : <path
            id={`string-mute-${stringIndex}`}
            d='M 0,1 Q50,1 100,1'
            strokeWidth={this.props.gauge}
            stroke='rgba(178, 173, 148, 0.6)'
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
  <div className='fretboard-butt' />
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
    <Fretboard frets={24} stringProps={stringProps} />
  </div>
}

export default HomeView
