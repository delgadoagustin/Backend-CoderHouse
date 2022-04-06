const routerProductos = require('./routes/api/productos')
const routerCarrito = require('./routes/api/carrito');
const express = require('express');


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
 })
server.on("error", error => console.log(`Error en servidor ${error}`));



app.use('/api/productos',routerProductos);
app.use('/api/carrito',routerCarrito);