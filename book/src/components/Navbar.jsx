import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    < div >
      <div className='list'>
        <h1>Open Library</h1>
        <ul className='dd flex gap-10'>
          <li>Home</li>
          <li>Books</li>
        </ul>
      </div>
    </div >
  )
}

export default Navbar