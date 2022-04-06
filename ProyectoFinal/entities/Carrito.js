const { Contenedor } = require("./Archivo");
const { Productos } = require("./Producto");


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
        this.carritos = new Contenedor('Carritos.json');
    }

    agregarCarrito(carrito){
        this.carritos.save(carrito)
    }

    listarCarrito(){
        let lista = [];
        (async ()=>{
            lista = await this.carritos.getAll();
        })();
        return lista;
    }

    listarCarritoPorID(id){
        let lista = [];
        (async ()=>{
            lista = await this.carritos.getAll();
        })();
        return lista.find(x => x.id == id)
    }

    borrarCarritoPorID(id){
        let lista = [];
        (async ()=>{
            lista = await this.carritos.getAll();
        })();
        const indice = lista.findIndex(x => x.id == id)
        lista.splice(indice,1)
    }

    obtenerIDMax(){
        let lista = [];
        let ids = 0;
        (async ()=>{
            lista = await this.carritos.getAll();
            if(lista.length==0){
                return 0;
            }
            ids = lista.map(x => {return x.id})
        })();
        // if(lista.length==0){
        //     return 0;
        // }
        // ids = lista.map(x => {return x.id})
        return Math.max(...ids)
    }
}



module.exports.Carrito = Carrito;
module.exports.Carritos = Carritos;