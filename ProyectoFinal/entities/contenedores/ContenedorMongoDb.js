const mongoose = require('mongoose');

try {
    mongoose.connect(
        'mongodb://localhost:27017/proyecto',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
} 
catch (error) {
    
}

export default class ContenedorMongoDb{
    constructor(collection, schema){
        this.collection = mongoose.model(collection, schema)
    }

    save(data){
        try{
            const nuevo = new this.collection(data);
            nuevo.save();
        }
        catch(err){
            console.error(err);
        }
    }

    getAll(){
        try{
            return this.collection.find()
        }
        catch(err){
            console.error(err);
        }
    }

    deleteById(id){
        try{
            this.collection.deleteOne({id: id});
        }
        catch(err){
            console.error(err);
        }
    }

    deleteAll(){
        try{
            this.collection.deleteMany()
        }
        catch(err){
            console.error(err);
        }
    }
}