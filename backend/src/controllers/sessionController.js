import { chatClient, streamClient } from "../lib/stream.js"
import Session from "../models/Session.js"

// step193: now lets create all the controller functions we defined in sessionRoutes.js file, thus here below.
export async function createSession(req, res) {
    try{
        // step194: it was a POST request, so here user will be sending us some data, thus here below.

        // step195: req.body by rule contains the data sent by the user ; so its an object, so we extract problem and difficulty from it, thus here below.
        const {problem, difficulty } = req.body

        // step196: now lets get the userId from the "req" object as we have the middleware protectRoute after which this runs and in protectRoute we had set that if the user is authenticated , it passes the middleware there and then the "user" object of the authenticated user is added to the "req" object there, thus here below.

        // step197: we will get the mongoDb id of the document object stored as "_id" in database of mongoDB by rule, added to the "req" object by the protectRoute middleware, thus here below.
        const userId = req.user._id; 

        // step198: similarly, lets get the clerkId from the "req" object, thus here below.
        const clerkId = req.user.clerkId

        // step199: lets validate if the required fields are there or not, thus here below.
        if(!problem || !difficulty){
            return res.status(400).json({ message : "Please provide problem and difficulty"}) // status code 400 means "BAD REQUEST"
        }

        // step200: else we generate a unique call_id for STREAM video calling there, thus here below.

        // step201: so we have wrote a statement to generate random ids thus there manually here below ; so each of them will have "session_" at the beginning, then : it will have the current time in milliseconds, and since time changes every now and then so its random too from each other ; then we have Math.random() to generate random numbers between 0 and 1, and then the number is converted to string base 36 to make it look shorter with random letters like : 0.728491239 → "0.q4h8zf2" i.e. uses 36 characters "a-z & 0-9" and then we take the characters starting from index 7 till the last from it so that we remove the starting ka decimal "0." and all as since number is between 0 and 1,so there will be decimal but it wont look good in the ids there, thus here below.

        // step202: to see what this will print, we can copy the string below and paste in INSPECT of any website terminal > console > paste > enter many times to see its result > random ids generated, which we will be using for/as our call_ids for the video calls for stream, thus here below.
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

        // step203: now lets create the session in the database using all these, and using the Session model, thus here below.
        const session = await Session.create({
            problem: problem, // can also write just "problem" instead of "problem: problem" as in JavaScript if the key_name === pair_name, then we can just write one of them and still its valid and understood by JavaScript there, thus here below.
            difficulty: difficulty,
            host: userId,
            callId: callId
        })

        // step204: now we will create a stream video call, using the instance we made in stream.js there for video calls seen there, thus here below.

        // step205: the "default" is the call type, we can have livestream, audio, custom, etc... for it too there ; then we also pass the callId for that call in it ; then we call the getOrCreate function to join the call if its exists with this id OR else create a new call with this id, thus here below ; thus its safer than only "create"w ithout checking there, thus here below.
        await streamClient.video.call("default", callId).getOrCreate({

            // step206: now we can also send extra information that we want to store with the call here below ; its like metadata or extra fields of React ; so it has who created the call with th clerkId of that user which comes from clerk aurhentication & then we can send our own custom data as well i.e. the problem, difficulty, etc ; thus here below.
            data: {
                created_by_id: clerkId,
                custom: {
                    problem: problem,
                    difficulty: difficulty,

                    // step207: this done so that the ObjectId type ka _id from mongoDB gets converted to string as objects are not expected or allowed here but only strings, so we have to convert it to string, thus here below.
                    sessionId: session._id.toString(), 
                }
            }
        })

        // step208: similarly now lets create a chat messaging from stream ; we saw in stream.js that chatClient is the instance we made there for chat messaging, thus here below.

        // step209: so we have the channel type as "messaging" here, can be livestream, etc too there ; so : "messaging" = normal WhatsApp/Discord style chat, thus here below ; and we also pass the unique callId for the chat channel to be created, thus here below.
        const channel = chatClient.channel("messaging", callId, {

            // step210: and we also pass an object with the name of the channel whatever we want, created by whom and then array telling who can join this chat there, we have it as an array of users who can join the chat ; intially the person who created the session is the only one who can join it, and Later we add more members dynamically here, thus here below.
            name: `${problem} Session`,
            created_by_id: clerkId,
            members: [clerkId],
        })

        // step211: now finally we do .create() to create the chat channel and send the request to the stream server and create a channel in the database there, thus here below.
        await channel.create()

        // step212: now we will send the response to the client, thus here below.
        res.status(201).json({ session : session }) // status code 201 means "SOMETHING CREATED"
    }
    catch(error){
        console.log("Error in createSession conroller:", error.message)
        res.status(500).json({ message : "Internal Server Error"}) // status code 500 means "INTERNAL SERVER ERROR"
    }
}

// NOTE HERE THAT : If we are not using a parameter here in routes, put a _ there ; don't think that we just do (res) as req not being used NOO : express thinks of it as that 1st parameter in a route is generally the req, so it doesn't see naming and trets res now as req here, SO PREVENT THIS AND JUST PUT "_" IF NOT USING A PARAMETER THERE/HERE, though its optional, even if you have the parameter here and not used, still there will eb no error, but its a convention to put "_" if that order in (_, _, _, ..) vala parameter is not used there, thus here below.

// export async function getActiveSessions(_,  res) {
export async function getActiveSessions(req, res) {
    try{
        // step213: now we want to get the active sessions from the database, thus here below.

        // step214: so we use the model to find all the sessions with status "active", thus here below ; but we also want to show the host of those sessions there, and that is not inside the session schema > we have host there, but its of type "id" > we want to find the user details from the User model with this id, thus here below.

        // step215: so we can use a populate function of mongoose ; so if we have "host" as type of object_id in sessions model, but we want its full name, so we use populate that reads the host id, goes to "ref" i.e. User model and fetch that user and replace that id with the full object of that user, thus here below ; so we pass here below > 1st argument "host" i.e. which field to replace and "name" as 2nd argument i.e. which field to fetch from the User, so it brings only "name profileImage email clerkId" of the user with this id, and not the full document of this user id from user, thus here below.

        // step216: sort here will sort it in descending order of createdAt i.e. place the newest sessions first, thus here below.

        // step217: also we can put a limit i.e. only show the latest 20 sessions there and not 100 all of them there for example, thus here below.
        const sessions = await Session.find({ status: "active" }).populate("host", "name profileImage email clerkId").sort({createdAt: -1}).limit(20)

        // step218: now we finally send this response to the client, thus here below.
        res.status(200).json({ sessions : sessions }) // status code 200 means "OK"
    }
    catch(error){
        console.log("Error in getActiveSessions conroller:", error.message)
        res.status(500).json({ message : "Internal Server Error"}) // status code 500 means "INTERNAL SERVER ERROR"
    }
}

export async function getMyRecentSessions(req, res) {
    try{
        // step219: lets get the userId from req because this route runs after passing through the protectRoute middleware and it by rule there attaches the "user" object to req if the user gets successfully authenticated and passes that middleware successfully there, thus here below.
        const userId = req.user._id

        // step220: now lets get the sessions where the user is either host or participant AND it has been completed ; because even if we were host or participant of that session, still in both cases, we should see them in the list of recent sessions, thus here below.
        const sessions = await Session.find({
            status: "completed",

            // step221: so it means when finding, we use OR here i.e. if the user is either host or participant of that session, then in any of that case, we show that session there, thus here below.
            $or: [{host: userId}, {participant: userId}]
        })
        // step222: now sort here will sort it in descending order of createdAt i.e. place the newest sessions first, thus here below and then we can also put a limit i.e. only show the latest 20 sessions there and not 100 all of them there for example, thus here below.
        .sort({createdAt: -1}).limit(20)

        // step223: finally we now send this response to the client, thus here below.
        res.status(200).json({ sessions : sessions }) // status code 200 means "OK"
    }
    catch(error){
        console.log("Error in getMyRecentSessions conroller:", error.message)
        res.status(500).json({ message : "Internal Server Error"}) // status code 500 means "INTERNAL SERVER ERROR"
    }
}

export async function getSessionById(req, res) {
    try{
        // step224: so now we will get the sessionId from the URL using req.params, which stores values that have ":" in route ; so since we had in routes file ":id" in route, so use EXACT SAME NAME "id" , DON'T CHNANGE , SHOULD BE EXACT AS IN URL , ELSE WON'T WORK AND MAY CAUSE ERROR OR ABNORMAL BEHAVIOUR, thus here below.
        const {  id  } = req.params

        // step225: now lets find the session with that id in the database using the Session model, thus here below.
        const session = await Session.findById(id)

        // step226: can call populate now here as when we get the session by its id, in that we have host : some_id_ref_to_user_model > i.e. it may be like -
        /*
            {
            _id: "65ab12cd34",
            status: "completed",
            host: "u12345"   // only ID
            }
        ; so now we want to replace that id with the full details of that user, thus here below -
                {
                _id: "65ab12cd34",
                status: "completed",
                host: {
                    name: "Nischay",
                    email: "abc@gmail.com",
                    profileImage: "img.png",
                    clerkId: "clerk_99"
                }
        ; thus : similarly we can populate the "participant" field as well, as it was also a object id reference to the user model, thus here below.
        */
        .populate("host", "name email profileImage clerkId")
        .populate("participant", "name email profileImage clerkId")

        // step227: now lets check if this session by this id is not found, then do the following, thus here below.

        // step228: this is needed because if user randomly types the URL with endpoint /sabdjsbkjsk > then that id has been written randomly by user, so if it not exists , return from there as well for the security reasons there, thus here below.
        if(!session){
            return res.status(404).json({ message : "Session not found"}) // status code 404 means "NOT FOUND"
        }

        // step229: now send this response to the client, thus here below.
        res.status(200).json({ session : session }) // status code 200 means "OK"
    }
    catch(error){
        console.log("Error in getSessionById conroller:", error.message)
        res.status(500).json({ message : "Internal Server Error"}) // status code 500 means "INTERNAL SERVER ERROR"
    }
}

export async function joinSession(req, res) {
    try{
        // step230: again like done above get the id from req.params, thus here below.
        const {  id  } = req.params;

        // step231: now also lets get the IDs of the user who wants to join the session with the above id, thus here below.
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        // step232: now lets find the session with that id in the database using the Session model, thus here below.
        const session = await Session.findById(id);

        // step233: also put a check that if user themselves go on a random URL tih any id like /join/898392 ; then its random they just trying to hack, so we will return from here itself with the following return JSON, thus here below.
        if(!session){
            return res.status(404).json({ message : "Session not found"}) // status code 404 means "NOT FOUND"
        }

        // some more checks here below, thus here below.
        if(session.status !== "active"){
            return res.status(400).json({ message: "Cannot join a completed session" })
        }
        if(session.host.toString() === userId.toString()){
            return res.status(400).json({ message: "You cannot join your own session as participant" })
        }

        // step236: we only have allowance of one-on-one interview, so since one when user created a session its 1/2 participants and when this user joined by clicking this join route, it will be 2/2 participants ; we won't allow more than 2 participants, thus here below.
        if(session.participant){ // if session already has a participant, then we will return from here itself with the following return JSON, thus here below.
            return res.status(409).json({ message : "Session is full and already has a participant"}) // status code 409 means "CONFLICT AND THIS CANNOT BE DONE/PERFORMED"
        }

        // step234: but if the session exists, then we will make the user as the participant of that session, thus here below.
        session.participant = userId;

        // step235: so now save this to the database as we updated the participant field, thus here below.
        await session.save();

        // step236: now currently a video call is going on with the HOST there, so when this user joins, we now want to add this user as a member of the STREAM video call and chat, thus here below.

        // step236: so we use the chat instance of the STREAM we had and use its channel method to refernce to the channel that was created with "messaging" type and of the id "callId", thus here below.

        // step237: so we get the chat room refernce in which user will be joined, thus here below.
        const channel = chatClient.channel("messaging", session.callId);

        // step238: now when the session was created, in that function : we had members : [clerkId] > so it had the host only there as host is the one who created the call and so his id is there, now we want to add the participant here too to that array, so the below line appends the participant id to that array, thus here below.

        // step239: NOTE HERE THAT : we don't have to add members for joining the vidoe call there, as anyone with the callId can join the video call ; so we access the video call channel above using the callId, but to use the chat feature in that video call, its private and needs members to be added ; thus here below ; thus so : Chat needs manual adding because it’s permission-based & Video auto-joins using callId, so no adding required, thus here below.
        await channel.addMembers([clerkId]);

        // step240: now send this response to the client, thus here below.
        res.status(200).json({ session : session }) // status code 200 means "OK"
    }
    catch(error){
        console.log("Error in joinSession conroller:", error.message)
        res.status(500).json({ message : "Internal Server Error"}) // status code 500 means "INTERNAL SERVER ERROR"
    }
}

export async function endSession(req, res) {
    try{
        // step241: again we get the id from req.params and the userId from req.user, thus here below.
        const {  id  } = req.params;
        const userId = req.user._id;

        // step242: now lets find the session with that id in the database using the Session model, thus here below.
        const session = await Session.findById(id);

        // step243: again now put a check here that if user themselves go on a random URL tih any id like /end/898392 ; then its random they just trying to hack, so we will return from here itself with the following return JSON, thus here below.
        if(!session){
            return res.status(404).json({ message : "Session not found"}) // status code 404 means "NOT FOUND"
        }

        // step244: now before ending the session, we need to check if the user is the host of that session, thus here below.
        if(session.host.toString() !== userId.toString()){ // convert to string as userId is _id of mongodb which is a string, so compare equal types here, thus here below.
            return res.status(403).json({ message : "Unauthorized: Only the host can end the session"}) // status code 403 means "FORBIDDEN TO DO SOMETHING"
        }

        // step245: now lets check if the session is already completed, then no use of going to end it again, thus here below.
        if(session.status === "completed"){
            return res.status(400).json({ message : "Session is already completed"}) // status code 400 means "BAD REQUEST"
        }

        // REASON FOR THE STEP246 AND 247 COMMENTED OUT IS IN STEP252 THERE BELOW, SO GO THERE, THUS HERE BELOW.

        /* step246: finally after all checks, we make the session to be completed, thus here below.
        // session.status = "completed";

        // step247: and then save this to the database as we updated the status field, thus here below.
        // await session.save();

        */

        // step248: now when we end the session, we need to get rid of the video calling session and the chat messaging we have in the STREAM as well there, as we had created them earlier when we created the call/session earlier there, thus here below.

        // step249: so lets delete the stream video call, so first get that call using the callId and the type "default" of which it was created in the createSession controller there earlier, thus here below.
        const call = streamClient.video.call("default", session.callId);

        // step250: now delete that call & we use hard: true to delete it permanently, thus here below.
        await call.delete({ hard: true });

        // step251: similarly lets now delete the chat room, thus here below.
        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete();

        // step252: add the status to be completed and saving in database do here after all the checks done successfully thus here belwo and not above as done in step246 and 247 there, thus here below.
        session.status = "completed";
        await session.save();

        // step253: finally send this response to the client, thus here below.

        // step254: see the next steps in step255.txt file now there, thus here below.
        res.status(200).json({ session : session, message : "Session ended successfully"})

    }
    catch(error){
        console.log("Error in endSession conroller:", error.message)
        res.status(500).json({ message : "Internal Server Error"}) // status code 500 means "INTERNAL SERVER ERROR"
    }
}
