const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

// (async () => {
//     try {
        
//         await knex.schema.createTable('cars', table => {
//             table.increments('id');
//             table.string('name');
//             table.integer('price');
//         });
//         console.log('Table cars created');
//     } catch (err) {
//         console.log(err);
//     } finally {
//         knex.destroy();
//     }
// })();

// (async()=>{
//     try{
//         await knex.schema.createTable('mensajes',table=>{
//             table.increments('id');
//             table.string('author');
//             table.string('date');
//             table.string('text');
//         })
//         console.log('Table created');
//     } catch(err){
//         console.log(err)
//     } finally {
//         knex.destroy();
//     }
// })();

(async()=>{
    try{
        await knex.schema.createTable('productos',table=>{
            table.increments('id');
            table.string('name');
            table.string('price');
            table.string('thumbnail');
        })
        console.log('Table created');
    } catch(err){
        console.log(err)
    } finally {
        knex.destroy();
    }
})();