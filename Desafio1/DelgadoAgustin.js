class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    //Devuelve un template string con el nombre y el apellido del usuario
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    //Agrega una mascota al arreglo mascotas
    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    //Cuenta la cantidad de mascotas por la longitud del arreglo mascotas
    countMascotas(){
        return this.mascotas.length;
    }

    //Agrega el nombre y autor de un libro al arreglo libros
    addBook(nombre, autor){
        this.libros.push({nombre: nombre,autor: autor});
    }

    //Devuelve un arreglo con solo el nombre de los libros en el arreglo.
    getBookNames(){
        const names = [];
        this.libros.forEach(element => {
            names.push(element.nombre);
        });
        return names;
    }
}

//Variables de Prueba
const nombre = 'Agustin';
const apellido = 'Delgado';
const mascotas = ['perro','gato','conejo'];
const libros = [
    {nombre: '1984', autor: 'George Orwell'},
    {nombre: 'El Ultimo Deseo', autor: 'Andrzej Sapkowski'}
];

//Creacion de Usuario
const usuario = new Usuario(nombre,apellido,libros,mascotas);

//Prueba de Métodos
console.log(usuario.getFullName());
console.log(usuario.countMascotas());
usuario.addMascota('Lagarto');
console.log(usuario.countMascotas());
console.log(usuario.getBookNames());
usuario.addBook('El Economista Camuflado','Tim Harford');
console.log(usuario.getBookNames());
