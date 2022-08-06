import {Strategy as LocalStrategy} from "passport-local";
import usuariosRepo from '../models/usuarios/mongoDbUsuarios.js';

export default strategy = (new LocalStrategy(
    async(username,password,done) => {
        usuariosRepo.existObject({
            email: username,
            password: password
        })
        return done(null,{username,password});
    }
))