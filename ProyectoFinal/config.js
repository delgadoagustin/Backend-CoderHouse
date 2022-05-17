const firebase = require('./db/basefirebase-c8a23-firebase-adminsdk-g1qur-8b417a2dca.json')
module.exports = {
    port: process.env.PORT || 8080,
    db: process.env.TIPO_DB || 'firebase',
    firestore: firebase
}
