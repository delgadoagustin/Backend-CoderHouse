import mongoose from "mongoose";
import { ContenedorMongoDb } from "../../database/mongoDb.js";

const usuarioSchema = new mongoose.Schema({
    email:{type: String, require:true, max: 50},
    password:{type: String, require:true, max: 50}
})

class MongoDbUsuarios extends ContenedorMongoDb{
    constructor(){
        super('usuarios',usuarioSchema)
    }
}

const usuariosRepo = new MongoDbUsuarios();

export default usuariosRepo