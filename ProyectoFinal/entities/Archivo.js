const fs = require('fs');

class Contenedor{
    constructor(nombreArchivo){
        if(fs.existsSync('./'+nombreArchivo)){
            this.nombreArchivo = './'+nombreArchivo;
        }
        else{
            const arreglo = [];
            this.nombreArchivo = './'+nombreArchivo;
            
            fs.writeFileSync(this.nombreArchivo,JSON.stringify(arreglo,null,4));
        }
    }

    async save(data){
        try{
            
            const archivo = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            
            let arreglo = []
            try{
                arreglo = JSON.parse(archivo);
                arreglo.push(data);
            }
            catch(err){
                arreglo.push(data);
            }
            
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(arreglo,null,4));

            return null;
        }
        catch(err){
            console.error(err);
        }
    }

    async getAll(){
        try{
            const archivo = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const arreglo = JSON.parse(archivo);
            return arreglo;
        }
        catch(err){
            console.error(err);
        }
    }
    //Borra el elemento con el id correspondiente si existe
    async deleteById(id){
        try{
            const archivo = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const arreglo = JSON.parse(archivo);
            const indice = arreglo.findIndex(x => x.id==id);
            if(indice == -1){
                console.log("No existe elemento con este ID");
            }
            else{
                arreglo.splice(indice,1);
                await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(arreglo,null,4))
                console.log('Producto Borrado con Exito')
            }
        }
        catch(err){
            console.error(err);
        }
    }

    //Sobreescribe el archivo con un arreglo vacio
    async deleteAll(){
        try{
            const productos = [];
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(productos,null,4));    
            console.log('Todos los productos borrados con exito')
        }
        catch(err){
            console.error(err);
        }
    }
}

module.exports.Contenedor = Contenedor

