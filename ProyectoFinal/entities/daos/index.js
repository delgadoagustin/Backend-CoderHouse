const MongoDbProductos = require('./productos/mongoDbProductos')
const FirebaseProductos = require("./productos/firebaseProductos")
const MongoDbCarritos = require('./carritos/mongoDbCarritos')
const FirebaseCarritos = require('./carritos/firebaseCarritos')
const config = require('./../../config')

let productosApi
let carritoApi

switch (config.db) {
    case 'mongodb':
        productosApi = new MongoDbProductos()
        carritoApi = new MongoDbCarritos()
        break;
    case 'firebase':
        productosApi = new FirebaseProductos()
        carritoApi = new FirebaseCarritos();
        break;
    default:
        break;
}

module.exports.productosApi = productosApi;
module.exports.carritoApi = carritoApi;
