import './navbar.css'

import React, { useEffect, useState } from 'react'

const Navbar = ({search,getPage}) => {

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
          Page   {getPage}
        </div>
    </div>
  )
}

export default Navbar