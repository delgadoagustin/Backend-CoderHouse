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

    //Guarda el producto en el archivo de la ruta del Contenedor
    //Devuelve el id del producto guardado
    async save(producto){
        try{
            //Mapeo el producto en un objeto con ID
            const productoConId = {
                title: producto.title,
                price: producto.price,
                thumbnail: producto.thumbnail,
                id: 0
            }

            //Lectura del archivo
            const archivo = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            
            //Intento parsear JSON, de lo contrario se sobreescribe
            let productos = []
            try{
                productos = JSON.parse(archivo);
                productoConId.id = productos[productos.length-1].id+1  //Calculo del nuevo ID
                productos.push(productoConId);
            }
            catch(err){
                //console.error(err);
                productos.push(productoConId);
            }
            
            //Guardo el arreglo de productos
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(productos,null,4));

            return productoConId.id;
        }
        catch(err){
            console.error(err);
        }
    }

    //Devuelve el producto con el id correspondiente si existe
    async getById(id){
        try{
            const archivo = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const productos = JSON.parse(archivo);
            const producto = productos.find(x => x.id==id);
            if(producto == undefined){
                console.log("No existe producto con este ID");
                return null;
            }
            else{
                return producto;
            }
        }
        catch(err){
            console.error(err);
        }
    }

    //Devuelve un arreglo con todos los productos en el archivo
    async getAll(){
        try{
            const archivo = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const productos = JSON.parse(archivo);
            
            return productos;
        }
        catch(err){
            console.error(err);
        }
    }

    //Borra el producto con el id correspondiente si existe
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

//Variable Producto de Prueba para cargar el archivo
const productoPrueba = {
    title: 'nombrePrueba',
    price: 123.12,
    thumbnail: 'https://lasrecetasdelchef.net/wp-content/uploads/2020/08/alfajor-triple.jpg'
}

//Inicializacion de Contenedor
const contenedorDePrueba = new Contenedor('prueba.txt')

//Prueba de metodos
const prueba = async ()=>{
    //Guardar Producto
    const indice = await contenedorDePrueba.save(productoPrueba);
    console.log("Producto agregado con indice: " + indice);

    //Mostrar producto por Id si existe

    const producto = await contenedorDePrueba.getById(2);
    if(producto!=null){
        console.log(producto);
    }
    

    //Mostrar Todos los Productos
    const productos = await contenedorDePrueba.getAll();
    console.log(productos);

    //Borrar producto si existe
    await contenedorDePrueba.deleteById(2);

    //Borrar Todos los Productos
    await contenedorDePrueba.deleteAll();
}

prueba();
