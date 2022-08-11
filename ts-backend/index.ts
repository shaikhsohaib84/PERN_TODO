import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import db from './models';
import route  from './src/routes/index'

require('dotenv').config()

const app = express()

// MIDDLEWARE

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true
};
app.use(cors(options));

app.use(express.json()); //For cors
// app.use(cookieParser(process.env.SECRET_KEY))
app.use(cookieParser())

app.use('/', route)
// app.use('/auth', authRouter)

const port = process.env.PORT || 5000

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Express JS running')
    })
})