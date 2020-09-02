import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';

const router = express.Router();

//router pra register
router.post('/register', async (req, res) => {
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const newUser = await User.save();

    if(newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        });
    } else {
        res.status(401).send({msg: 'Invalid User Data'});
    }
})


//router pra sign
router.post('/signin', async (req, res) => {

    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(User)
        });
    } else {
        res.status(401).send({msg: 'Invalid Email or Password'});
    }
})


//router cria static banco de dados
router.get("/createadmin", async (req, res) => {
    
    try{

        const user = new userModel({
            name: 'jao',
            email: 'jaoo@teste.com',
            password: '1234',
            isAdmin: true
        });
    
        const newUser = await User.save();
        res.send(newUser); 

    }catch(err){
        res.send({msg: err.message});
    }
    

});

export default router;