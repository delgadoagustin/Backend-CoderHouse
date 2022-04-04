const fs = require('fs');

class Contenedor{
    constructor(nombreArchivo){
        if(fs.existsSync('./'+nombreArchivo)){
            this.nombreArchivo = './'+nombreArchivo;
        }
        else{
            fs.writeFile('./'+nombreArchivo,'',err => {
                if(err) throw new Error(err.message);

                this.nombreArchivo = './'+nombreArchivo;
                let mensajes = []
                fs.writeFile(this.nombreArchivo,JSON.stringify(mensajes,null,4));
                console.log('creado');
            });
        }
    }

    async save(data){
        try{
            
            const archivo = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            
            let mensajes = []
            try{
                mensajes = JSON.parse(archivo);
                mensajes.push(data);
            }
            catch(err){
                mensajes.push(data);
            }
            
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(mensajes,null,4));

            return null;
        }
        catch(err){
            console.error(err);
        }
    }

    async getAll(){
        try{
            const archivo = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const mensajes = JSON.parse(archivo);
            
            return mensajes;
        }
        catch(err){
            console.error(err);
        }
    }
}

module.exports.Contenedor = Contenedor

