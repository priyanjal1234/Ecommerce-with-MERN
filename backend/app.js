const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

// Database Connection
const db = require('./config/db')
db()

// Routes
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const productRouter = require('./routes/productRouter')
const cartRouter = require('./routes/cartRouter')
const orderRouter = require('./routes/orderRouter')
const paymentRouter = require('./routes/paymentRouter')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use("/api/users",userRouter)

app.use("/api/admin",adminRouter)

app.use("/api/products",productRouter)

app.use("/api/cart",cartRouter)

app.use("/api/orders",orderRouter)

app.use("/api/payment",paymentRouter)


const PORT = process.env.PORT || 4000
app.listen(PORT,function() {
    console.log(`Server is running on port ${PORT}`)
})
