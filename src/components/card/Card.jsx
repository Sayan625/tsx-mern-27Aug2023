import './card.css'
import React, { useState } from 'react'
import Modal from '../modal/Modal'

const Card = ({data}) => {
    //modal open or close
    const[modal,setModal] =useState(false)
    
    //fetching and setting a random img
    const[image,setImage]=useState(`https://picsum.photos/id/${getRandomInt(50)}/200`)

    //wrapping the setter of modal variable
    function close(){
        setModal(false)
    }

    //getting a random integer from 0 to argument given i.e max
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
     }

    // turnig modal on/off
    return modal? (<Modal close={close} data={data} img={image} setImg={()=>setImage}/>):(
        <div className='card'>
            <div className="card_border" style={{'background': `${data?.eye_color? data.eye_color: "blue"}`}}>
            <div className='card_container'  onClick={()=>setModal(!modal)}>
                <p className="card_title">{data? data.name: <>Loading..</>}</p>
                <div className="card_img">
                    {(image && data)? 
                    <img src={image} alt="" />:<>Loading..</>
                }
                </div>
            </div>
            </div>
        </div>
    )
}

export default Card