import _ from 'lodash'
import { Howl } from 'howler'
import React, { Component } from 'react'
import { stringTuning } from '../../audio/config' 
import './note.scss'

class Note extends Component {
  constructor (props) {
    super(props)

    const { currentTuning, fretPosition, stringPosition, tuning } = this.props
    const { frequency } = tuning[stringPosition][fretPosition]
    const openFrequency = tuning[stringPosition][0].frequency
    const rate = frequency/openFrequency

    const audio = stringTuning[currentTuning][stringPosition]

    this.state = {
      selected: false,
      noteValue: tuning[stringPosition][fretPosition].value,
      showGhostNote: false
    }

    this.sound = new Howl({
      rate,
      src: [audio],
      sprite: {
        trim: [0, 5000]
      }
    })
  }

  componentWillMount () {
    const {
      frettedNotes,
      fretPosition,
      stringPosition,
      tuning
    } = this.props

    if (frettedNotes[stringPosition]) {
      this.setState({
        selected: frettedNotes[stringPosition][0] === fretPosition || fretPosition === 0
      })
    }      
  }

  componentWillReceiveProps (nextProps) {
    const { frettedNotes, fretPosition, stringPosition } = nextProps

    if (frettedNotes[stringPosition]) {
      return this.setState({ selected: frettedNotes[stringPosition][0] === fretPosition })
    }

    return this.setState({ selected: false })
  }

  handleActiveNote (playNote) {
    playNote ? this.sound.play('trim') : this.sound.stop()

    if (!this.state.active) {
      this.setState({ showGhostNote: !playNote && !this.props.root })
    }
  }

  handleGhostNote (showGhostNote) {
    this.sound.stop()
    this.setState({ showGhostNote }) 
  }

  render () {
    const {
      barredFrets,
      frettedNotes,
      fretPosition,
      stringPosition
    } = this.props

    const isSelected = (frettedNotes[stringPosition][0] === fretPosition)
  
    return <div className='fret-marker-container'>
      <div
        className={
          `note${
            this.props.root ? ' root' : ''
          }${
            isSelected ? ' selected' : ''
          }${
            this.sound.playing() ? ' active' : ''
          }${
            this.state.showGhostNote ? ' ghost' : ''
          }`
        }
        onMouseEnter={() => this.handleGhostNote(!this.state.selected)}
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
