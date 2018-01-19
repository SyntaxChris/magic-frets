import _ from 'lodash'
import Draggable from 'react-draggable'
import Fretboard from '../../../components/Fretboard'
import React, { Component } from 'react'
import videojs from 'video.js'
import 'videojs-youtube'
import './HomeView.scss'
import 'video.js/dist/video-js.css'

//https://docs.videojs.com/tutorial-options.html#width
const videoJsOptions = {
  // aspectRatio: '12:3',
  autoplay: true,
  controls: true,
  fluid: true,
  sources: [{
    src: 'https://www.youtube.com/watch?v=iRusbYIyRNI',
    type: 'video/youtube'
  }],
  youtube: { 
    // ytControls: 2,
    iv_load_policy: 1
  }
}

class VideoPlayer extends Component {
  componentDidMount () {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady () {
      console.log('onPlayerReady', this)
    })
  }

  // destroy player on unmount
  componentWillUnmount () {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render () {
    return <div className='video-container'>
      <div data-vjs-player>
        <video
          controls
          ref={ node => this.videoNode = node }
          className="video-js"
        />
      </div>
    </div>
  }
}

const HomeView = () => <div className='home-view'>
  <VideoPlayer { ...videoJsOptions } />
  <Fretboard />
</div>

export default HomeView
