var express = require('express')
const { Producto, listaProductos } = require('../../entities/Producto')



var routerProductos = new express.Router()

//Devuelve todos los productos
routerProductos.get('/', (req, res) => {
    res.json(listaProductos.listarProductos())
})

//Devuelve un producto segun ID
routerProductos.get('/:id', (req, res) => {
    const id = req.params.id
    const prod = listaProductos.listarProductoPorID(id)
    if(prod != null){
        res.json(prod)
    }
    else{
        res.json({error: 'producto no encontrado'})
    }
})

//Recibe y agrega un producto, y lo devuelve con su ID asignado
routerProductos.post('/', (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const code = req.body.code
    const price = req.body.price
    const stock = req.body.stock
    const thumbnail = req.body.thumbnail
    const prod = new Producto(listaProductos.obtenerIDMax()+1,
                            name,
                            description,
                            code,
                            price,
                            stock,
                            thumbnail)
    listaProductos.agregarProducto(prod)
    res.json(listaProductos.listarProductoPorID(listaProductos.obtenerIDMax()))
})

//Recibe y actualiza un producto según su ID
routerProductos.put('/:id', (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const description = req.body.description
    const code = req.body.code
    const price = req.body.price
    const stock = req.body.stock
    const thumbnail = req.body.thumbnail
    let prod = listaProductos.listarProductoPorID(id)
    if(prod != null){
        listaProductos.borrarProductoPorID(id)
        prod = new Producto(id,
                            name,
                            description,
                            code,
                            price,
                            stock,
                            thumbnail)
        listaProductos.agregarProducto(prod)
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
    listaProductos.borrarProductoPorID(id)
    res.json({
        result: 'Borrado',
        ID: id
    })
})


module.exports = routerProductos;
