import express  from "express";
import cors from 'cors'
import { PORT , mongoDBURL} from "./config.js";
import mongoose from 'mongoose'
import booksRoute from './routes/booksRoute.js'

const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000',
//     method : ['GET','POST','PUT','DELETE'],
//     allowedHeaders : ['Content-Type'],
// }));


app.use('/books', booksRoute);

app.get('/', (req, res) =>{
    
    res.send("<h1> Listening  </h1>")
});

mongoose
.connect(mongoDBURL)
.then((client) =>{
    console.log('App connected to db');
    app.listen(PORT, ()=>{
        console.log("listening at port",PORT);
    })
})
