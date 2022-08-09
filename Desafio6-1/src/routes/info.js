import express from 'express';

const router = express.Router();

router.get('/info', (req,res) => {
    const info = {
        Directorio: process.cwd(),
        PathEjecucion: process.execPath,
        Argumentos: process.argv,
        Id: process.pid,
        Node_Version: process.version,
        OS: process.platform,
        Memoria: JSON.stringify(process.memoryUsage())
    }
    res.render('info',{info})
})

export default router;