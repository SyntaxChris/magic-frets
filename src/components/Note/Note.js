import _ from 'lodash'
import Pizzicato from 'pizzicato'
import React, { Component } from 'react'
import './note.scss'

class Note extends Component {
  constructor (props) {
    super(props)

    this.state = {
      active: false,
      playNote: false,
      noteValue: this.props.tuning[this.props.stringPosition][this.props.fretPosition].value,
      showGhostNote: false
    }

    this.sound = new Pizzicato.Sound({ 
      source: 'wave', 
      options: {
          frequency: this.props.tuning[this.props.stringPosition][this.props.fretPosition].frequency
      }
    })
  }

  componentWillMount () {
    const { frettedNotes, fretPosition, stringPosition } = this.props

    if (frettedNotes[stringPosition]) {
      this.setState({ active: frettedNotes[stringPosition][0] === fretPosition })
    }      
  }

  componentWillReceiveProps (nextProps) {
    const { frettedNotes, fretPosition, stringPosition } = nextProps

    if (frettedNotes[stringPosition]) {
      return this.setState({ active: frettedNotes[stringPosition][0] === fretPosition })
    }

    return this.setState({ active: false })
  }

  handleActiveNote (playNote) {
    if (!this.state.active) {
      this.setState({
        playNote,
        showGhostNote: !playNote
      })
    }

    playNote ? this.sound.play() : this.sound.stop()
  }

  handleGhostNote (showGhostNote) {
    this.setState({ showGhostNote })
  }

  render () {
    const {
      barredFrets,
      frettedNotes,
      fretPosition,
      stringPosition
    } = this.props

    const isActive = frettedNotes[stringPosition][0] === fretPosition
    // return null

    return <div className='fret-marker-container'>
      <div
        className={`note${isActive || this.state.playNote ? ' active' : ''}${this.state.showGhostNote ? ' ghost' : ''}`}
        onMouseEnter={() => this.handleGhostNote(!this.state.active)}
        onMouseLeave={() => this.handleGhostNote(false)}
        onMouseDown={() => this.handleActiveNote(true)}
        onMouseUp={() => this.handleActiveNote(false)}
      >
        {this.state.noteValue}
      </div>
    </div>
  }
}

export default Note
