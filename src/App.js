import './App.css';
import GridView from './components/gridview/GridView.jsx';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Loader from './components/loader/Loader';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [pageNo,setPageNo] = useState(1)
  const [allData, setAllData] = useState([])
  const[error, setError] = useState("")
  const[searchData, setSearchData] = useState([])
  const[loader,setLoader]=useState(true)

  //triggering and getdata whenever pageNo changes
  useEffect(() => {
    GetData()
  },[])

  useEffect(() => {
    setSearchData(allData.slice(10*pageNo-10,10*pageNo))
  }, [pageNo])

  //fetching the data and storing it in allData and searchData variable.
  async function GetData() {
    setLoader(true);
    try {
      const resp = await axios.get(`https://star-wars-640df3.netlify.app/.netlify/functions/starwars`)
      //const data = await resp.json();
      //const resp = await axios.get(`http://localhost:5000/people`)
      
      setAllData(resp.data);
      console.log(resp.data)
      setSearchData(resp.data?.slice(0,10*pageNo))
      setLoader(false);
    } catch (error) {
      setError(error.message)
    }


  }

  //wrapper of pageNo setter
  const SetCurrentPage=(page)=>{
    setPageNo(page)
  }

  //if there is a search query then allData is filtered based and loaded to searchData
  function Search(query){

    if(query.length>0 || query!==''){
      const filteredData=allData?.filter((data)=>{
        return data.name.toLowerCase().includes(query)
      })
      setSearchData(filteredData)

    }else{
      setSearchData(allData.slice(10*pageNo-10,10*pageNo))
    }

  }

    return error? <>{error}</> : (
      <div className="App">
        <div className="app_body">
          <div className="body">
            <Navbar search={Search} getPage={pageNo}/>
            <div className="container">
              {/* loader or grid view is rendered. gridview is rendered based on searchData */}
              {<GridView data={searchData} />} 
            </div>
          </div>
        </div>
        <div className="app_footer">
         <Footer setPage={SetCurrentPage} getPage={pageNo} />
        </div>
      </div>
    )




}

export default App;
