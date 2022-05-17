const ContenedorMongoDb = require('../../contenedores/ContenedorMongoDb');
const mongoose = require('mongoose');

//-------
//COPIA DE PRODUCTOSCHEMA PARA ARRAY DE PRODUCTOS EN CARRITO
//ENCAPSULAR
const ProductoSchema = mongoose.Schema({
    timestamp:{type: Date, require: true},
    name:{type: String, require: true, max: 100},
    description:{type: String, require: true, max: 100},
    code:{type: String, require: true, max: 100},
    price:{type: Number, require: true},
    stock:{type: Number, require: true},
    thumbnail:{type: String, require: true, max: 100},
})
//---------

const CarritoSchema = mongoose.Schema({
    timestamp :{type: Date, require: true},
    productos: [ProductoSchema]
})

class MongoDbCarritos extends ContenedorMongoDb {
  constructor() {
    super('carritos',CarritoSchema)
  }
}

module.exports = MongoDbCarritos