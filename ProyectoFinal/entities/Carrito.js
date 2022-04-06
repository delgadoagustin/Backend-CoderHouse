const { Contenedor } = require("./Archivo");
const { Productos } = require("./Producto");


class Carrito{
    constructor(id){
        this.id = id;
        this.timestamp = Date.now();
        this.productos = [];
    }

    agregarProducto(producto){
        this.productos.push(producto);
    }

    listarProductos(){
        return this.productos;
    }

    borrarProductoPorID(id){
        const indice = this.productos.findIndex(x => x.id == id)
        if(indice!=-1){
            this.productos.splice(indice,1);
        }
    }
}

class Carritos{
    constructor(){
        this.carritos = new Contenedor('Carritos.json');
    }

    agregarCarrito(carrito){
        this.carritos.save(carrito)
    }

    listarCarrito(){
        let lista = this.carritos.getAll();
        return lista;
    }

    listarCarritoPorID(id){
        let lista = this.carritos.getAll();
        return lista.find(x => x.id == id)
    }

    borrarCarritoPorID(id){
        this.carritos.deleteById(id)
    }

    obtenerIDMax(){
        let lista = this.carritos.getAll();
        if(lista.length==0){
            return 0;
        }
        const ids = lista.map(x => {return x.id})
        return Math.max(...ids)
    }
}

const listaCarritos = new Carritos();

module.exports.Carrito = Carrito;
module.exports.Carritos = Carritos;
module.exports.listaCarritos = listaCarritos