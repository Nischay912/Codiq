// step1227: now lets create hooks to be called and used in different pages, thus here below.

// step1228: use "rfce" to create a react functional export component's boilerplate first here/there, thus here below.

//   step1229: so first > we get the Stream’s chat SDK(Software Development Kit) to be used for the chat messaging system there, thus here below.
import { StreamChat } from "stream-chat"

// step1230: now lets get the functions to be used from stream.js file & the functions to be used to make API calls from sessions.js file, thus here below.
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream"
import { sessionApi } from "../api/sessions"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

// step1231: we will also be de-structuring the session, loadingSession, isHost, isParticipant from props, thus here below.
function useStreamClient({session, loadingSession, isHost, isParticipant}) {
    // step1232: now here we will not be returning a JSX like <div>....</div>, but we will return an object of hooks to be used in the other files, thus here below.

    // step1233: first we get all the states to be used here, thus here below.

    // step1234: first for the : video client instance, thus here below.
    const [streamClient, setStreamClient] = useState(null)

    // step1235: then for the current video call object, and when a call not started yet, so initially it will be null, thus here below.
    const [call, setCall] = useState(null)

    // step1236: now apart from video call client, we also have the stream chat client, thus here below.
    const [chatClient, setChatClient] = useState(null)

    // step1237: then for the chat channel 1-to-1 channel, thus here below.
    const [channel, setChannel] = useState(null)

    // step1238: finally since the video call will be initially shown there as connecting as soon as we go on sessions page, so we keep it TRUE initially and once the call starts, we will make it FALSE ; so there we can : Show loading spinner, and Disable UI until ready, thus here below.
    const [isInitializingCall, setIsInitializingCall] = useState(true)

    // step1239: now we have a useEffect here below, thus here below.
    useEffect(()=>{
        // step1240: lets first have some temporary varibales using "let" , as their values will change later inside the useEffect, and const cannot be re-assigned new value once declared and initialized, so better to use "let" to prevent error like "TypeError: Assignment to constant variable." ; (You can change properties inside an object declared with const, but you cannot reassign the variable itself) here/there, thus here below.
        let videoCall = null;
        let chatClientInstance = null;

        // step1241: now we will be calling an async function in this useEffect ; as by rule useEffect itself can't be declared async, so we have to use async function here to : Initialize video + chat connection, thus here below.
        const initCall = async () => {
            // step1242: first check if session exists, try to get the callId and if callId for the session not there, just exit, Because without callId, no call can be created.This prevents unnecessary execution ; as it will fail obviously later as no callId there, so better to return here itself, than to proceed ahead and later exit again there as there is no callId, thus here below.
            if(!session?.callId){
                return
            }

            // step1243: again now check that : if the logged in user is neither host nor participant due to some glitch in assigning roles from backend, then also return as : only host or participant can initialize a call and join a session respectively, thus here below.
            if(!isHost && !isParticipant){
                return
            }

            // step1417: so we added this check as if this is not added, we were getiing errors like : error was coming later that cannot join call that has ended, when we tried to end session from one account, then showed this error on participant screen when he was navigated > and said in console : "can't use a channel after client.disconnect was called" and later showed toast on refrehsing that "failed to join video call" > and in console "call not exists", thus here below.

            // step1418: so this if check added so that : if session is completed just return don't even try to make a call ahead as may give error like "failed to join video call" > and in console "call not exists" as once completed > channel and call got disconnected and now not defined , so may get these errors if this not put up here/there, thus here below.

            // step1419: so now see the next steps in step1420.txt file now there, thus here below.
            if(session?.status === "completed"){
                return
            }

            try {
                // step1244: now we know that in chatController.js file of backend, we were returning response , which by rule comes as an object so either get it here as "res" and later do res.token, res.userId and all ; rather destructure the fields sent from backend needed here using {...} directly here/there, thus here below.

                // step1245: also by rule here : we in backend had returned in response : {token, userId, userName, userImage} ; so while destructuring , the names of these fields should be EXACTLY SAME here/there, thus here below.

                // step1246: and the call to backend endpoint made using the sessionApi made in sessions.js file, thus here below.

                // step1247: also name of method keep same as in chatController.js file of backend, thus here below.
                const {token, userId, userName, userImage} = await sessionApi.getStreamToken();

                // step1247: now we again now call the initializeCall method made earlier and we saw that there > that we passed the "user" as well as the "token" as parameters in it here/there, thus here below.

                // step1248: so now : we since returned the created client in that function, so lets save the returned client in a variable here/there, thus here below.
                const client = await initializeStreamClient(
                    {
                        // step1249: STREAM expects user object as : {id, name, image} ; but we got them as different names from backend ; so send the data by renaming and assigning to the same what stream expects, thus here below.
                        id: userId,
                        name: userName,
                        image: userImage
                    },

                    // step1250: 2nd parameter needed in the initializeCall method was token, that was created by the in-built function in the backend, and now we send it there > which is used for authentication & without this token , the call will fail and we can't initialize the call i.e. Stream rejects connection then there, thus here below.
                    token
                )

                // step1251: now lets update the client state with this client, so that this client we got gets stored globally in the state too and not only limited inside this useEffect, thus here below.
                setStreamClient(client)

                // step1252: now : we use the "call()" in-built method of StreamVideoClient, which returns a call object & we pass in it, the "call type" i.e. "default" here as in backend also we had set up to start a "default" video call using stream there in sessionController.js file there ; and we also pass the "id" of the call to create or join here/there ; and we know session we pass here will be an object having the callId of the session that we will be using to join the call here/there, thus here below.
                videoCall = client.call("default", session.callId)
                
                // step1253: then we have this "join" which is a built-in method under the call object created above using call() ; and then we pass : {create: true} > which ensures that : If call does not exist → create it ; If call exists → just join it, so : HOST creates and joins and participants can join the existing call started by the host, thus here below.
                
                // step1254: if "create:true" not there, then new calls will not be able to be created saying "callId" not exists, so this "create: true" will allow both to join exixsting calls, as well as create new calls, thus here below.
                await videoCall.join({ create: true })
                setCall(videoCall) // update the call state with this videoCall instance created/formed here, thus here below.

                // step1255: now we get the stream api key using the syntax provided by VITE : to access frontend/.env & in backend folder, its using process.env, thus here below ; and these access the .env with prefix "VITE", thats why prefix "VITE" is must in .env here to access it using this syntax there ; its a rule that : when using import.meta.env. : In Vite, environment variables must start with VITE_ or they won’t work, this is because Vite prefixes environment variables with VITE_ by default and then only accesses them from .env directly without any import needed of that file like backend's dotenv we had there with process.env there ; but here meta.env used by this logic here/there, thus here below.
                const apiKey = import.meta.env.VITE_STREAM_API_KEY

                // step1256: now : we get the StreamChat from package we had, and then : create or return an existing client ; it follows the policy that only one chat client instance can be created per API key, thus here below.

                // step1257: so here : Instead of doing: new StreamChat(apiKey) ; Stream recommends to do : StreamChat.getInstance(apiKey) as it follows singleton pattern i.e. Only ONE instance of something should exist i.e. here : Only one Chat client per API key ; so now if we call this getInstance many times too, still : It does NOT create new clients again and again ; Creates it once (first time) and then : Returns the same existing one (next times) ; thus it prevents : Multiple WebSocket connections, Duplicate listeners, memory wastage, etc., thus here below.

                // step1258: thats why this is important here : as this is inside a useEffect and we know that useEffect runs very much time whenever even a single state of the dependency array changes there and so, to prevent multiple duplicate connections, we use this getInstance method here ; also In development mode, React sometimes runs effects twice on purpose due to strictMode , so there also to prevent duplicate connection, this is helpful here/there, thus here below.

                // step1260: the apiKey helsp to identify if there is already a client for this API key, if yes then it returns the same client, else it creates a new client, thus here below.
                chatClientInstance = StreamChat.getInstance(apiKey)

                // step1261: now we connect the user to the stream chat, by sending what all stream needs i.e. the id, name, image to identify who is connecting and the 2nd object as the "token", same what all we sent to initializeCall method above in step1249 and 1250 there above here/there ; so : its > Used for authentication ; and without this token generated by stream in backend file of chatController.js to connect , so without that token → chat won’t connect here/there, thus here below.
                await chatClientInstance.connectUser(
                    {
                        id: userId,
                        name: userName,
                        image: userImage,
                    },
                    token
                )

                // step1262: then again we Store chat client in React state ; so that it is not just limited to this useEffect, but can be used globally anywhere using that state ; Without this → UI can’t access it as then it will be limited to this useEffect only here/there, thus here below.
                setChatClient(chatClientInstance)

                // step1263: now we create a channel or a refernce to a channel using the type of channel we want and the channelId i.e. the parameters it expects, thus here below.

                // step1264: we pass the type to be "messaging" as in backend sessionController.js file there, so pass same type here also to tell to create a "messaging" type chat channel which is best for 1-to-1 small chat room and not "livestream" or any other type; and then the callId as usual from the session object, thus here below.
                const chatChannel = chatClientInstance.channel("messaging", session.callId)

                // step1265: then similar to "join" in video call ; here we have "watch" to start sending and receiving messages and enable real-time updates ; without watch() channel will still exist that was created above but now : we won't recieve messages or updates, thus here below.
                await chatChannel.watch()

                // step1266: now we store the chat channel created also in the global state, so that it can be used in the rest of the app ; without this → UI can’t access it as then it will be limited to this useEffect only here/there, thus here below.
                setChannel(chatChannel)
            }
            catch (error) {
                toast.error("Failed to join the video call!")
                console.error("Error in initCall i.e. error initializing call", error)
            }

            // step1267: so now : we have here that > since this initializing state was initially TRUE, so that as soon as we join a session, we can show the loading spinner there, telling that we are joining the call ; but now even if success there or error in connecting the call ; in either case , this finally runs by rule ; and so : we want to stop showing that spinner even if there is success or error joining the call, just show the error toast and stop showing the loading spinner there, so that spinner is not running indefinitely here/there, thus here below.
            finally{
                setIsInitializingCall(false)
            }
        }

        // step1268: now we call this function made above ; since it was an arrow function, it won't be called above itself ; we just defined it above ; so now lets call it here below, thus here below.

        // step1269: this check below is very important because : if we do initCall() very early , that "session" by that time has not yet loaded and is undefined, then session.callId above will not exist too and will give error like "Cannot read properties of undefined (reading 'callId')" ; so now we check that "session" exists before calling initCall() and only then make this call ; once the session is loaded , this dependency array runs this useEffect again and so : we can then call this initCall() here/there, thus here below.

        // step1270: also > we wait till the session data is being loaded and the loadingSession being taken here as prop by rule is TRUE till the session data is being fetched from backend and becomes FALSE when the loading completed ; so only then we call initCall() here/there, thus here below.
        if(session && !loadingSession){
            initCall()
        }

        // step1272: now at the very end of the useEffect(), we can have a function that will be returned ; so any function that is returned inside a useEffect at the end is called the "cleanup" function here/there, thus here below.

        // step1273: its done to do cleanup for performance boosting/improving reasons > as : when component unmounts (user leaves page) > or before the useEffect runs again next time when the dependency array changes i.e. this won't run like DON'T THINK THAT EVERYTIME USEEFFECT RUNS, THIS WILL ALSO RUN ; NO > it runs only when dependecnices array changes or user leaves the session ; and don't think like : Won’t it disconnect immediately after connecting > NO : Because: after first successful connection, Dependencies don’t changeEffect doesn’t re-run and so the : Cleanup doesn’t trigger again there, thus here below.

        // step1274: so overall > If dependencies stay same → Effect runs once → Cleanup waits quietly ; If dependencies change → Cleanup runs → Then effect runs again ; If component unmounts → i.e. if user goes away from the current component where this useEffect runs i.e. user goes away from session page then obviously the <SessionPage> and all components in it gone now i.e. unmounts, so then -> Cleanup runs once and then thats it all cleanup done to cleanup memory , end the calls chats and all here/there, thus here below.
        return () => {
            // step1275: so this cleanup is needed because we opened Video connection, Chat connection, WebSocket connections ; so : If you don’t close them : Memory leaks, Duplicate connections, Weird bugs or due to long time un-necessary video call running in background can cause : Performance issues ; So cleanup closes everything properly there, thus here below.
            
            // step1276: now here we have something called : IIFE = Immediately Invoked Function Expression ; here we use syntax of ()(); i.e in the first () write the function defination and use the 2nd () to call it also there itself below to itself whenever it renders and runs, so it calls itself there, thus here below.

            // step1277: its "async" as cleanup needs await, used inside this to, thus here below.
            (async() => {
                try{

                    // step1278: so we check that if video call is still existing and user left as then only this function runs we saw above, then we use the leave() method to leave the video call and disconnect from the video call room, thus here bek=low.
                    if (videoCall){
                        await videoCall.leave();
                    }

                    // step1279: then we check that if chat messaging is still existing and user left as then only this function runs we saw above, then we use the disconnectUser() method to disconnect the user who left now from the chat room and Close WebSocket and Stop listening to messages ; as if not then new incoming messages may be leaked  to others, so first deiconnect the previous user who left from chat room to prevent memory leak and stop user from still recieving the messages there veen after leaving the session page here/there and so this disconnect will now ensure chatRoom closed so that the new messages still coming also stop as vo uss user pe toh ab jaa ni ra as vo toh chala gyaa , but someone els emay see and reciev his messaga and this is not good for personal and security reasons here/there, thus here below.
                    if (chatClientInstance){
                        await chatClientInstance.disconnectUser();
                    }

                    // step1280: finally we call the async method which is always called using "await" here below that we made earlier to set the client to null and all there created earlier to fully close the video SDK and chat SDK connections here/there after the user left the session page here/there, thus here below.
                    await disconnectStreamClient();
                    }
                catch (error) {
                    console.error("Error came in cleanup:", error);
                }

            // step1281: so this () again at the end calls this method by itself immediately as soon as this function defination renders and is run there, thus here below.
            })();
        }


    // step1271: so here > this useEffect runs whenever the session changes as by rule initially session is undefined and so when its fetched with data , run this again to make call of initCall as its made only when the if statement above is true ; then same for loadingSession as its TRUE initially so the if statement above not makes the initCall to run > so once it becomes FALSE when all data fetched, then it changed, so run this useEffect again and now it satisfies the above if condition and the initCall() runs ; also same way : if the user role changes like if a user was not a participant i.e. if the video call had 1/2 only then participant joined so now 2/2 there ; so in all this case this should re-run to show the proper functioning there ; also when session loaded, after some time session?.host runs that we had in many places , so we want to re-run with new latest data again and then so make this useEffect run again there also when isHost or isParticipant changes ; so in all these cases this should re-run to show the proper functioning here/there ; thus here below.
    },[session, loadingSession, isHost, isParticipant])

    // step1282: so now we return the important states and methods from this hook in the form a object, so that it can be used in components where this hook is used in the other files here/there, thus here below.

    // step1283: see the next steps in SessionPage.jsx file now there, thus here below.
    return {
        streamClient,
        call,
        chatClient,
        channel,
        isInitializingCall,
    }
}

export default useStreamClient