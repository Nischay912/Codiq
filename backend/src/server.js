// step3: now lets import the express module to be used in this file, thus here below.
import express from "express"

// step27: we will install the path module now, to be able to get the path of the file, thus here below.
import path from "path"

// step19: now to use the env variables here, we can just do import of the varibales stored in env.js file and use them here, thus here below.
import { ENV } from "../lib/env.js";

// step13: lets import the dotenv package to be used here to access the environment variables, thus here below.
// import dotenv from "dotenv"

// step14: we also need to run its config() function to access the environment variables, thus here below.

// step15: see the next steps in step16.txt file now there.
// dotenv.config()

// step4: now lets create an app using this express module ; so we create the Express server and store it in the variable "app", thus here below.
const app = express();

// step28: now we can get the absolute path of the current directory using the resolve method of the path module, thus here below.
const __dirname = path.resolve();

// console.log(process.env.PORT)

// step20: now instead of the above line requiring the import of dotev everytime in all file and then using its config method, now lets get the value of the env varible we want from the key value pair object imported from the env.js file, thus here below.
// console.log(ENV.PORT)

// step5: now using the express app, we can now create some routes here below ; like the one below is a GET request (request made when the browser requests some data from the server) to the "/health" route i.e. the URL like "http://localhost:3000/health", thus here below.

// step6: now here we also have some parameters like : request and response ; which contains (url, headers, body) and (sends dtaa back, sends JSON, sends status) respectively, thus here below ; so it takes request and sends response, thus here below.
app.get("/health", (req,res) => {

    // step7: so now when someone visits "/health" , it sets the status code to 200 meaning "SUCCESS" and shows "Server is healthy and running up successfully!" , thus here below.
    res.status(200).json({ msg : "Server is healthy and running up successfully!"})
})

// step29: now we can check whether we are development or production using the environment variable here below ; and so for that add the evironment variable in ".env" file as well as in "env.js" file as we are using the env variables from env.js file only like seen earlier also there, thus here below.
if(ENV.NODE_ENV === "production") {
    // step30: so if we are in production mode during deployment, we will now write "app.use()" which is a middleware to use the feature written in it for every request made to the server ; so now we will be using the "static" feature of express which is used to make a particular file or folder as our STATIC ASSETS i.e. these don't change on the server ; we know that the "dist" folder of frontend is the final optimized website used by deployment website to use it for production which has bundled CSS, compressed files, minified JavaScript and i ready for production directly there ; so express.static() serves the file from this path written in it directly from that folder ; so if browser requests "http://localhost:3000/", then express sends dist/index.html as its the root "/" of that folder there ; and if browser requests : http://localhost:5000/assets/main.js ; then express sends : "dist/assets/main.js" ; thus it sends all the files from the "dist" folder there in production now ; because in production we don't want react dev server or vite server ; but only node + express there ; so we have : Browser → Express → serve dist files → done ; instead of : Browser → Vite dev server → React ; now "." means current folder, so even in terminal when we do "cd ." , then we remain in same folder ; and if we do "cd .." it means go one level outside the current folder ; so to go in "dist" , we currently are in backend folder ; so go on level up i.e. to root folder directory ; then we go in the frontend folder and finally get the "dist" folder there by the path below, thus here below.

    // step31: "join" merges the path to be the current directory stored in __dirname with the path to be the "dist" folder ; thus here below.
    app.use(express.static(path.join(__dirname, "../frontend/dist"))) 

    // step32: now we see that here in this "server.js" file we have many endpoints like "/health" and others that we will add here above ; so like if request comes to "/health" i.e. "localhost:3000/health" ; then the message there will run on that route ; so browser -> express -> matches /health > sends the json response written in it there ; now thus it shows : { msg : "Server is healthy and running up successfully!"} ; then if broswer requests for static files like /assets/index-abc123.js or /style.css or /logo.png ; then Browser->Express -> express.static() serves these files from the "dist" folder there ; then if broswer requests for "/dashboard" then this is not a route defined here in server.js ; so Express not matches any here , and may return 404 error from server ; but it maybe possible that <Route path="/dashboard" /> exists in React , so best thing to do here is to redirect to the react app instead of showing error ; so we make it point to index.html of "dist" folder which has the entire react app compressed in it ; but if someone randomly types "localhost:3000/jfsklkcmsa" ; then express should run 404 error, but we dont want server to send so and crash the app ; so we redirect to index.html again ; but now there also React also not founds it as it not matches /dashboard , /login ... there ; so react then shows 404 error not found thus there or any custom message depending on the code of react there, thus here below.

    // step33: so the following code below has : /*any which means that if the above routes don't match , then the control comes here ; as the order of sequence in which routes are matched is top to bottom and thus it matches /*any which means any other routes than the one written above ; then we send index.html to the browser ; res is used to send response to browser ; so sendFile is used to send something directly to the browser ; but the path in it must be absolute path ; so path can't be "index.html" but "C:/project/index.html" ; so use path.join to get that index.html of dist folder like donw above too earlier using path.join there, thus here below ; so in simple words : WHENEVER ROUTE IS NOT AN API HERE OF SERVER.JS, THEN LOAD THE REACT APP INSETAD OF SHOWING SERVER 404 ERROR THERE AS MAYBE POSSIBLE USER SENDING REQUEST TO REACT'S ROUTES INSTEAD OF BACKEND API ROUTES THERE, SO DON'T CRASH THE APP THERE INSTEAD LOAD REACT APP THERE AND SHOW CUSTOM MESSAGE TO USER DEPENDING UPON THE CODE OF REACT THERE, thus here below.

    // step34: its GET and not POST because Browser requests pages using GET, not POST; so index.html → must be served with GET so when someone in browser types : http://localhost:5000/dashboard ; GET /dashboard is sent by browser automatically and not POST, thus here below.

    // step35: see the next steps in step36.txt file now there, thus here below.
    app.get("/{*any}", (req,res) => {
        // res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));

        //  can type like above or comma seperated for the absolute path of file, thus here below.
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

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