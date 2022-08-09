import express from 'express';
import middlewares from '../middlewares/middlewares.js';

const router = express.Router();

router.get('/',middlewares.checkAuthenticated, (req, res) => {
    res.render('index',{username: req.user.email});
    // if(!req.user){
    //     res.redirect('/login')
    // }
    // else{
    //     res.render('index',{username: req.user.email});
    // }
});

export default router;