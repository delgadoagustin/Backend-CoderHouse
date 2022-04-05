const Carrito = require('../entities/Carrito')
var express = require('express')

var routerProductos = new express.Router()

//Devuelve todos los productos
routerProductos.get('/', (req, res) => {
    res.json(productos.listarProductos())
})

//Devuelve un producto segun ID
routerProductos.get('/:id', (req, res) => {
    const id = req.params.id
    const prod = productos.listarProductoPorID(id)
    if(prod != null){
        res.json(prod)
    }
    else{
        res.json({error: 'producto no encontrado'})
    }
})

//Recibe y agrega un producto, y lo devuelve con su ID asignado
routerProductos.post('/', (req, res) => {
    const title = req.body.title
    const price = req.body.price
    const thumbnail = req.body.thumbnail
    const prod = new Producto(productos.obtenerIDMax()+1,title,price,thumbnail)
    productos.agregarProducto(prod)
    res.json(productos.listarProductoPorID(productos.obtenerIDMax()))
})

//Recibe y actualiza un producto según su ID
routerProductos.put('/:id', (req, res) => {
    const id = req.params.id
    const title = req.body.title
    const price = req.body.price
    const thumbnail = req.body.thumbnail
    let prod = productos.listarProductoPorID(id)
    if(prod != null){
        productos.borrarProductoPorID(id)
        prod = new Producto(id,title,price,thumbnail)
        productos.agregarProducto(prod)
        res.json({
            result: 'Actualizado',
            producto: prod,
            ID: id
        })
    }
    else{
        res.json({error: 'producto no encontrado'})
    }
})

//Elimina un producto según su ID
routerProductos.delete('/:id', (req, res) => {
    const id = req.params.id
    productos.borrarProductoPorID(id)
    res.json({
        result: 'Borrado',
        ID: id
    })
})


module.exports = routerProductos;
