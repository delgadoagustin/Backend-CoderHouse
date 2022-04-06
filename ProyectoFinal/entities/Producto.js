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
        this.productos = []
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
        if(this.productos.length==0){
            return 0;
        }
        const ids = this.productos.map(x => {return x.id})
        return Math.max(...ids)
    }
}

module.exports.Producto = Producto;
module.exports.Productos = Productos;