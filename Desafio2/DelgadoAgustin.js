const fs = require('fs'); //Importo las librerias necesarias

class Contenedor{
    constructor(nombreArchivo){
        //Se asume que nombreArchivo incluye su extension/tipo de archivo 
        //Se revisa en la carpeta que estamos parados

        //Si el archivo existe se guarda el nombre
        if(fs.existsSync('./'+nombreArchivo)){
            this.nombreArchivo = './'+nombreArchivo;
        }

        //Si no existe, se crea el archivo y se guarda el nombre
        else{
            fs.writeFile('./'+nombreArchivo,'',err => {
                if(err) throw new Error(err.message);

                this.nombreArchivo = './'+nombreArchivo;
                console.log('creado');
            });
        }
    }
    async save(producto){
        try{
            const productoConId = {
                title: producto.title,
                price: producto.price,
                thumbnail: producto.thumbnail,
                id: 0
            }
            const archivo = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            let productos = []
            try{
                productos = JSON.parse(archivo);
                productoConId.id = productos[productos.length-1].id+1
                productos.push(productoConId);
            }
            catch(err){
                //console.error(err);
                productos.push(productoConId);
            }
            
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(productos,null,4))
            console.log(`Producto Agregado con ID: ${productoConId.id}`)
        }
        catch(err){
            console.error(err);
        }
    }

    async getById(id){
        try{
            const archivo = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const productos = JSON.parse(archivo);
            const producto = productos.find(x => x.id==id);
            if(producto == undefined){
                console.log("No existe producto con este ID");
            }
            else{
                console.log(producto);
            }
        }
        catch(err){
            console.error(err);
        }
    }

    async getAll(){
        try{
            const archivo = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const productos = JSON.parse(archivo);
            console.log(productos);
        }
        catch(err){
            console.error(err);
        }
    }
    async deleteById(id){
        try{
            const archivo = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const productos = JSON.parse(archivo);
            const indice = productos.findIndex(x => x.id==id);
            if(indice == -1){
                console.log("No existe producto con este ID");
            }
            else{
                productos.splice(indice,1);
                await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(productos,null,4))
            }
            
        }
        catch(err){
            console.error(err);
        }
    }
    async deleteAll(){
        try{
            const productos = [];
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(productos,null,4));    
        }
        catch(err){
            console.error(err);
        }
    }
}

const productoPrueba = {
    title: 'nombrePrueba',
    price: 123.12,
    thumbnail: 'https://lasrecetasdelchef.net/wp-content/uploads/2020/08/alfajor-triple.jpg'
}

const prueba = new Contenedor('prueba.txt')

//NO USAR SAVE Y DELETE AL MISMO TIEMPO

//prueba.save(productoPrueba)

//prueba.deleteById(1);

//prueba.getAll();

// prueba.getById(10);

prueba.deleteAll();

