import express from 'express'
import { getStreamToken } from '../controllers/chatController.js'
import { protectRoute } from '../middleware/protectRoute.js'

// step152: now lets create a router to handle the get, post, put, delete requests, thus here below.
const router = express.Router()

// step153: now we will have a GET request here if the user hits the "/token" endpoint, then we will get them a STREAM token, thus here below.

// step154: so the below endpoint will hit when user visits "/api/chats/token", as we added the /api/chats already in server.js and now adding this routes file after that , so all endpoints here will be actually prefixed by "/api/chats" , thus here below.

// step155: we will define this method now in a file, so see the next steps in chatController.js file now there, thus here below.
router.get("/token", protectRoute, getStreamToken) // so only users authenticated with CLERK passes protectRoute and only they can call the getStreamToken controller, thus here below.

export default router