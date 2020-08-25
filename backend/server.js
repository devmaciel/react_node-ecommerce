//Requires
import express from 'express';
import data from './data';

//APP
const app = express();


//Routes
app.get("/api/products", (req, res) => {

    res.send(data.products);
});


//Listen
app.listen(8000, () => {console.log("Server started")});