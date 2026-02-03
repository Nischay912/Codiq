import { chatClient } from "../lib/stream.js";

// step156: lets create the function to be exported, so that it can be used in other files, thus here below.
export async function getStreamToken(req, res){
    try{
        // step157: so now : we will use the createToken method from the chatClient instance of STREAM to create a token, using the clerkId as in our app, we are giving every user th "id" from clerk only like seen earlier there too, thus here below ; and the clerkId of the user logged in can be got from req, because we saw in protectRoute middleware that if the user was authenticated, then the "user" object got added to the "req" object there, and then can be used by the next() function written after the middleware in that function ; so here after the protectRoute, we ge the user object in "req" and so we can get the clerkId for the logged in and authenticated user, thus here below.

        // step158: and so to be able to access the "req.user" make the route to be protected route in chatRoutes.js file there, thus here below.

        // step159: also here we don't use the mongodb _id, but the clerk id, because : in the stream dashboard > where we see the users in the explores section there, we have the "clerkId" there and not the mongodb _id ; so they should match, thus here below.
        const token = chatClient.createToken(req.user.clerkId)

        // step160: now lets send a response back to the client with this token and some other details of the user object stored after the user is authenticated in the "req" object, thus here below.

        // step161: so basically : the server creates the token and the client (frontend) stores it always ; and frontend usually sends the token to the server to "verify that the user is authenticated and an authenticated user is sending the requests to the backend API" and then the server can use the token to send messages to the user with the response, thus here below ; also the token is stored in the localStorage there, thus here below.

        // step162: see the next steps in step163.txt file now there, thus here below.

        res.status(200).json({ // status code 200 means "SUCCESS"
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image

        }) 
    }
    catch(error){
        console.log("❌ Error getting Stream token from the getStreamToken controller:", error.message)
        res.status(500).json({ msg : "Internal Server Error"}) // status code 500 means "INTERNAL SERVER ERROR"
    }
}