import './navbar.css'

import React, { useEffect, useState } from 'react'

const Navbar = ({search}) => {

  const [query,setQuery]=useState('')
  //triggering local search query whenever query changes via search input
  useEffect(()=>{
    search(query)
  },[query])

  return (
    <div className='navbar'>
        <div className="navbar_container">
        <input type="text" className='search' value={query} onChange={(e)=>{
          setQuery(e.target.value)
        }}/>
        </div>
        <div className="search_title">
          Search in this page
        </div>
    </div>
  )
}

export default Navbar