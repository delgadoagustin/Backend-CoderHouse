// class Libro{
//     constructor(nombre, autor){
//         this.nombre = nombre;
//         this.autor = autor;
//     }
// }

class Usuario{
    // nombre;
    // apellido;
    // libros=[];
    // mascotas=[];
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(nombre, autor){
        this.libros.push({nombre: nombre,autor: autor});
    }
    getBookNames(){
        const names = [];
        this.libros.forEach(element => {
            names.push(element.nombre);
        });
        return names;
    }
}

const nombre = 'Agustin';
const apellido = 'Delgado';
const mascotas = ['perro','gato','conejo'];
const libros = [
    {nombre: '1984', autor: 'George Orwell'},
    {nombre: 'El Ultimo Deseo', autor: 'Andrzej Sapkowski'}
];

// console.log(nombre);
// console.log(apellido);
// console.log(mascotas);
// console.log(libros);

const usuario = new Usuario(nombre,apellido,libros,mascotas);

console.log(usuario.getFullName());
console.log(usuario.countMascotas());
usuario.addMascota('Lagarto');
console.log(usuario.countMascotas());
console.log(usuario.getBookNames());
usuario.addBook('El Economista Camuflado','Tim Harford');
console.log(usuario.getBookNames());
