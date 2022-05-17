var express = require('express')
const { Producto, listaProductos } = require('../../entities/Producto')
const { productosApi, carritoApi } = require('../../entities/daos');

// const admin = false;

// const middleware = {
//     ingreso : function(){
//         if(admin) return next();
//         res.redirect('/')
//     }
// }

var routerProductos = new express.Router()

//Devuelve todos los productos
routerProductos.get('/', async (req, res) => {
    const productos = await productosApi.getAll();
    res.json(productos);
    //res.json(listaProductos.listarProductos())
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
routerProductos.post('/', async (req, res) => {
    const id = listaProductos.obtenerIDMax()+1;
    const prod = new Producto(
        id,
        req.body.name,
        req.body.description,
        req.body.code,
        req.body.price,
        req.body.stock,
        req.body.thumbnail
        );
    productosApi.save(prod);
    let all = await productosApi.getAll()
    res.json(all)
    //listaProductos.agregarProducto(prod)
    //res.json(listaProductos.listarProductoPorID(id))
})

//Recibe y actualiza un producto según su ID
routerProductos.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let prod = listaProductos.listarProductoPorID(id)
    if(prod != null){
        listaProductos.borrarProductoPorID(id)
        prod = new Producto(
            id,
            req.body.name,
            req.body.description,
            req.body.code,
            req.body.price,
            req.body.stock,
            req.body.stock
            );
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
    // listaProductos.borrarProductoPorID(id)
    productosApi.deleteById(id);
    res.json({
        result: 'Borrado',
        ID: id
    })
})


module.exports = routerProductos;
