//create express app
const exp=require('express')
const app=exp();
const path=require('path')


//join with react
app.use(exp.static(path.join(__dirname,'../client/build')))


//configure environment variables
require('dotenv').config()

//add body parsing middleware
app.use(exp.json())


//import api's 
const router=require('./APIs/user-api');
const router1=require('./APIs/batch-api');


// path-level middleware
app.use('/user-api',router)
app.use('/batch-api',router1)




app.use((req,res,next)=>
  res.sendFile(path.join(__dirname,'../client/build/index.html'))
)


//error handler 
app.use((err,req,res,next)=>{
    res.send({message:"error occuurred",payload:err.message})
    console.log(err)
})

//asign port number
const PORT=process.env.PORT || 2000;
app.listen(PORT,()=>console.log(`web server listening on port ${PORT}`))