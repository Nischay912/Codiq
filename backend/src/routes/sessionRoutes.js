// step182: now lets import the express app to be used here and create the router to handle the get, post, put, delete requests, thus here below.
import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { createSession, endSession, getActiveSessions, getMyRecentSessions, getSessionById, joinSession } from "../controllers/sessionController.js"
const router = express.Router()

// step183: now lets have a POST request that will be for creating a session, when user clicks on create session there in frontend, thus here below.

// step184: so since this sessionRoutes was written with "/api/sessions" in server.js file ; so this route actually will be "/api/sessions/" root route, thus here below.

// step185: but now we will ensure that the user is authenticated with CLERK, and only after it passes that middleware, then we will run the method written here below, thus here below.
router.post("/", protectRoute, createSession)

// step186: similarly we can have the GET method to get the active sessions to be used to be displayed in frontend later there, thus here below.
router.get("/active", protectRoute, getActiveSessions)

// step187: same as above now to get the past completed sessions, thus here below.
router.get("/my-recent", protectRoute, getMyRecentSessions)

// step188: now lets make a dynamic route here below, that will be used to get the session by using its sessionId, thus here below ; it will be used to send the user the session that they want or clicked on, thus here below.

// step189: its dynamic when we use ":", so now when the user sends GET request on "/api/sessions/3565" > then we will find that session with this id, and send back corresponding response back to the client, thus here below.
router.get("/:id", protectRoute, getSessionById)

// step190: now we will have a POST endpoint to allow us to join a session when request comes at "/api/sessions/:id/join", thus here below ; to that "id" ka session, thus here below.
router.post("/:id/join", protectRoute, joinSession)

// step191: now finally we will have the endpoint here below to end the session with the session id using the "/api/sessions/:id/end" route, thus here below.

// step192: see the next steps in sessionController.js file now there, thus here below.
router.post("/:id/end", protectRoute, endSession)

export default router