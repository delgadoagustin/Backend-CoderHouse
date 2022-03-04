const express = require('express')
import { Contenedor } from './contenedor'

const prueba = new Contenedor('texto.txt');



// const app = express()
// const PORT = 8080
// const server = app.listen(PORT, () => {
//     console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
// })
// server.on("error", error => console.log(`Error en servidor ${error}`))

// app.get('/', (solicitud, respuesta) => {
//     respuesta.send({hola: 'mundo!'})
// })