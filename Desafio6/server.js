const express = require('express');
const { options } = require('./options/mariaDB');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const handlebars = require('express-handlebars');
const Clases = require('./Producto');
const path = require('path');
const Repositorio = require('./Repositorio')
//MOCKS
const {faker} = require('@faker-js/faker')

//Cookies y Sessions
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const exp = require('constants');
const { Cookie } = require('express-session');
const advancedOptions = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}





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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Mongo Atlas Session
app.use(session({
    store: MongoStore.create({
        mongoUrl: '',//CLAVE BORRADA
        mongoOptions: advancedOptions
    }),
    secret: 'asdasd',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))


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
    if(!req.session.user){
        res.redirect('/login')
    }
    else{
        res.render('index',{username: req.session.user});
    }
    
});

app.get('/api/productos-test', (req,res) => {
    const productosTest = [];
    for (let index = 0; index < 5; index++) {
        productosTest.push({
            id: index+1,
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.imageUrl()
        })
    }
    res.render('test',{productosTest});
})

// app.get('/api/productos-test', (req,res) => {
//     const productosTest = [];
//     for (let index = 0; index < 5; index++) {
//         productosTest.push({
//             id: index+1,
//             name: faker.commerce.productName(),
//             price: faker.commerce.price(),
//             thumbnail: faker.image.imageUrl()
//         })
//     }
//     products = productosTest;
//     res.render('test');
// })


//Log-In 
app.get('/login', (req,res)=>{
    res.render('login')
})

app.post('/auth', (req,res)=>{
    const username = req.body.username;
    req.session.user = username;
    res.redirect('/');
})

app.get('/logout', (req,res)=>{
    if(!req.session.user){
        res.redirect('/login')
    }
    else{
        const nombre = req.session.user
        req.session.destroy(err => {
            if(!err){
                res.send(`Hasta Luego ${nombre}!!`)
            }
        })
    }
    
})

app.use(express.static("public"))