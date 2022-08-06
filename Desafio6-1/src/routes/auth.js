import express from 'express';
import bcrypt from 'bcrypt';
import usuariosRepo from '../models/usuarios/mongoDbUsuarios.js';

//BCRYPT
async function createHash(password) {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log(error)
    }
}



const router = express.Router();

//INICIO DE SESION
//REGISTRO(VISTA)
router.get('/register',(req,res)=>{
    res.render('register')
})
//REGISTRO(GUARDADO)
router.post('/register',(req,res)=>{
    const {username, password} = req.body;
    usuariosRepo.save({
        email: username,
        password: createHash(password)
    })
    res.redirect('/')
})

//LOGUEO
router.get('/login', (req,res)=>{
    res.render('login')
})

//AUTENTICACION
router.post('/auth', (req,res)=>{
    const {username, password} = req.body;
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