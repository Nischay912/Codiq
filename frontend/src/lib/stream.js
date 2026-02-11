// step1204: so first get the streamClient instance to be used from stream-io/video-react-sdk ; his is a class provided by Stream to connect your app to their video services, thus here below.
import { StreamVideoClient } from "@stream-io/video-react-sdk"

// step1206: now we get the stream API key using the syntax provided by VITE : to access frontend/.env & in backend folder, its using process.env, thus here below ; and these access the .env with prefix "VITE", thats why prefix "VITE" is must in .env here to access it using this syntax there, thus here below.

// step1207: when using import.meta.env. : In Vite, environment variables must start with VITE_ or they won’t work, this is because Vite prefixes environment variables with VITE_ by default and then only accesses them from .env directly without any import needed of that file like backend's dotenv we had there with process.env there ; but here meta.env used by this logic here/there, thus here below.
const apiKey = import.meta.env.VITE_STREAM_API_KEY

// step1208: now lets have the stream client initially null, to prevent garbage vlaue to come in it later ; and : will assign a real value to/in it later, thus here below.

// step1209: we just declare it here, but will use it later to assign the user using the stream, so make it "let" and NOT "CONST", as by rule : const variables cannot be reassigned later with the actual user, thus here below.

// step1210: we just made it null here to prevent garbage value to come in it later, and we assigned it here only so that later many different users may join chat, so it should be ready to adapt to new client values, thats why let as CONST cannot be reassigned or redifined or modified later, thus here below.
let client = null

// step1211: now lets have a async function to initialize the client on stream using the currently logged in "user" and his token, to help him now communicate with the stream application/server, thus here below.

// step1212: so we will create and return a streamClient instance for the user passed into this function, thus here below.
export const initializeStreamClient = async (user, token) => {

    // step1213: so now : if client exists with same user instead of creating again, we return that existing client ; i.e. We don’t want to create multiple Stream clients for same user ; as it will waste memory creating different client instances for same user again and again ; thus here below.

    // step1214: so here If client exists & client.user exists ; only then get the "id", thats why ?. optional chaining used , else undefined.id will cause "TypeError: Cannot read properties of undefined (reading 'id')" error, thus here below.
    if (client && client?.user?.id === user.id){ 

        // step1215: so : If a client already exists AND it belongs to the same user, just return it ; This prevents recreating the client every time here/there, thus here below.
        return client
    }

    // step1216: so now here : Without API key → Stream cannot connect → so better to crash early ; so immediately stop server and show the error, thus here below.
    if (!apiKey) {
        throw new Error("Stream API key not provided.")
    }

    // step1413: put this below to check if client already exists and user clicks rejoin on call ; then this initializeFn runs, so first check internally if for same session, same user already had an instance of client, if yes first disconnect that old one and then create this new one, thus here below ; DETAILED EXPLAINATION WHY ADNW WHAT AND HOW AND WHY PLACED HERE, SEE IN THE LAST STEP FILE : STEP1412.TXT FILE NOW HERE/THERE, THUS HERE BELOW.

    // step1414: see the next steps in step1415.txt file now there, thus here below.
    if(client){
        await disconnectStreamClient();
    }

    // step1217: after all above checks, we create the client now : new StreamVideoClient({...}) → creates new stream client instance using the imported package and then : we connect the stream server for the client by passing the API key, the user details and his related token in the instance here below, thus here below.

    // step1218: thats why we had : let client = null earlier ; as we assign it everytime here with the user whose details sent in function , and const cannot be re-assigned once declared ; thats why we used "let" there baove and not "const" here/there, thus here below.
    client = new StreamVideoClient({
        apiKey,
        user,
        token
    })

    // step1219: finally we Return the newly created client ; so that : now any component that calls this function will receive the ready created Stream client there, thus here below.
    return client
}

// step1220: now lets have a function to disconnect from stream client now, thus here below.
export const disconnectStreamClient = async () => {
    // step1221: so first we see if client exists as if it doesn't exist, whats the point to disconnect it, thus here below.

    // step1222: so run this method only if client exists and has been created/initialized that wants to be disconnected now ; no need to do anything if client doesn't exist as then whom will you even disconnect then, thus here below.
    if (client) {
        try{
            // step1223: so we use the disconnectUser() method : provided by Stream’s SDK (StreamVideoClient) ; to disconnect the client from the stream server ; it closes the webSocket connection and all related to the user and disconnects the user from stream ; it’s a clean logout from Stream’s side for the client or the user disconnected here/there, thus here below.

            // step1224: its like : new StreamVideoClient() → opens WhatsApp Web and then : disconnectUser() → clicks “Log out” here/there, thus here below.
            await client.disconnectUser();

            // step1225: After disconnecting, we reset client back to empty ; so that now : if someone calls initializeStreamClient() again, it will create fresh connection here/there in the client, thus here below.

            // stp1226: now see the next steps in useStreamClient.js file now there, thus here below.
            client = null;
        }
        catch(error){
            console.error("Error disconnecting Stream client:", error)
        }
    }
}