class Producto{
    constructor(id, name, price, thumbnail){
        this.id = id;
        this.name = name;
        this.price = price;
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
        const ids = this.productos.map(x => {return x.id})

        return Math.max(...ids)
    }


}

export {Producto, Productos}