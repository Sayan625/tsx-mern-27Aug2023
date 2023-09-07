
//const express=require('express')
const axios=require('axios')
const redis= require('redis')
//const cors=require('cors')

const redisClient = redis.createClient({
    password: '2ugON0CHpxXKHbV5LsVbtVeicg237ry1',
    socket: {
        host: 'redis-15278.c17.us-east-1-4.ec2.cloud.redislabs.com',
        port: 15278
    }
});

//const redisClient = redis.createClient(6379)

redisClient.connect().then(()=>console.log("redis connected"))

//const app=express()
//app.use(cors({
  //  origin: '*'
//}))

exports.handler= async () => {

    let allData=[]

    //app.get('/people',async (req,res)=>{
        
        const chachedData= await redisClient.get("people")
        if(chachedData!=null){
            allData=JSON.parse(chachedData)
            //res.send(JSON.parse(chachedData))
        }else{
            
            try {
                for(let i=1;i<10;i++){
                    const resp=await axios(`https://swapi.dev/api/people/?page=${i}`)
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
      body: JSON.stringify({
        allData
      })
    }
  }

