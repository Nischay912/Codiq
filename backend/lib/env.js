import dotenv from "dotenv"
dotenv.config({ quiet: true }) // we see the [dotenv@17.2.3] injecting env (3) from .env in terminal ; so to avoid it we can do the "quiet" parameter in the config method, thus here below.

// step17: so now we export a ENV object from here containing the key value pairs as the env variable name and its value, thus here below ; so that it can be exported from here and then imported and used in any file we want now directly there without writing the import statements and .config method of dotenv there everytime in each file there, thus here below.

// step18: see the next steps in server.js file now there, thus here below.
export const ENV = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
};