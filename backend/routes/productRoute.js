import express from 'express';
import Product from '../models/productModel';
import { getToken } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {

    //send list of products to the user
    const products = await Product.find({});
    res.send(products);

});


router.post('/', async (req, res) => {
    
    //crete product
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews
    });

    const newProduct = await product.save();
    
    //created sucess
    if(newProduct){
        return res.status(201).send({message: "New Product created", data: newProduct });
    }

    //if error
    return res.status(500).send({message: 'Error in creating product'});

});

router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await product.findOne({_id: productId});

    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        const updateProduct = await product.save();

        //update
        if(updateProduct){
            return res.status(201).send({message: "Product Update", data: updateProduct });
        }

        //if error
        return res.status(500).send({message: 'Error in updating product'});
    }
});

export default router;