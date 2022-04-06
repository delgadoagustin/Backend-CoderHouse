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

    save(data){
        try{
            
            const archivo = fs.readFileSync(this.nombreArchivo,'utf-8');
            
            let arreglo = []
            try{
                arreglo = JSON.parse(archivo);
                arreglo.push(data);
            }
            catch(err){
                arreglo.push(data);
            }
            
            fs.writeFileSync(this.nombreArchivo,JSON.stringify(arreglo,null,4));

            return null;
        }
        catch(err){
            console.error(err);
        }
    }

    getAll(){
        try{
            const archivo = fs.readFileSync(this.nombreArchivo,'utf-8');
            const arreglo = JSON.parse(archivo);
            return arreglo;
        }
        catch(err){
            console.error(err);
        }
    }
    //Borra el elemento con el id correspondiente si existe
    deleteById(id){
        try{
            const archivo = fs.readFileSync(this.nombreArchivo,'utf-8');
            const arreglo = JSON.parse(archivo);
            const indice = arreglo.findIndex(x => x.id==id);
            if(indice == -1){
                console.log("No existe elemento con este ID");
            }
            else{
                arreglo.splice(indice,1);
                fs.writeFileSync(this.nombreArchivo,JSON.stringify(arreglo,null,4))
                //console.log('Elemento Borrado con Exito')
            }
        }
        catch(err){
            console.error(err);
        }
    }

    //Sobreescribe el archivo con un arreglo vacio
    deleteAll(){
        try{
            const productos = [];
            fs.writeFileSync(this.nombreArchivo,JSON.stringify(productos,null,4));    
            console.log('Todos los productos borrados con exito')
        }
        catch(err){
            console.error(err);
        }
    }
}

module.exports.Contenedor = Contenedor

