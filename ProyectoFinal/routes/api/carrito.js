var express = require('express')
const { Carrito } = require('../../entities/Carrito')
const { Carritos } = require('../../entities/Carrito');
const { Productos } = require('../../entities/Producto');


const listaCarritos = new Carritos();

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
    const id = req.params.id;
    const carro = carritos.obtenerCarritoPorID();
    carro.agregarProducto(productos.listarProductoPorID(id))
    res.json({
        result: 'Producto Agregado'
    })
})


//Elimina un producto según su ID
routerCarrito.delete('/:id', (req, res) => {
    const id = req.params.id
    const id_prod = req.params.id_prod
    const carro = carritos.obtenerCarritoPorID(id);
    carro.productos.borrarProductoPorID(id_prod);
    res.json({
        result: 'Producto Borrado',
        ID: id
    })
})


module.exports = routerCarrito;