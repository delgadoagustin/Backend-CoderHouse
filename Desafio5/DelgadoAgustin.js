const express = require('express')
const Clases = require('./Producto')
const {Router} = express
//const routerProductos = require('./routes/api/productos')
const handlebars = require('express-handlebars')

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

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layout',
    partialsDir: __dirname + '/views/partials'
}))

app.set('view engine','hbs')
app.set('views','./views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`))

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {

    lista = productos.listarProductos();

    res.render('1', {lista});
});


//app.use('/api/productos',routerProductos)