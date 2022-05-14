var express = require('express')
const { Carrito, listaCarritos } = require('../../entities/Carrito');
const { listaProductos } = require('../../entities/Producto');
const { productosApi, carritoApi } = require('../../entities/daos');


var routerCarrito = new express.Router()

//Crea un carrito y devuelve el id
routerCarrito.post('/',(req, res) => {
    const carro = new Carrito(listaCarritos.obtenerIDMax()+1);
    listaCarritos.agregarCarrito(carro);
    res.json(carro.id);
})

//Elimina el carrito
routerCarrito.delete('/:id', (req, res) => {
    const id = req.params.id;
    listaCarritos.borrarCarritoPorID(id);
    res.json({
        result: 'Borrado',
        ID: id
    })
})

//Devuelve el listado de los productos en el carrito
routerCarrito.get('/:id/productos', (req, res) => {
    const id = req.params.id
    const carro = listaCarritos.listarCarritoPorID(id);
    if(carro != null){
        res.json(carro.listarProductos())
    }
    else{
        res.json({error: 'Carrito No encontrado'})
    }
})

//Agrega un producto al carrito por id
routerCarrito.post('/:id/productos',(req, res) => {
    const id = parseInt(req.params.id);
    const id_prod = req.body.id_prod;
    const carro = listaCarritos.listarCarritoPorID(id);
    const nuevo = new Carrito(id)
    nuevo.agregarProductos(carro.productos)
    nuevo.agregarProducto(listaProductos.listarProductoPorID(id_prod))
    
    listaCarritos.borrarCarritoPorID(id);
    listaCarritos.agregarCarrito(nuevo);
    res.json({
        result: 'Producto Agregado'
    })
})


//Elimina un producto según su ID
routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
    const id = req.params.id
    const id_prod = req.params.id_prod
    const carro = listaCarritos.listarCarritoPorID(id);
    const nuevo = new Carrito(id)
    nuevo.agregarProductos(carro.productos)
    nuevo.borrarProductoPorID(id_prod)

    listaCarritos.borrarCarritoPorID(id);
    listaCarritos.agregarCarrito(nuevo);
    res.json({
        result: 'Producto Borrado',
        ID: id
    })
})


module.exports = routerCarrito;