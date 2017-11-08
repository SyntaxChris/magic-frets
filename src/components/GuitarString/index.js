import _ from 'lodash'
import React, { Component } from 'react'
import './guitarStrings.scss'

const restingPositions = [
  'M0,0.5 100,0.5',
  'M0,1 100,1',
  'M0,2 100,2',
  'M0,2.5 100,2.5',
  'M0,2.7 100,2.7',
  'M0,3.5 100,3.5'
]

const vibrationCoordinates = (yPosition) => [
  `Q50`, // 1
  `L4,${yPosition} Q54`, // 2
  `L7.4,${yPosition} Q57.4`, // 3
  `L10.7,${yPosition} Q60.7`, // 
  `L13.7,${yPosition} Q63.7`, // 4
  `L16.7,${yPosition} Q66.7`, // 5
  `L19.2,${yPosition} Q69.2`, // 6
  `L22,${yPosition} Q72`, // 7
  `L24.4,${yPosition} Q74.4`, // 8
  `L26.7,${yPosition} Q76.7`, // 9
  `L29,${yPosition} Q77`, // 10
  `L31,${yPosition} Q80`, // 11
  `L33,${yPosition} Q80`, // 12
  `L35,${yPosition} Q80`, // 13
  `L36.5,${yPosition} Q80`, // 14
  `L38,${yPosition} Q80`, // 15
  `L39.8,${yPosition} Q80`, // 16
  `L41.2,${yPosition} Q80`, // 17
  `L42.5,${yPosition} Q80`, // 18
  `L43.7,${yPosition} Q80`, // 19
  `L44.9,${yPosition} Q80`, // 20
  `L46.2,${yPosition} Q80`, // 21
  `L47.2,${yPosition} Q80`, // 22
  `L48.5,${yPosition} Q80`, // 23
  `L49.3,${yPosition} Q80`, // 24
]


class GuitarString extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active,
      fretPosition: 0
    }
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
      const { fretPosition } = this.state

      function animate (time) {
        const frequency = 0.25/(stringIndex + 1)
        const activeString = document.getElementById(`string-${stringIndex}`)
        const mutedString = document.getElementById(`string-mute-${stringIndex}`)

        if (lastTime != null) angle += (time - lastTime) * frequency

        
        // const y                    = 3 + (Math.sin(angle) * (0.2))
        // const yPosition            = restingPositions[stringIndex].split(' ')[0].split(',')[1]

        const yPosition = [0.5, 1, 2, 2.5, 2.7, 3.5][stringIndex]
        const y = yPosition + (Math.sin(angle) * (gauge/0.13))
        // const y                    = yPosition + (Math.sin(angle) * 4)
        
        const vibrateCoordinate    = `${vibrationCoordinates(yPosition)[fretPosition]},${y}`
        const coordinatesArr       = restingPositions[stringIndex].split(' ')
        const vibrateCoordinateArr = vibrateCoordinate.split(' ')

        vibrateCoordinateArr.forEach((coordinate, i) => coordinatesArr.splice(i + 1, 0, coordinate))
        lastTime = time

        if (activeString) {
          activeString.setAttribute('d', coordinatesArr.join(' '))
        } else if (mutedString) {
          mutedString.setAttribute('d', restingPositions[stringIndex])
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
        viewBox='0 0 50 4'
      > 
        {this.state.active
          ? <path
            id={`string-${stringIndex}`}
            d={restingPositions[stringIndex]}
            strokeWidth={this.props.gauge}
            stroke='rgba(178, 173, 148, 0.6)'
            fill='none'
          />
          : <path
            id={`string-mute-${stringIndex}`}
            d={restingPositions[stringIndex]}
            strokeWidth={this.props.gauge}
            stroke='rgba(178, 173, 148, 0.6)'
            fill='none'
          />}
      </svg>
    </div>
  }
}

export default GuitarString
