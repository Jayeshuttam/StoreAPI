require('dotenv').config()
require('express-async-errors')


const express = require('express')
const app = express()


const connectDB = require('./db/connect')
const productsRouter =require('./routes/products')



const notFoundMiddleware =require('./middleware/not-found')
const errorMiddleware =require('./middleware/error-handler')

//middleWare

app.use(express.json())

//routes



//products route
app.use('/api/v1/products',productsRouter)


app.use(notFoundMiddleware)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000
const start = async ()=>{
    try{

        //connect DB
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT , console.log(`Server is listening port ${PORT}... `))
    }catch(err){
    console.log(err)
    }
}

start()