import express from 'express';
import userModel from '../models/userModel';

const router = express.Router();

router.get("/createadmin", async (req, res) => {
    
    try{

        const user = new userModel({
            name: 'jao',
            email: 'jao@teste.com',
            password: '1234',
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(user); 

    }catch(err){
        res.send({msg: error.message});
    }
    

});

export default router;