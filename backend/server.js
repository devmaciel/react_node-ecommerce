//Requires
import express from 'express';
import data from './data';
import bodyParser from 'body-parser';

//database
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));


//APP
const app = express();


app.use(bodyParser.json());
app.use("/api/users", userRoute);



//Routes
app.get("/api/products", (req, res) => {

    res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId);

    if(product){
        res.send(product);
    }else{
        res.status(404).send({msg: "Product Not Found"});
    }
});


//Listen
app.listen(8000, () => {console.log("Server started")});