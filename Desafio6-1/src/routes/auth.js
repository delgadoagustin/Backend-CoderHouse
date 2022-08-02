import express from 'express';

const router = express.Router();

router.get('/login', (req,res)=>{
    res.render('login')
})

router.post('/auth', (req,res)=>{
    const username = req.body.username;
    req.session.user = username;
    res.redirect('/');
})

router.get('/logout', (req,res)=>{
    if(!req.session.user){
        res.redirect('/login')
    }
    else{
        const nombre = req.session.user
        req.session.destroy(err => {
            if(!err){
                res.send(`Hasta Luego ${nombre}!!`)
            }
        })
    }
})

export default router;