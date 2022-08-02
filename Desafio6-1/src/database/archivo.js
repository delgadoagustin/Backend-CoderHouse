import fs from 'fs'

class Contenedor{
    constructor(nombreArchivo){
        if(fs.existsSync('./'+nombreArchivo)){
            this.nombreArchivo = './'+nombreArchivo;
        }
        else{
            const mensajes = [];
            this.nombreArchivo = './'+nombreArchivo;
            
            fs.writeFileSync(this.nombreArchivo,JSON.stringify(mensajes,null,4));
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

export { Contenedor }