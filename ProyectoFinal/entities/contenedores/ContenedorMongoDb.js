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
    console.log("siiiii")
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
        }
        catch(err){
            console.error(err);
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