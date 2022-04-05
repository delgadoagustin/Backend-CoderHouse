const Producto = require('./Producto');

class Carrito{
    constructor(id){
        this.id = id;
        this.timestamp = Date.now();
        this.productos = [];
    }

    agregarProducto(producto){

        this.productos.push(producto)
    }

    listarProductos(){
        return this.productos
    }

    listarProductoPorID(id){
        return this.productos.find(x => x.id == id)
    }

    borrarProductoPorID(id){
        const indice = this.productos.findIndex(x => x.id == id)
        this.productos.splice(indice,1)
    }

    obtenerIDMax(){
        const ids = this.productos.map(x => {return x.id})
        return Math.max(...ids)
    }
}

module.exports = Carrito