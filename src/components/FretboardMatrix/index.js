import Draggable from 'react-draggable'
import React, { Component } from 'react'
import { WindowResizeListener } from 'react-window-resize-listener'
import './fretboardMatrix.scss'

class FretboardMatrix extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      defaultPositions: []
    }
  }

  onDrag (e) {
    console.log('HANDLE DRAG', e)
  }

  onStart (e) {
    // console.log(this.state)
    // console.log(e)
    // this.setState({ activeDrags: ++this.state.activeDrags })
  }

  onStop (e) {
    console.log(this.state)
    // this.setState({ activeDrags: --this.state.activeDrags })
  }

  defaultStringPositions(stringIndex) {
    if(this.state.defaultPositions.length > 0) return this.state.defaultPositions[stringIndex]
    return {x: 0, y: 0}
  }

  defaultPosition (stringIndex) {
    return [
      {x: 0, y: 0},
      {x: 0, y: 9},
      {x: 0, y: 33},
      {x: 0, y: 20},
      {x: 0, y: 25},
      {x: 0, y: 30}
    ][stringIndex]
  }

  locateStringMarkers (windowSize) {
    const markers = document.getElementsByClassName('string-marker')
    if (windowSize) console.log('Window width', windowSize.windowWidth)
    const offsetTops = Array.prototype.map.call(markers, (marker, i) => {
      if (i === 0) return { x: 0, y: marker.offsetTop - 9 * (windowSize.windowWidth/1440)}
      if (i === 1) return { x: 0, y: marker.offsetTop - 35 * (windowSize.windowWidth/1440)}
      if (i === 2) return { x: 0, y: marker.offsetTop - 44 * (windowSize.windowWidth/1440)}
      if (i === 3) return { x: 0, y: marker.offsetTop - 68 * (windowSize.windowWidth/1440)}
      if (i === 4) return { x: 0, y: marker.offsetTop - 94 * (windowSize.windowWidth/1440)}
      if (i === 5) return { x: 0, y: marker.offsetTop - 118 * (windowSize.windowWidth/1440)}
    })

    this.setState({ defaultPositions: offsetTops })
  }

  render () {
    const { frets, strings } = this.props
    const { defaultPosition } = this.state
    const dragHandlers = {
      onStart: this.onStart.bind(this),
      onStop: this.onStop.bind(this),
      onDrag: this.onDrag.bind(this)
    }

    return <div className='fret-matrix'>
      <WindowResizeListener onResize={(windowSize) => this.locateStringMarkers(windowSize)}/>
      {_.times(strings, (stringIndex) => {
        return <div className='matrix-string' key={stringIndex.toString()}>
          {_.times(frets, (fretIndex) => {
            return <Draggable
              axis='y' {...dragHandlers}
              bounds='parent'
              position={this.defaultStringPositions(stringIndex)}
              key={fretIndex.toString()}
            >
              <div className='matrix-fret' />
            </Draggable>
          })}
        </div>
      })}
    </div>
  }
}

export default FretboardMatrix