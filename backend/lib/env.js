import dotenv from "dotenv"
dotenv.config()

// step17: so now we export a ENV object from here containing the key value pairs as the env variable name and its value, thus here below ; so that it can be exported from here and then imported and used in any file we want now directly there without writing the import statements and .config method of dotenv there everytime in each file there, thus here below.

// step18: see the next steps in server.js file now there, thus here below.
export const ENV = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
};