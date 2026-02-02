// step41: lets import the mongoose model, which will help to communicate with the database there, thus here below.
import mongoose from "mongoose"

// step42: lets get the ENV object to get the environment variables to be used here, thus here below.
import { ENV } from "./env.js"

// step43: now lets create a function to connect with the database, thus here below.
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.DB_URL);

        /* step44: "conn" object returned above has -
            conn = {
            connection: {
                host: "localhost",
                port: 27017,
                name: "mydb",
                readyState: 1
            },
            models: {...},
            connections: [...]
            }
        ; so to get the connection object's hostname, we do : "conn.connection.host" there, thus here below.
        */

        // step45: see the next steps in server.js file now there, thus here below.
        
        console.log("☑️ Connected to MongoDB:", conn.connection.host)
    } 
    catch (error) {
        console.error("❌ Error connecting to MongoDB:", error)
        process.exit(1) // status code 0 means success and 1 means failure
    }
}