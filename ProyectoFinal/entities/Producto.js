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

module.exports = Producto;
