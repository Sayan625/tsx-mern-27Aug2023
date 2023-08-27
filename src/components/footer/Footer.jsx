import "./footer.css"

const Footer = ({setPage}) => {
  const options=[]
  
  //creating pagoination buttons
    for (let i = 0; i < 10; i++) {
      options.push(
        <button className="pagination_item" onClick={()=>setPage(i+1)}>
          {i+1}
        </button>
      )
  
    }
  


  return (
    <div className="footer">
      <div className="pagination">
        {options}
      </div>
    </div>
  )
}

export default Footer