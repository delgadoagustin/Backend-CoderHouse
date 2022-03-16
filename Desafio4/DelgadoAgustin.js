const express = require('express')
const {Router} = express
const Clases = require('./Producto')

const Producto = Clases.Producto
const Productos = Clases.Productos

//LISTA DE PRODUCTOS
const productos = new Productos()

//Productos de Prueba
const productoPrueba1 = new Producto(0,'producto 1',20,'')
const productoPrueba2 = new Producto(1,'producto 2',30,'')
const productoPrueba3 = new Producto(2,'producto 3',17,'')

productos.agregarProducto(productoPrueba1)
productos.agregarProducto(productoPrueba2)
productos.agregarProducto(productoPrueba3)

const app = express()
const router = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`))

app.use('/static', express.static(__dirname + '/public'));


//Devuelve todos los productos
router.get('/', (req, res) => {
    res.send(productos.listarProductos())
})

//Devuelve un producto segun ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    const prod = productos.listarProductoPorID(id)
    if(prod != null){
        res.send(prod)
    }
    else{
        res.send({error: 'producto no encontrado'})
    }
})

//Recibe y agrega un producto, y lo devuelve con su ID asignado
router.post('/', (req, res) => {
    const title = req.body.title
    const price = req.body.price
    const thumbnail = req.body.thumbnail
    const prod = new Producto(productos.obtenerIDMax()+1,title,price,thumbnail)
    productos.agregarProducto(prod)
    res.send(productos.listarProductoPorID(productos.obtenerIDMax()))
})

//Recibe y actualiza un producto según su ID
router.put('/:id', (req, res) => {
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
        res.send({error: 'producto no encontrado'})
    }
})

//Elimina un producto según su ID
router.delete('/:id', (req, res) => {
    const id = req.params.id
    productos.borrarProductoPorID(id)
    res.json({
        result: 'Borrado',
        ID: id
    })
})

app.use('/api/productos',router)