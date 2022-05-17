const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')

class FirebaseCarritos extends ContenedorFirebase {
  constructor() {
    super('carritos')
  }
}

module.exports = FirebaseCarritos