// step3: now lets import the express module to be used in this file, thus here below.
import express from "express"

// step19: now to use the env variables here, we can just do import of the varibales stored in env.js file and use them here, thus here below.
import { ENV } from "../lib/env.js";

// step13: lets import the dotenv package to be used here to access the environment variables, thus here below.
// import dotenv from "dotenv"

// step14: we also need to run its config() function to access the environment variables, thus here below.

// step15: see the next steps in step16.txt file now there.
// dotenv.config()

// step4: now lets create an app using this express module ; so we create the Express server and store it in the variable "app", thus here below.
const app = express();

// console.log(process.env.PORT)

// step20: now instead of the above line requiring the import of dotev everytime in all file and then using its config method, now lets get the value of the env varible we want from the key value pair object imported from the env.js file, thus here below.
console.log(ENV.PORT)

// step5: now using the express app, we can now create some routes here below ; like the one below is a GET request (request made when the browser requests some data from the server) to the "/health" route i.e. the URL like "http://localhost:3000/health", thus here below.

// step6: now here we also have some parameters like : request and response ; which contains (url, headers, body) and (sends dtaa back, sends JSON, sends status) respectively, thus here below ; so it takes request and sends response, thus here below.
app.get("/health", (req,res) => {

    // step7: so now when someone visits "/health" , it sets the status code to 200 meaning "SUCCESS" and shows "Server is healthy and running up successfully!" , thus here below.
    res.status(200).json({ msg : "Server is healthy and running up successfully!"})
})

// step8: then we below start the server using "app.listen()" with mentioning the PORT number where it runs, and once succesfully it runs, then we run the function below to print the following message there in the terminal, thus here below.

// step21: can get the port thus now here below from the env.js file, thus here below.
app.listen(ENV.PORT, () => {

    // step9: can do npm run dev and see this in terminal and the  msg at "localhost:3000/health" , thus here below.

    // step10: can install Json Viewer pro extension to get the formatted beautified JSON data, thus here below.

    // step11: see the next steps in step12.txt file now there.

    // step22: we can also use the PORT variable from the env.js file, thus here below.

    // step23: see the next steps in step24.txt file now there.
    console.log("Server is running on port:", ENV.PORT)
})