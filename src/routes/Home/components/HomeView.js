import _ from 'lodash'
import Fretboard from '../../../components/Fretboard'
import React from 'react'
import { Component } from 'react'
import './HomeView.scss'

export const HomeView = () => {
  return <div className='home-view'>
    <div className='view-box'>
      <Fretboard frets={24} strings={6} />
    </div>
  </div>
}

export default HomeView
