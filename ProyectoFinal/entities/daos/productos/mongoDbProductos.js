const mongoose = require('mongoose');
const ContenedorMongoDb = require('../../contenedores/ContenedorMongoDb');

const ProductoSchema = mongoose.Schema({
    timestamp:{type: Date, require: true},
    name:{type: String, require: true, max: 100},
    description:{type: String, require: true, max: 100},
    code:{type: String, require: true, max: 100},
    price:{type: Number, require: true},
    stock:{type: Number, require: true},
    thumbnail:{type: String, require: true, max: 100},
})

export default class MongoDbProductos extends ContenedorMongoDb {
  constructor() {
    super('productos',ProductoSchema)
  }
}