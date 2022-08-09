import { config } from "dotenv"

config()

export default {
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 8080,
    mongoURL: process.env.mongoURL 
}