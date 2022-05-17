const mongoose = require('mongoose');
const { Productos } = require('../Producto');

try {
    mongoose.connect(
        'mongodb://localhost:27017/proyecto',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    console.log("Conectado")
} 
catch (error) {
    
}

class ContenedorMongoDb{
    constructor(collection, schema){
        this.collection = mongoose.model(collection, schema)
    }

    async save(data){
        try{
            const nuevo = new this.collection(data);
            await nuevo.save();
            return nuevo;
        }
        catch(err){
            console.error(err);
        }
    }

    async getById(id){
        try {
            let doc = await this.collection.findOne({_id: id})
            return doc;
        } catch (error) {
            console.error(error)
        }
    }

    async exist(id){
        try {
            return this.collection.exists({_id: id});

        } catch (error) {
            console.error(error);
        }
    }

    async getAll(){
        try{
            let all = await this.collection.find({})
            return all;
        }
        catch(err){
            console.error(err);
        }
    }

    async updateById(id, doc){
        try {
            await this.collection.findOneAndUpdate({_id: id},doc)
        } catch (error) {
            console.error(error);
        }
    }

    async deleteById(id){
        try{
            await this.collection.deleteOne({_id: id});
        }
        catch(err){
            console.error(err);
        }
    }

    async deleteAll(){
        try{
            await this.collection.deleteMany()
        }
        catch(err){
            console.error(err);
        }
    }
}

module.exports = ContenedorMongoDb