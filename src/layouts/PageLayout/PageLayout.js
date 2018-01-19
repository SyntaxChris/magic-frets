import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => <div className='page-layout'>
  <div className='navbar'>
    <div className='logo'>Magic Frets</div>
  </div>
  <div className='page-content'>
    {children}
  </div>
</div>

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
