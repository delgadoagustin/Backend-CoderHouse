const MongoDbProductos = require('./productos/mongoDbProductos')
const FirebaseProductos = require("./productos/firebaseProductos")
const MongoDbCarritos = require('./carritos/mongoDbCarritos')
const FirebaseCarritos = require('./carritos/firebaseCarritos')

let productosApi = new MongoDbProductos()
let carritoApi = new MongoDbCarritos()

module.exports.productosApi = productosApi;
module.exports.carritoApi = carritoApi;
