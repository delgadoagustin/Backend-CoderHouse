const express = require('express');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const handlebars = require('express-handlebars');
const Clases = require('./Producto');
const path = require('path');
const Archivo = require('./Archivo');


const Producto = Clases.Producto;
const Productos = Clases.Productos;
const file = new Archivo.Contenedor('mensajes.json')
const productos = new Productos();

let messages = [];
(async ()=>{
    messages = await file.getAll();
})();
console.log(messages);


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
    socket.emit('products',productos)

    socket.on("new-message", (data) => {
        messages.push(data);
        file.save(data);
        io.sockets.emit("messages", messages);
      });

    socket.on('new-product', (data)=>{
        const prod = new Producto(productos.obtenerIDMax()+1,data.title,data.price,data.thumbnail);
        productos.agregarProducto(prod);
        io.sockets.emit("products",productos);
    });
})

app.get('/', (req, res) => {

    res.render('index');

});

app.use(express.static("public"))