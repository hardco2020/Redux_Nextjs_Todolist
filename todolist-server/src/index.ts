import express from 'express'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { Step } from './entities/step'
import { User } from './entities/user'
import { TodoItem } from './entities/TodoItem'
import { Category } from './entities/category'
import { userRouter } from './routes/user_route'
import { todoRouter } from './routes/todo_route'
import { categoryRouter } from './routes/category_route'
import { stepRouter } from './routes/step_router'
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'

const main = async()=>{ 
    try{
        require('dotenv').config()
        await createConnection({
            type:"postgres",
            host: process.env.SERVER_IP,
            port:5432,
            database: process.env.DATABASE,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            logging:true,
            synchronize:true,
            entities:[Step,User,TodoItem,Category]
        })
        
        
        console.log('Connected to postgres')
    }catch(error){
        console.log(error)
        console.error('Unable to connect to posgres')
    }
    const app = express()
    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient({
        port:6379,
        host: process.env.SERVER_IP
    })
    app.use(express.json()) //use it on the route that need 
    app.use(cors());
    app.use(
            session({
                name: "UserCookie",
                store: new RedisStore({  //ttl: how long it should last
                    client: redisClient, 
                    //disableTTL :true, //make sure session last forever
                    //disableTouch: true, // make sure it does'nt have to update the last time it's ttl
                }),
                // cookie:{
                //     maxAge: 1000*60*60*24*365*10, //10 years
                //     path: "/",
                //     //httpOnly:true, //javascript front end can't access
                //     sameSite:'none', // csrf
                //     //secure: __prod__ //cookie only works in https
                // },
                saveUninitialized:false, //automatically create a empty session on default
                secret: 'some secret', //env
                resave: false,
            }) 
        )
    //------------Route
    app.use(userRouter)
    app.use(todoRouter)
    app.use(categoryRouter)
    app.use(stepRouter)
    app.listen(3001,()=>{
        console.log("server will be started port")
    })


    //routing control
}

main().catch( (err)=> { 
    console.error(err); 
});
