import _ from 'lodash'
import Draggable from 'react-draggable'
import Fretboard from '../../../components/Fretboard'
import React from 'react'
import { Component } from 'react'
import './HomeView.scss'

class HomeView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xPosition: null,
      maxBound: null,
      minBound: null
    }
  }

  onStart (e) {
    this.setState({
      xPosition: null,
      maxBound: null,
      minBound: null,
      percentage: 0
    })
  }

  onDrag (e) {
    if (!this.state.minBound) {
      this.setState({
        minBound: e.target.offsetParent.offsetLeft + (e.target.clientWidth/2),
        maxBound: e.target.offsetParent.clientWidth + e.target.offsetParent.offsetLeft - (e.target.clientWidth/2)
      })
    }

    if (this.state.minBound) {
      const { minBound, maxBound } = this.state

      if (e.screenX >= minBound && e.screenX <= maxBound) {
        this.setState({ xPosition: e.screenX }, () => {
          const total = this.state.maxBound - this.state.minBound
          let percentage = (e.screenX - minBound)/total

          if (percentage > .95) percentage = 1
          if (percentage < .05) percentage = 0

          this.setState({ percentage })
        })
      }
    }
  }
  
  render () {
    // console.log(this.state)
    const dragHandlers = {
      onStart: this.onStart.bind(this),
      onDrag: this.onDrag.bind(this)
    }

    return <div className='home-view'>
      <div className='view-slider-container'>
        <Draggable
          axis='x'
          bounds='parent'
          {...dragHandlers}
        >
          <div className='view-slider' />
        </Draggable>
      </div>
      <div className='string-labels'>
        <div className='string-label'>e</div>
        <div className='string-label'>B</div>
        <div className='string-label'>G</div>
        <div className='string-label'>D</div>
        <div className='string-label'>A</div>
        <div className='string-label'>E</div>
      </div>
      <div className='view-box'>
        <Fretboard frets={24} strings={6} percentage={this.state.percentage} />
      </div>
    </div>
  }
}

export default HomeView
