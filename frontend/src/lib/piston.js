// step424: now lets specify the public URL of the online code execution service that the app will use to run programs, by making calls on this URL to the PISTON API, so its the : base endpoint for all Piston API requests, thus here below.
const PISTON_API = "https://emkc.org/api/v2/piston";

// step425: now lets have an object here to specify the languages to be used and their versions, thus here below.

// step426: Piston API can run some versions only for each language, so we specify that verison only, thus here below.
const LANGUAGE_VERSIONS = {
    javascript: {
        language: "javascript",
        version: "18.15.0",
    },
    typescript: {
        language: "typescript",
        version: "5.0.3",
    },
    python: {
        language: "python",
        version: "3.10.0",
    },
    java: {
        language: "java",
        version: "15.0.2",
    },
    cpp: {
        language: "cpp",
        version: "10.2.0",
    },
    php: {
        language: "php",
        version: "8.2.3",
    },
};

// NOTE HERE THAT : /* ... */ → normal multi-line comment && /** ... */ → JSDoc comment (special format) > used in editors to have the code highlighted, thus here below.

// step427: A JSDoc comment applies to the very next thing written after it ; VS codes can see and guide us based on it, however its not a part of code and will not be executed, thus here below.

// step428: so @param documents the 1st parameter "language" expected in the function below it i.e. it must be a string and represents programming language ; similarly @param documents the 2nd parameter "code" expected in the function below it i.e. it must be a string and represents source code to be executed, thus here below.

// step429: finally @returns tells what function will return > here the function returns a Promise with an object that has success:boolean always in it , whereas output and error are optional as "?." used i.e. if present then type String, and may not be present too, thus here below.

// step430: main reason from Promise return is that any "async" function always returns a Promise , which we use later using "await" ; we know that : A Promise is just a placeholder fit but waits for it, but it doesn't stop the whole app, it just waits for that async function but continues to run other codes ahead and when the async function is ready with the return value, it shows its output there ; and thats what will be returned here as well below, thus here below ; so overall : async means → Promise comes out, value comes later i.e. makes a promise to JavaScript that it will surely give the value later, just wait for it don't block the function,just go ahead run other codes ahead and when the value is ready, this function will return and show it there, thus here below. 

/**
* @param {string} language - programming language
* @param {string} code - source code to be exceuted
* @returns {Promise<{success: boolean, output?:string, error?: string}>}
 */

// step431: now lets define a function here below that will have the language and the source code as the argument, that we want to be executed on the online code execution service provided by Piston API, thus here below.
export async function executeCode(language, code) {
    try{
        // step432: now lets get the version of the language i.e. get the language field's value from the object using [] ; i.e. if the language passed as parameter here is "JavaScript", then get the value for its "javascript" in this LANGUAGE_VERSIONS object ; its like dict[3] = 4, so we are trying to get 4, using these [] there, thus here below.
        const languageConfig = LANGUAGE_VERSIONS[language]

        // step433: now lets check if the language selected is one of the these i.e. its undefined or not, then return the following error message, thus here below.
        if(!languageConfig){

            /* step434: since the return type was Promise like mentioned above, so even though we didn't mention Promise.resolve() , but JavaScript did it automatically because we had mentioned the return type of the function as "async" and also had specified it ealrier in the JSDoc comment , which VS code can see and guide us based on it, however its not a part of code and will not be executed, thus here below -
            return Promise.resolve({
                success: false,
                error: `Language ${language} is not supported.`
            });

            ; proof of it can be if we do const x = demo() and console log and all do of x, we will see something like : Promise { <fulfilled> : { success: false, error: 'Language JavaScript is not supported.' } } , thus here below.
            */

            return {
                success: false, 
                error: `Language ${language} is not supported.`
            }
        }

        // step435: else if its a valid language, then we make a request using "fetch" to the PISTON API, thus here below.

        // step436: the "/execute" endpoint of PISTON API is used to executes/runs the code, thus here below.
        const response = await fetch(`${PISTON_API}/execute`, {
            // step437: we will be sending some data when making the call, so make it of the type "POST", thus here below.
            method: "POST",

            // step438: now we will have some additional data in headers, that says here that the data being sent is a JSON data, so that server don't misread it or misinterpret it as some other type, and kknows the type, so that it can parse it accordingly too on recieving it there on its PISTON API, thus here below.
            headers: {
                "Content-Type": "application/json"
            },

            // step439: now we will be sending the data, which is a JSON object ; but "fetch" expects the data to be a string, so we have to convert it to a string using JSON.stringify, thus here below.
            body: JSON.stringify({
                // step440: so we send in the body/data, the language and the version of the code to be executed , so we say that : Hey Piston, run THIS code using THIS language and THIS version, and give me the result, thus here below.
                language: languageConfig.language,
                version: languageConfig.version,

                // step441: now "files" contains the actual source code to be executed ; piston supports multiple files, so even if you want to send one file, still send it as an array is what Piston expects, thus here below.
                files: [
                    {
                        // step442: now we mention the name of the file to be executed, so in this case we have only one file to be executed, thus here below.
                        name: `main.${getFileExtension(language)}`,

                        // step445: we also mention the content of the file to be executed, so we pass the "code" user typed and passed into the parameters of this function as the source code to be executed, thus here below.
                        content: code
                    }
                ]
            })
        });

        // step446: now first we check if the response recieved is OK or not i.e. the request was successful or not, thus here below.

        // step447: we know async function returns a Promise, so even if we didn't write Promise.resolve() here, but JS will do it automatically because we have specified the return type of the function as "async" and thus resolve the output of the function to an object with the passed and the firlds being reteunred / fields to be returned , thus here below.

        // step448: can be true or false based on whether the request was successful or not, and thus has the corresponding status code saved in response.status of the response object, thus here below.
        if(!response.ok){
            return {
                success: false,
                error: `HTTP error! status: ${response.status}` // response has status code too
            }
        }
        
        // step449: but if the response is OK, then we get the data from the API, which is sent as a string ; as we saw while sending data to backend api also, we firts need to convert it to a string ; so we know backend takes data and sends back data both as strings, but we convert it to a JSON object using .json() to interpret and use it as a JSON object usefully in our code, thus here below.
        const data = await response.json();

        /* step450: PISTON API sends the data in the format as -

        {
        "run": {
            "stdout": "Hello World\n",
            "stderr": "",
            "output": "Hello World\n",
            "code": 0,
            "signal": null
        }
        }

        ; so lets get the output and the error from it, thus here below.
        */

       // step451: if the output is not there or is undefined, then we return an empty string, thus here below , to prevent errors and prevent the app from crashing/ preven the app to crash, thus here below.
       const output = data.run.output || ""
       const stderr = data.run.stderr || ""

       // step452: now if there is some error, then we return the error, thus here below.
       if(stderr){
            return {

                // step453: the value on lhs must be same as what we defined them to be earlier there above, thus here below.
                success: false,
                output: output,
                error: stderr
            }
       }

    //    step454: but if not the above case there, means successfully executed, thus here below.

    // step455: ALSO NOTE HERE IN THIS FILE THAT : we return "success" firled in all returning object, but the returned object may or may not have "output" and "error" fields, thats why in JsDoc we had the "output" and "error" fields marked there as optional using "?" there earlier above in the JsDocs told about it there as well/ there too as well, thus here below.

    // step456: see the next steps in ProblemPage.jsx, thus here below.
       return {
        success: true,
        output: output || "No output", // if output is not there or is undefined, then we return "No output", thus here below
       }

    }
    catch(error){
        return {
            success: false,
            error: `Failed to execute the code: ${error.message}`
        }
    }

    
}
// step443: now lets have a helper function to help us get the extension of the file based on the language, thus here below.

function getFileExtension(language) {
    const extensions = {
        javascript: "js",
        typescript: "ts",
        python: "py",
        java: "java",
        cpp: "cpp",
        c: "c",
        go: "go",
        rust: "rs",
        swift: "swift",
        kotlin: "kt",
        php: "php",
        ruby: "rb",
        html: "html",
        css: "css",
        sql: "sql",
        json: "json",
    }
    
    // step444: we finally return the extension based on the passed language, and if it doesn't exist, then return "txt" better than nothing/undefined return to prevenet errors and prevent the app from crashing/ preven tthe app to crash, thus here below.
    return extensions[language] || "txt";
}