import './gridview.css'
import React from 'react'
import Card from '../card/Card.jsx';



const GridView = ({data}) => {
  const array=new Array(10).fill(0);
  console.log(data)
  return  (
    <div className="grid">
      <div className='grid_container'>
        {data?.map((element,index)=>{
          return <Card key={index} data={data[index]} />
        })}
      </div>
    </div>
  )
}

export default GridView