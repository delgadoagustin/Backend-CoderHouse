var express = require('express')
const { Producto, listaProductos } = require('../../entities/Producto')
const { productosApi, carritoApi } = require('../../entities/daos');

const admin = true;

const checkAdmin = (req, res, next) => {
    if (admin) {
        return next()
    }
    else {
        res.status(403).json({message: 'Can\'t Access this route '})
    }
}

var routerProductos = new express.Router()

//Devuelve todos los productos
routerProductos.get('/', async (req, res) => {
    const productos = await productosApi.getAll();
    res.json(productos);
})

//Devuelve un producto segun ID
routerProductos.get('/:id', async(req, res) => {
    const id = req.params.id
    //const doc = listaProductos.listarProductoPorID(id)
    const doc = await productosApi.getById(id)
    if(doc != null){
        res.json(doc)
    }
    else{
        res.json({error: 'producto no encontrado'})
    }
})

//Recibe y agrega un producto, y lo devuelve con su ID asignado
routerProductos.post('/',checkAdmin, async (req, res) => {
    const prod = new Producto(
        0,
        req.body.name,
        req.body.description,
        req.body.code,
        req.body.price,
        req.body.stock,
        req.body.thumbnail
        );
    nuevo = await productosApi.save(prod);
    res.json(nuevo)
})

//Recibe y actualiza un producto según su ID
routerProductos.put('/:id', checkAdmin,(req, res) => {
    const id = req.params.id;
    if(productosApi.exist(id)){
        prod = new Producto(
            id,
            req.body.name,
            req.body.description,
            req.body.code,
            req.body.price,
            req.body.stock,
            req.body.stock
            );
        productosApi.updateById(id,prod);
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
routerProductos.delete('/:id',checkAdmin, (req, res) => {
    const id = req.params.id
    productosApi.deleteById(id);
    res.json({
        result: 'Borrado',
        ID: id
    })
})


module.exports = routerProductos;
