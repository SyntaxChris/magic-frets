import _ from 'lodash'
import React, { Component } from 'react'
import './note.scss'

class PositionMarker extends Component {
  constructor (props) {
    super(props)

    this.state = {
      barre: false,
      bottom: false,
      top: false
    }
  }

  componentWillMount () {
    const { fretPosition, stringPosition } = this.props

    if (stringPosition === 5) this.setState({ bottom: true })
    if (stringPosition === 0) this.setState({ top: true })
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

    return <div className='fret-marker-container'>
      <div className={
        `note${_.includes(frettedNotes[stringPosition], fretPosition) ? ' active' : ''}`
      }>
        {tuning[stringPosition][fretPosition]}
      </div>
      { _.includes(barredFrets[stringPosition], fretPosition)
        ? <div className={`barre${top ? ' top' : ''}${bottom ? ' bottom' : ''}`} />
        : null}
    </div>
  }
}

export default PositionMarker
