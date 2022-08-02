import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    if(!req.session.user){
        res.redirect('/login')
    }
    else{
        res.render('index',{username: req.session.user});
    }
});

export default router;


