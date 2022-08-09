import config from "../../config.js"

const options = {
    client: 'mysql',
    connection: {
        host: config.HOST,
        port: 3306,
        user: 'prueba',
        password: '',
        database: 'prueba'
    }
}

export {options}