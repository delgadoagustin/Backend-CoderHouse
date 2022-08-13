//IMPORT
import config from './config.js';

import minimist from 'minimist';
const defaultArgs = { default: {puerto: 8080}}
let puerto = minimist(process.argv.slice(2),defaultArgs).puerto

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
import infoRouter from './src/routes/info.js'
import apinbRouter from './src/routes/api-nb.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';


import { Repositorio } from './src/database/repositorio.js';
import { options } from './src/options/mariaDB.js';

import passport from './src/services/passport/passport-local.js';

//CLUSTER------------------
import cluster from 'cluster';
import os from "os"

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`)
    console.log(numCPUs)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork({port: puerto+i});
    }
}
else{
    puerto++;
    console.log(`Worker ${process.pid} started`)
}
//END CLUSTEr--------------------


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//INITIALIZE
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//////////////////////////////////////////////////////////////////

const productos = new Repositorio(options,'productos');
const mensajes = new Repositorio(options,'mensajes');

let products = productos.getAll();
let messages = mensajes.getAll();
//////////////////////////////////////////////////////////////////

server.listen(puerto, ()=>{
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//SESSION
const advancedOptions = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoURL,
        mongoOptions: advancedOptions
    }),
    secret: 'asdasd',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

//PASSPORT

app.use(passport.initialize());
app.use(passport.session());

//TEMPLATES
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    layoutsDir: __dirname + '/src/views/layout'
}));
app.set('view engine','hbs');
app.set('views',path.resolve(__dirname,'./src/views'));


//SOCKET (REORDENAR)
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

app.use('/api', apiRouter);
app.use( authRouter );
app.use( productRouter )
app.use( infoRouter )
app.use( apinbRouter)