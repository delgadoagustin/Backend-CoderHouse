const { Contenedor } = require("./Archivo");

class Producto{
    constructor(id, name, description, code, price, stock, thumbnail){
        this.id = id;
        this.timestamp = Date.now();
        this.name = name;
        this.description = description;
        this.code = code;
        this.price = price;
        this.stock = stock;
        this.thumbnail = thumbnail;
    }
}

class Productos{
    constructor(){
        this.productos = new Contenedor('Productos.json')
    }

    agregarProducto(producto){
        this.productos.save(producto);
    }

    listarProductos(){
        return this.productos.getAll();
    }

    listarProductoPorID(id){
        return this.productos.getAll().find(x => x.id == id)
    }

    borrarProductoPorID(id){
        this.productos.deleteById(id);
    }

    obtenerIDMax(){
        const lista =this.productos.getAll();
        if(lista.length==0){
            return 0;
        }
        const ids = lista.map(x => {return x.id})
        return Math.max(...ids)
    }
}

const listaProductos = new Productos();

module.exports.Producto = Producto;
module.exports.Productos = Productos;
module.exports.listaProductos = listaProductos;