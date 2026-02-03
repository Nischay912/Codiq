// step130: now lets get the requireAuth middleware from clerk, thus here below.
import { requireAuth } from "@clerk/express"

// step131: now we will also be using the User model, thus here below.
import User from "../models/User.js"

// step132: now we will have this protectRoute below, which will actually be an array ; becaus ein Express we can have multiple middlewares for a route, so express treats it like an array ; so we have an array here to group multiple middlewares together ; so when we pass an array of middleware to Express, it automatically flattens and executes them sequentially, thus here below.
export const protectRoute = [
    // step133: so the first middleware that runs here, i.e. first use the requireAuth function to check login authentication using the clerk middleware, thus here below.
    requireAuth(),

    // step147: now we can add a object in this below, to tell it to redirect us to the "/sign-in" url if we are not authenticated instead of the "/" home page by default if not authenticated if we want, thus here below.

    // step148: see the next steps in step149.txt file now there, thus here below.

    // requireAuth({ signInUrl : "/sign-in" }),

    // step134: once the above middleare is passed successfully, we will run this 2nd middleware here, which will get the "req" i.e. data from client to server ; then "res" i.e. data from server back to client and the "next" method which refers to call the next() method written after the middleware there once the middleware check is passed, thus here below.
    async(req, res, next) => {
        try{
            // step135: so once user is authenticated using the requireAuth middleware, then we will get the user's clerk id from the req object, thus here below.

            // step136: so since we know we had used a clerk middleware in server.js, so it injects some extra properties in "req" like auth , used to return {userId, sessionId, ...} , so we take the userId from there ; so thus clerk middleware of server.js there injects the user details in the req object under the "auth" function ; like : req.auth = () => { return { userId: "user_abc", sessionId: "sess_xyz"} }, thus here below.
            const clerkId = req.auth().userId

            // step137: if the clerkId is null, we return with status 401, which means "UNAUTHORIZED", thus here below.
            if(!clerkId) return res.status(401).json({ message : "Unauthorized - inavlid token"})

            // step138: else if the user is authenticated, then lets try to find the user in the database using the clerkId, thus here below.
            const user = await User.findOne({clerkId: clerkId}) // both key-value are same so can just pass "clerkId" also below, thus here below.

            // step139: if the user is not found, we return with status 404, which means "NOT FOUND", thus here below.
            if(!user) return res.status(401).json({ message : "User not found"})

            // step140: but if the user is ther, then we attach that user document of MongoDB to the request "req" , so now : req has : req = { body: {...}, params: {...}, query: {...}, auth: function(){}, user: {...} , ..}thus here below ; so thus : req.user = user stores the logged-in user data inside the request so all next middlewares/controllers can use it, thus here below.
            req.user = user

            // step141: now always at end of middleware we write the next() to tell that the middleware has been passed without returning with error anywhere before, so we can call the next method that was written after this middleware, wherever this middleware is exported and used, thus here below.

            // step142: see the next steps in server.js file now there, thus here below.
            next()
        }
        catch(error){
            console.error("❌ Error in protectRoute middleware:", error)
            return res.status(500).json({ message : "Internal Server Error"}) // status code 500 means "INTERNAL SERVER ERROR"
        }
    }
]