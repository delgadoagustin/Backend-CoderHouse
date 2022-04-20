const express = require('express');
const { options } = require('./options/mariaDB');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const handlebars = require('express-handlebars');
const Clases = require('./Producto');
const path = require('path');
const Repositorio = require('./Repositorio')
//const Archivo = require('./Archivo');


const Producto = Clases.Producto;
// const Productos = Clases.Productos;
// const productos = new Productos();
const productos = new Repositorio.Repositorio(options,'productos');
const mensajes = new Repositorio.Repositorio(options,'mensajes');

let products = productos.getAll();
let messages = mensajes.getAll();


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    layoutsDir: __dirname + '/public/views/layout'
}))
app.set('view engine','hbs')
app.set('views',path.resolve(__dirname,'./public/views'))

httpServer.listen(8080, ()=>{
    console.log("Servidor corriendo en http://localhost:8080");
})

io.on('connection', socket=>{
    console.log('Un cliente se ha conectado');
    socket.emit('messages',messages)
    socket.emit('products',products)

    socket.on("new-message", (data) => {
        messages.push(data);
        mensajes.save(data);
        io.sockets.emit("messages", messages);
      });

    socket.on('new-product', (data)=>{
        productos.save(data);
        products.push(data);
        io.sockets.emit("products",products);
    });
})

app.get('/', (req, res) => {

    res.render('index');

});

app.use(express.static("public"))