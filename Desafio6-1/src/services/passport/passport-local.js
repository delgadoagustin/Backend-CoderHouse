import { Strategy as LocalStrategy } from "passport-local";
import passport, { use } from "passport";
import usuariosRepo from "./../../models/usuarios/mongoDbUsuarios.js"


passport.use(new LocalStrategy(
    function(username, password, done) {
        usuariosRepo.collection.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            //if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser((id,done)=>{
    usuariosRepo.collection.findById(id,done);
})

export default passport;