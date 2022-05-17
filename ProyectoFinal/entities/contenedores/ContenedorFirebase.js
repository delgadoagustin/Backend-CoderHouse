const admin = require('firebase-admin')
const config = require('../../config')

admin.initializeApp({
    credential: admin.credential.cert(config.firestore),
    databaseURL: 'https://basefirebase-c8a23.firebaseio.com'
  })

class ContenedorFirebase {
    constructor(collection) {
      this.db = admin.firestore()
      this.query = this.db.collection(collection)
    }
  
    getAll() {
        try {
            const result = []
            const snapshot = this.query.get()
            snapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() })
            })
            return result
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }
  
    save(nuevoElem) {
        try {
            const guardado = this.query.add(nuevoElem)
            return { ...nuevoElem, id: guardado.id }
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }
  
    deleteById(id){
        try{
            const doc = this.query.doc(`${id}`);
            const item = doc.delete()
        }
        catch(err){
            console.error(err);
        }
    }
  
    deleteAll() {
        const result = []
            const snapshot = this.query.get()
            snapshot.forEach((doc) => {
                doc.delete()
            })
    }
}

module.exports = ContenedorFirebase