import './gridview.css'
import React from 'react'
import Card from '../card/Card.jsx';



const GridView = ({data}) => {
  return (
    <div className="grid">
      <div className='grid_container'>
        {data?.map((data,index)=>{
          return <Card key={index} data={data} />
        })}

      </div>
    </div>
  )
}

export default GridView