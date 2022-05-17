var express = require('express')
const { Carrito, listaCarritos } = require('../../entities/Carrito');
const { listaProductos } = require('../../entities/Producto');
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

var routerCarrito = new express.Router()

//Crea un carrito y devuelve el id

routerCarrito.get('/',async(req,res)=>{
    res.json(await carritoApi.getAll()) 
})

routerCarrito.get('/:id',async(req,res)=>{
    const id = req.params.id;
    res.json(await carritoApi.getById(id)); 
})

routerCarrito.post('/',checkAdmin,async (req, res) => {
    const carrito = new Carrito(0);
    nuevo = await carritoApi.save(carrito);
    res.json(nuevo);

})

//Elimina el carrito
routerCarrito.delete('/:id',checkAdmin, (req, res) => {
    const id = req.params.id;
    carritoApi.deleteById(id);

    res.json({
        result: 'Borrado',
        ID: id
    })
})

//Devuelve el listado de los productos en el carrito
routerCarrito.get('/:id/productos', (req, res) => {
    const id = req.params.id
    const carro = carritoApi.getById(id);
    if(carro != null){
        res.json(carro.productos)
    }
    else{
        res.json({error: 'Carrito No encontrado'})
    }
})

//Agrega un producto al carrito por id
routerCarrito.post('/:id/productos',checkAdmin, async (req, res) => {
    const id = req.params.id;
    const id_prod = req.body.id_prod;

    const carro = await carritoApi.getById(id);
    const producto = await productosApi.getById(id_prod);

    carro.productos.push(producto);

    await carritoApi.updateById(id,carro)
    res.json({
        carro,
        result: 'Producto Agregado'
    })
})


//Elimina un producto según su ID
routerCarrito.delete('/:id/productos/:id_prod',checkAdmin, async (req, res) => {
    const id = req.params.id
    const id_prod = req.params.id_prod

    
    const carro = await carritoApi.getById(id);
    const indice = carro.productos.findIndex(x => x.id==id)
    carro.productos.splice(indice,1)

    await carritoApi.updateById(id,carro)

    res.json({
        result: 'Producto Borrado',
        ID: id,
        carro
    })
})


module.exports = routerCarrito;