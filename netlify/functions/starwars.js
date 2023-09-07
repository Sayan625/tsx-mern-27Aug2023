
//const express=require('express')
const axios=require('axios')
const redis= require('redis')
//const cors=require('cors')

const redisClient = redis.createClient({
    password: 'Vclnsna3gE49suhucfAVAjDGsBjkqBfu',
    socket: {
        host: 'redis-11505.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 11505
    }
});



const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  }
//const redisClient = redis.createClient(6379)

redisClient.connect().then(()=>console.log("redis connected"))

//const app=express()
//app.use(cors({
  //  origin: '*'
//}))

exports.handler= async (event,_context) => {

    if (event.httpMethod === 'OPTIONS') {
        return {
          statusCode: 200,
          headers: CORS_HEADERS,
        }
      }
    let allData=[]

    //app.get('/people',async (req,res)=>{
        
        const chachedData= await redisClient.get("people")
        if(chachedData!=null){
            allData=JSON.parse(chachedData)
            //res.send(JSON.parse(chachedData))
        }else{
            
            try {
                for(let i=1;i<10;i++){
                    const resp=await axios.get(`https://swapi.dev/api/people/?page=${i}`)
                    const data = await resp.data;
                    allData.push(...data.results)
                }
    
                redisClient.setEx('people',3600,JSON.stringify(allData))
                //res.send(allData)
    
            } catch (error) {
                //res.send(error.message)
                
            }
        }
    
    
    //})
  
    return {
      statusCode: 200,
      body: JSON.stringify([...allData])
    }
  }

