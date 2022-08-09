import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import usuariosRepo from "./../../models/usuarios/mongoDbUsuarios.js"
import bcrypt_functions from "./../bcrypt/bcrypt.js"
import bcrypt from "bcrypt"


passport.use('login',new LocalStrategy(
    function(username, password, done) {
        console.log
        usuariosRepo.collection.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return bcrypt.compare(password,user.password,()=>{
                if(err){
                    return done(null,false)
                }
                return done(null,user)
            })
        });
    }
));

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    usuariosRepo.collection.findById(id,(err,user)=>{
        done(err,user);
    });
})

export default passport;