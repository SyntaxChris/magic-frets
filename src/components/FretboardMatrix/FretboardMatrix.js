import Draggable from 'react-draggable'
import Note from '../Note'
import React, { Component } from 'react'
import { WindowResizeListener } from 'react-window-resize-listener'
import './fretboardMatrix.scss'

class FretboardMatrix extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      defaultPositions: [],
      interactiveMode: false
    }
  }

  onDrag (e) {
    // console.log('HANDLE DRAG', e)
  }

  onStart (e) {
    // console.log(this.state)
    // console.log(e)
    // this.setState({ activeDrags: ++this.state.activeDrags })
  }

  onStop (e) {
    // console.log(this.state)
    // this.setState({ activeDrags: --this.state.activeDrags })
  }

  defaultStringPositions(stringIndex) {
    if(this.state.defaultPositions.length > 0)
      return this.state.defaultPositions[stringIndex]

    return { x: 0, y: 0 }
  }

  render () {
    const { frets, strings } = this.props
    const { defaultPosition, interactiveMode } = this.state
    const dragHandlers = {
      onStart: this.onStart.bind(this),
      onStop: this.onStop.bind(this),
      onDrag: this.onDrag.bind(this)
    }

    return <div className='fret-matrix'>
      {_.times(strings, (stringIndex) => {
        return <div
          className='matrix-string'
          key={stringIndex.toString()}
        >
          {_.times(frets, (fretIndex) => {
            return interactiveMode
              ? <Draggable
                {...dragHandlers}
                axis='y'
                bounds='parent'
                disabled={!interactiveMode}
                position={this.defaultStringPositions(stringIndex)}
                key={fretIndex.toString()}
              >
                <div className='matrix-fret'>
                  <Note
                    fretPosition={fretIndex + 1}
                    stringPosition={stringIndex}
                  />
                </div>
              </Draggable>
              : <div
                className='matrix-fret'
                key={fretIndex.toString()}
              >
                <Note
                  fretPosition={fretIndex + 1}
                  stringPosition={stringIndex}
                />
              </div>
          })}
        </div>
      })}
    </div>
  }
}

export default FretboardMatrix