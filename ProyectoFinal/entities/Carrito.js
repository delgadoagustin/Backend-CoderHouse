const { Productos } = require("./Producto");
const { Producto } = require("./Producto");


class Carrito{
    constructor(id){
        this.id = id;
        this.timestamp = Date.now();
        this.productos = new Productos();
    }

    agregarProducto(producto){
        this.productos.agregarProducto(producto);
    }

    listarProductos(){
        return this.productos;
    }

    borrarProductoPorID(id){
        this.productos.borrarProductoPorID(id);
    }
}

class Carritos{
    constructor(){
        this.carritos = []
    }

    agregarCarrito(carrito){
        this.carritos.push(carrito)
    }

    listarCarrito(){
        return this.carritos
    }

    listarCarritoPorID(id){
        return this.carritos.find(x => x.id == id)
    }

    borrarCarritoPorID(id){
        const indice = this.carritos.findIndex(x => x.id == id)
        this.carritos.splice(indice,1)
    }

    obtenerIDMax(){
        if(this.carritos.length==0){
            return 0;
        }
        const ids = this.carritos.map(x => {return x.id})
        return Math.max(...ids)
    }
}



module.exports.Carrito = Carrito;
module.exports.Carritos = Carritos;