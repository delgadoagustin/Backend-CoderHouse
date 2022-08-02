//IMPORT
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import path from 'path';
import handlebars from 'express-handlebars'

import apiRouter from './src/routes/api.js';
import authRouter from './src/routes/auth.js';
import productRouter from './src/routes/productos.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//INITIALIZE
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const advancedOptions = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}

server.listen(8080, ()=>{
    console.log("Servidor corriendo en http://localhost:8080");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/api', apiRouter);
app.use(authRouter);
app.use(productRouter)

//SESSION
// app.use(session({
//     store: MongoStore.create({
//         mongoUrl: '',//CLAVE BORRADA
//         mongoOptions: advancedOptions
//     }),
//     secret: 'asdasd',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 600000
//     }
// }));

//VIEW
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    layoutsDir: __dirname + '/public/views/layout'
}));
app.set('view engine','hbs');
app.set('views',path.resolve(__dirname,'./public/views'));


//SOCKET (MOVER)
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
