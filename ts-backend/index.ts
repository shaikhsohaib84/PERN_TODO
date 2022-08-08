import express from 'express';
import cors from 'cors';
import db from './models';
import {routes} from './src/routes';

const app = express()

// MIDDLEWARE

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json()); //For cors

const port = process.env.PORT || 5000

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Express JS running')
        routes(app)
    })
})