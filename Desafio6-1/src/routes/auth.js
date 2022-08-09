import express from 'express';
import bcrypt from "./../services/bcrypt/bcrypt.js"
import bcrypt_functions from "./../services/bcrypt/bcrypt.js"
import usuariosRepo from '../models/usuarios/mongoDbUsuarios.js';
import passport from './../services/passport/passport-local.js'

//BCRYPT
// async function createHash(password) {
//     const saltRounds = 10;
//     try {
//         const salt = await bcrypt.genSalt(saltRounds);
//         const hash = await bcrypt.hash(password, salt);
//         return hash;
//     } catch (error) {
//         console.log(error)
//     }
// }



const router = express.Router();

//INICIO DE SESION
//REGISTRO(VISTA)
router.get('/register',(req,res)=>{
    res.render('register')
})
//REGISTRO(GUARDADO)
router.post('/register',async (req,res)=>{
    const {username, password} = req.body;
    if(await usuariosRepo.collection.exists({email:username})){
        res.redirect("/register-error")
    }
    else{
        usuariosRepo.save({
            email: username,
            password: await bcrypt_functions.createHash(password)
        })
        res.redirect('/')
    }
    
})

//LOGUEO
router.get('/login', (req,res)=>{
    res.render('login')
})

//ERROR
router.get('/login-error',(req,res)=>{
    res.render("login-error")
})
router.get('/register-error',(req,res)=>{
    res.render("register-error")
})

//AUTENTICACION
router.post('/auth',passport.authenticate('login',{
    failureRedirect: '/login-error',
}), (req,res)=>{
    const {username, password} = req.body;
    req.session.user = username;
    res.redirect('/');
})

router.get('/logout', (req,res)=>{
    if(!req.user){
        res.redirect('/login')
    }
    else{
        const nombre = req.user.email
        req.logOut((err)=>{
            if(err) {
                return next(err)
            }
            res.send(`Hasta Luego ${nombre}!!`)
        })
    }
})

export default router;