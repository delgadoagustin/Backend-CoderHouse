const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')

class FirebaseProductos extends ContenedorFirebase {
  constructor() {
    super('productos')
  }
}

module.exports = FirebaseProductos