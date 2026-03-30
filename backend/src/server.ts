import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ShopsRouter from './routers/shopRoute'
import ProductRoute from './routers/productRoute'
import OrderRoute from './routers/orderRouter'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()


const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())


app.use('/api/shops', ShopsRouter)
app.use('/api/products', ProductRoute)
app.use('/api/orders', OrderRoute)


app.use(errorHandler)

app.listen(PORT, ()=> {
   console.log(`Server is running on http://localhost:${PORT}`);
})