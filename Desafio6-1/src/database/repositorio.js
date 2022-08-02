import knex from 'knex';

class Repositorio{
    constructor(config,tabla){
        this.knex = knex(config)
        this.tabla = tabla
    }

    save(data){
        try{
            
            this.knex(this.tabla).insert(data)
                .then(() => {
                    console.log('Data inserted');
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    //this.knex.destroy();
                });

            return null;
        }
        catch(err){
            console.error(err);
        }
    }

    getAll(){
        let data = []
        try{
            this.knex.from(this.tabla).select("*")
                .then(rows => {
                    rows.forEach(element => {
                        data.push(element);
                    })
                })
                .catch(err => {
                    console.log(err);
                    return err
                })
                .finally(() => {
                    //this.knex.destroy();
                    
                });
            return data
        }
        catch(err){
            console.error(err);
        }
    }
}
