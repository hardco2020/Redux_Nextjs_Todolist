import express from 'express'

const app = express()
app.use(express.json()) //use it on the route that need 

app.listen(3000,()=>{
    console.log("server will be started at")
})


//routing control

app.get('/products',(_,res)=>{
    res.send("hello world")
})

console.log("hello world")