import './modal.css'
import React, { useEffect, useState } from 'react'

const Modal = ({ data, close, img, setImg }) => {
    useEffect(() => {
        GetHome(data)
        setImg(img)
    })

    const [home, setHome] = useState()

    async function GetHome(data) {
        const resp = await fetch(data.homeworld)
        const home = await resp.json()
        setHome(home)
    }

    function GetDate(ip) {
        const date = new Date(ip);
        const dateString = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
        return dateString;
    }

    return (
        <div className='modal'>
            <div className="modal_details">
                <div className="modal_img">
                    <img src={img} alt="" />
                </div>
                <div className="modal_description">
                    {/* modal close button */}
                    <button className='close_btn' onClick={close}>X</button>
                    <div className="modal_details_title">
                        <h2>{data.name}</h2>
                    </div>
                    {/* modal details */}
                    <div className="modal_details_item">
                        <p>Height</p>
                        <p>{parseFloat(data.height * 0.01).toFixed(2)}m</p>
                    </div>
                    <div className="modal_details_item">
                        <p>Mass</p>
                        <p>{ parseFloat(data.mass).toFixed(2)}kg</p>
                    </div>
                    <div className="modal_details_item">
                        <p>Birth year</p>
                        <p>{data.birth_year}</p>
                    </div>
                    <div className="modal_details_item">
                        <p>Created At</p>
                        <p>{GetDate(data.created)}</p>
                    </div>
                    <div className="modal_details_item">
                        <p>Films appeared in</p>
                        <p>{data.films.length}</p>
                    </div>
                    {/* modal homeworld details */}
                    <div className="modal_details_title">
                        <h4>Home World</h4>
                    </div>
                    {home ? <>
                        <div className="modal_details_item">
                            <p>Name</p>
                            <p>{home?.name}</p>
                        </div>
                        <div className="modal_details_item">
                            <p>Climate</p>
                            <p>{home?.climate}</p>
                        </div>
                        <div className="modal_details_item">
                            <p>Population</p>
                            <p>{home?.population}</p>
                        </div></> 
                        : <>Loaading...</>}
                </div>
            </div>
        </div>
    )
}

export default Modal