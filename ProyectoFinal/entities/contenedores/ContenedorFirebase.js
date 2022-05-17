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
  
    async getAll() {
        try {
            const snapshot = await this.query.get();
            return snapshot.docs.map(doc => {
                const id = doc.id;
                const data = doc.data();
                return {id,data}
            });
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async getById(id){
        try {
            return this.query.doc(id);
        } catch (error) {
            console.error(error)
        }
    }

    async exist(id){
        try {
            const d = this.query.doc(id)
            const doc = await d.get();
            if(!doc.exists){
                return false;
            }
            else{
                return true;
            }
            
        } catch (error) {
            console.error(error)
        }
    }
  
    save(data) {
        try {
            const {...object} = data;
            const guardado = this.query.add(object)
            return guardado;
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    updateById(id,data){
        try {
            const {...object} = data;
            this.query.doc(id).update(object)
        } catch (error) {
            console.error(error)
        }
        
    }
  
    deleteById(id){
        try{
            const doc = this.query.doc(id).delete();
        }
        catch(err){
            console.error(err);
        }
    }
  
    async deleteAll() {
        const snapshot = await this.query.get()
        const batch = this.db.batch();

        snapshot.docs.map(doc => {
            batch.delete(doc);
        })
        batch.commit();
    }
}

module.exports = ContenedorFirebase