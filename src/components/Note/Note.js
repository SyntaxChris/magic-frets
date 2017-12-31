import _ from 'lodash'
import React, { Component } from 'react'
import './note.scss'

class PositionMarker extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showGhostNote: false
    }
  }

  componentWillMount () {
    const { fretPosition, stringPosition } = this.props

    if (stringPosition === 5) this.setState({ bottom: true })
    if (stringPosition === 0) this.setState({ top: true })
  }

  handleGhostNote (showGhostNote) {
    console.log('SHOW GHOST NOTE', showGhostNote)
    this.setState({ showGhostNote })
  }

  render () {
    const {
      barredFrets,
      frettedNotes,
      fretPosition,
      stringPosition,
      tuning
    } = this.props

    const bottom = !_.includes(barredFrets[stringPosition + 1], fretPosition)
    const top = !_.includes(barredFrets[stringPosition - 1], fretPosition)
    const isActive = _.includes(frettedNotes[stringPosition], fretPosition)
    // const isActive = (
    //   tuning[stringPosition][fretPosition] === 'G' ||
    //   tuning[stringPosition][fretPosition] === 'A' ||
    //   tuning[stringPosition][fretPosition] === 'A#'||
    //   tuning[stringPosition][fretPosition] === 'C' ||
    //   tuning[stringPosition][fretPosition] === 'D' ||
    //   tuning[stringPosition][fretPosition] === 'E' ||
    //   tuning[stringPosition][fretPosition] === 'F' ||
    //   tuning[stringPosition][fretPosition] === 'G' 
    // )
    return <div className='fret-marker-container'>
      <div
        className={`note${isActive ? ' active' : ''}${this.state.showGhostNote ? ' ghost' : ''}`}
        onMouseEnter={() => this.handleGhostNote(!isActive)}
        onMouseLeave={() => this.handleGhostNote(false)}
      >
        {tuning[stringPosition][fretPosition]}
      </div>
      { _.includes(barredFrets[stringPosition], fretPosition)
        ? <div className={`barre${top ? ' top' : ''}${bottom ? ' bottom' : ''}`} />
        : null}
    </div>
  }
}

export default PositionMarker
