// step107: lets first import the package needed to connect the app to Stream’s real-time chat service, thus here below.
import { StreamChat } from 'stream-chat'
import { ENV } from '../lib/env.js'

// step108: now lets get the API keys from env file, thus here below.
const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

// step109: now lets log error if the API keys are not defined, thus here below.
if (!apiKey || !apiSecret) {
    console.error("❌ Stream API keys are not defined in the environment variables!")
}

// step110: else we can create a variable here below, that will be exported and used in other files, thus here below.

// step111: so we use the getInstance method used to make only one chat connection for the app using the API keys, thus here below ; so getInstance allows to prevent duplicate connections and reuse the same connection if it already exists (checked using the API keys), thus here below.
export const chatClient = StreamChat.getInstance(apiKey, apiSecret)

// step112: now lets have the function here below that will take the user data coming from clerk and save it to stream dashboard, thus here below.
export const upsertStreamUser = async(userData) => {
    try{
        // step113: now here we will use the Stream client object to use the Stream method here below to create or update users, thus here below ; CALLED UPSERT AS IT MEANS : INSERT + UPDATE = UPSERT

        // step114: stream expects array of users, so we pass an array even if we only have 1 user, thus here below.
        // await chatClient.upsertUsers([userData])

        // step115: don't use upsertusers as we have only one user, so use upsertuser without 's' at the end ; and then upsertUser don't expect array, so use directly the user data, thus here below.
        await chatClient.upsertUser(userData)
        console.log("☑️ Stream user upserted successfully:", userData)
    }
    catch(error){
        console.error("❌ Error upserting Stream user:", error)
    }
}

// step116: now lets have a method to delete the user from stream dashboard, thus here below ; using the userId of the user there already in clerk , whcih now got deleted, so use that clerk id and delete it ; because clerk's id only is sent as id here when user is saved and so we use that id to delete the user now using the deleteUser method here below, thus here below.

// step117: see the next steps in inngest.js file now there, thus here below.
export const deleteStreamUser = async(userId) => {
    try{
        await chatClient.deleteUser(userId)
        console.log("☑️ Stream user deleted successfully:", userId)
    }
    catch(error){
        console.error("❌ Error deleting Stream user:", error)
    }
}