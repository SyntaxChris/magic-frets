import _ from 'lodash'
import React, { Component } from 'react'
import './note.scss'

class PositionMarker extends Component {
  constructor (props) {
    super(props)

    this.state = {
      active: false,
      showGhostNote: false,
      noteValue: this.props.tuning[this.props.stringPosition][this.props.fretPosition]
    }
  }

  componentWillMount () {
    const { frettedNotes, fretPosition, stringPosition } = this.props

    if (stringPosition === 5) this.setState({ bottom: true })
    if (stringPosition === 0) this.setState({ top: true })

    this.setState({ active: frettedNotes[stringPosition][0] === fretPosition })
  }

  handleGhostNote (showGhostNote) {
    this.setState({
      noteValue: showGhostNote
        ? this.state.noteValue
        : this.props.tuning[this.props.stringPosition][this.props.fretPosition],
      showGhostNote
    })
  }

  handleNoteValue (noteValue) {
    this.setState({ noteValue })
  }

  render () {
    const {
      barredFrets,
      frettedNotes,
      fretPosition,
      stringPosition,
      tuning
    } = this.props

    // const bottom = barredFrets[stringPosition + 1][0] !== fretPosition
    // const top = barredFrets[stringPosition - 1][0] !== fretPosition

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
        className={`note${this.state.active ? ' active' : ''}${this.state.showGhostNote ? ' ghost' : ''}`}
        onMouseEnter={() => this.handleGhostNote(!isActive)}
        onMouseLeave={() => this.handleGhostNote(false)}
        onMouseDown={() => this.handleNoteValue(frettedNotes[stringPosition][1] || tuning[stringPosition][fretPosition])}
        onMouseUp={() => this.handleNoteValue(tuning[stringPosition][fretPosition])}
      >
        {this.state.noteValue}
      </div>
      { _.includes(barredFrets[stringPosition], fretPosition)
        ? <div className={`barre${top ? ' top' : ''}${bottom ? ' bottom' : ''}`} />
        : null}
    </div>
  }
}

export default PositionMarker
