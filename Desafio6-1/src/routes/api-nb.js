import express from 'express';
import { fork } from 'child_process'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const router = express.Router();


function getRandomInt() {
    return Math.floor(Math.random() * 1000);
}

function cuenta(cant){
    const cuenta = {}
    for (let index = 0; index < cant; index++) {
        const num = getRandomInt(cant)
        cuenta[num] = cuenta[num] ? cuenta[num]+1 : 1;
    }
    return cuenta;
}

router.get('/api/randoms',(req,res)=>{
    const cant = req.query.cant || 100000000;
    const child = fork(__filename)
    child.send(cant);
    child.on("message",(message)=>{
        console.log(message);
        res.json(message)
    })
})

process.on("message", (message) => {
    console.log(message);
    cuenta = cuenta(message);
    process.send(cuenta);
})

export default router;