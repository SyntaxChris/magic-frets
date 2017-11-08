import _ from 'lodash'
import Fretboard from '../../../components/Fretboard'
import React from 'react'
import { Component } from 'react'
import './HomeView.scss'

export const HomeView = () => {
  return <div className='home-view'>
    <Fretboard frets={24} strings={6} />
  </div>
}

export default HomeView
