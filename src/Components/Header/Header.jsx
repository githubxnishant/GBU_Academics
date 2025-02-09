import React from 'react'
import TopLinks from './TopLinks'
import BottomHeader from './BottomHeader'

const Header = () => {
  return (
    <>
        <div className='header shadow sticky-top'>
            <TopLinks />
            <BottomHeader />
        </div>
    </>
  )
}

export default Header