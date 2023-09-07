import { useEffect, useState } from "react"
import "./footer.css"

const Footer = ({setPage,getPage}) => {
  const [count,setCount]=useState(1)
  const [options,setOptions]=useState([
  pageButton(2),pageButton(3)
  ])
  
  useEffect(()=>{
    if(getPage<=3){
      setOptions(
        [
          pageButton(2),pageButton(3)
          ]
      )
      setCount(getPage)
    }
  },[getPage])
  
  //creating pagoination buttons

/*
fix pagination(amazon ref)
load data into redis and read from it
make the global search
card loading insted of global loading
 */

function pageButton(num){
  return (<button onClick={()=>setPage(num)}>
  {num}
</button>)
}
   function next(){

    if(count<9){
      setCount((count)=>count+1)
      setPage(count+1)

    }else{
      setCount((count)=>count)
      setPage(count)
    }

    if(count<=options.length){
      //((count)=>count+1)
      //setPage(count+1)
    }
    else{
      //setPage(count+1)
      setOptions([...options,pageButton((count+1))])
      if(count>=4)
      setOptions((element) => element.filter((_, index) => index !== 0))
      //setCount((count)=>count+1)

    }


  }

  function prev(){
    if(count>1){
      // setPage(count)
      // setCount(count)
      setPage(count-1)
      setCount((count)=>count-1)
    }
    else{
      
      setPage(count)
      setCount(count)
      // setPage(count-1)
      // setCount((count)=>count-1)

    }
    if(count>options.length && count>3){
      
      if(count>4){
        setOptions([pageButton(count-3),...options]
      )
    }
    setOptions((previousArr) => (previousArr.slice(0, -1)))
    }
  }

  return (
    <div className="footer">
      <div className="pagination">
        <button  onClick={()=>prev()}>Prev</button>
        <button  onClick={()=>setPage(1)}>{1}</button>
        {count>=5? <button disabled>...</button>: <></>}
        {options}
        {count>=8? <></>:<button disabled>...</button>}
        {count>=8?<button onClick={()=>setPage(9)} >{9}</button>:
        <button  onClick={()=>setPage(9)} disabled>{9}</button>}
        <button  onClick={()=>next()}>Next</button>
      </div>
    </div>
  )
}

export default Footer