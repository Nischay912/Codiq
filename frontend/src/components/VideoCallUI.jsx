// step1323: first do the rfce to get the react functional export component's boilerplate, thus here below.

// step1324: now lets get the imports needed for this file now, thus here below.

// step1325: so here: we getting the in-built components from @stream-io/video-react-sdk ; <CallControls> is used to render the read-made control bar instead of us building it ; like mute/unmute button ; camera on/off ; leave the call button and so on ; and also <CallControls> : automatically connects to the active call (because of context from StreamCall) and we don't need to pass the call manually to it ; similarly > CallingState is an ENUM (a fixed set of states) > like "idle", "joining", "joined", "ringing", "left/exitted" ; so instead of using the strings to show manually by us, stream provides it ; SpeakerLayout is a pre-built component to automatcially arrange the active speaker large, others samller dyncamically ; so when someone speaking, it automatically arranges the one speaking the most at 1st place there automatically ; then the useCallStateHooks is used to manage the participants, microphone and call states and other video tracks there and so on other internal states ka access we get using that there ; to help us tell who joined, what is the current state of call/call state going, thenis the user still connected and so on, thus here below.
import { CallControls, CallingState, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk"

// step1326: then the useNavigate is used to change the page programatically i.e. when navigate() function alled, it will take us there ; unlike Link where we had to click to certain text wrapped in Link to go to that page there, thus here below. 
import { useNavigate } from "react-router"

// step1327: finally : this import is from the stream-chat-react package, which is Stream’s React SDK for building real-time chat interfaces. The Chat component acts as the top-level provider that connects your UI to the authenticated chatClient and makes chat functionality available through context. Inside it, the Channel component binds the UI to a specific chat room (the channel you created for the session). The Window component acts as a layout container for the chat area, typically wrapping the message display and input. MessageList automatically renders and updates the list of messages in real time, while MessageInput provides the text box and sending logic for new messages. Finally, Thread is used to display and manage replies to a specific message, enabling threaded conversations. Together, these components allow you to build a complete, real-time chat interface connected to your session.
import { Chat, Channel, MessageInput, MessageList, Thread, Window } from "stream-chat-react"
import { Loader2Icon, MessageCircleMore, MessageSquare, MessageSquareMore, UsersIcon, XIcon } from "lucide-react"
import { useState } from "react";

// step1368: we will not be able to see the callControl there till now as no styles or buttons have been designed ; but we can get the styles and all to be used directly here from STREAM DOCUMENTATION > it provides the styles for the video calling to be shown for the callContorls there and her ebelow is the complete path that needs to be imported to show the styles there, thus here below.

// step1369: so to get All the UI design for Stream components and show the callContorls and all design and style in it, we import the styles from this path, thus here below.
import "@stream-io/video-react-sdk/dist/css/styles.css"

// step1409: now similar to the styles we gave to the video callControls provided by stream using the above import, similarly we use the following import to style the chat section provided by stream ; and for that no need to put "str-video" and all prefix classes in the parent div like we did for video styles earlier in step1370 and step1369 and all there ; just use the import below thats it , all the styles will be loaded and applied to the <Chat>...</Chat> architecture we made and wrote there below in the chat section to be displayed here/there, thus here below.

// step1410: now see the next steps in step1411.txt file now here/there, thus here below.
import "stream-chat-react/dist/css/v2/index.css"

// NOTE HERE THAT HERE WE : destructure the props sent to this component and by rule , the name of props here should match the name of props that were used while sending on the left hand side there in the component like : <VideoCallUI chatClient = {....}, .... /> : so the left hand side names should be used here also for destructuring below like chatClient and so on... here/there, thus here below.
function VideoCallUI({chatClient, channel}) {
    // step1328: now lets have some states that will be used in this component, thus here below.

    // step1329: so we get the navigation refernce from the hook and store it in a variable to use it now to navigate programatically when this function runs and not like Link where we had to click to certain text wrapped in Link to go to that page there, thus here below.
    const navigate = useNavigate();

    // step1330: now this useCallStateHooks returns object having many functions {useCallCallingState, useParticpantCount, ....} ; so we destructure the ones needed now here below using the syntax { .... }, thus here below.

    // step1331: so these will help to read the call state and one to count the number of participants in the call, thus here below.
    const { useCallCallingState, useParticipantCount } = useCallStateHooks();

    // step1332: now lets get the state of the call, used to get the current state of the call and has many values that can be accessed like : callingState.IDLE , callingState.JOINING , callingState.JOINED , callingState.RINGING , callingState.LEFT , thus here below.
    const callingState = useCallCallingState();

    // step1333: we then use this hook from the hooks we got in-built above to get the total participant count in the call and store it in the variable present, thus here below.
    const participantCount = useParticipantCount();

    // step1334: now this is our manually created state to tell when to show the chats section and when not ; initially FALSE means don't show the chats there initially when page loaded and once there when we will click the CHAT icon, then only we will set this to TRUE and allow the chat section to be open and shown here/there, thus here below.
    const [isChatOpen, setIsChatOpen] = useState(false);

    // step1335: now if the callingState is equal to JOINING provided by useCallCallingState() hook, then we will return the following JSX code below that will be shown when we are still joining the call there and when the call still in the process of connecting ; once we get callingState = JOINED : Now the condition becomes false ; so now : React skips this block and renders the main UI, thus here below.

    // step1336: in the sessionPage we had wrapped this component in StreamCall and passed the "call" object there, so from there only this gets access to current state of call and gets it inot callingState using the useCallCallingState() hook ; and CallingState toh we know is an ENUM (a fixed set of states) ; like "idle", "joining", "joined", "ringing", "left/exitted" ; so we access its values using "." operator like CallingState.JOINING, etc, and all this : stream provides it to compare which of those state is the current call in ; so CallingState is : dictionary of allowed states and callingState is the current state of the call passes in teh Streamcall component in the sessionPage which wrapped this component there and thus internally passed it to these internally from there only the status of the call we are in currently here/there, thus here below.
    if(callingState === CallingState.JOINING) {
        return (
            // step1337: so now the outer div here below : uses Tailwind CSS where h-full makes the container take full height of the parent panel, flex enables flexbox layout, items-center vertically centers the content, and justify-center horizontally centers it, ensuring the joining loader stays perfectly centered, thus here below.
            <div className="h-full flex items-center justify-center">

                {/* step1338: then the div below : uses Tailwind CSS where text-center horizontally centers all inner text and inline elements like the spinner icon, thus here below. */}
                <div className="text-center">

                    {/* step1339: then we have the div below which : uses Tailwind CSS + DaisyUI theme color where w-12 h-12 sets a large icon size (48px), mx-auto horizontally centers the icon, animate-spin applies continuous rotation animation to indicate loading, text-primary applies the primary theme color, and mb-4 adds spacing below the icon before the message text, thus here below. */}
                    <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />

                    {/* step1340: finally we have a paragraph here which : uses Tailwind CSS where text-lg increases font size slightly to make the joining message more readable and noticeable, thus here below. */}

                    {/* step1341: so since only one div is inside the flexbox and all these are inside that div ; so all these are not indepndent components of flexbox ; so don't think they will be in one row ; NOO : that flexbox was just to make the only component div inside it which is the conytainer to be central of the screen using item and justify center and then all this is inside it only and since div and p are block level elements, so : they appear one below the other, thus here below. */}
                    <p className="text-lg">Joining the call...</p>
                </div>
            </div>
        )
    }

    return (
        // step1342: now here : we have a div which : uses Tailwind CSS where h-full makes it take full parent height, flex arranges children horizontally, gap-3 adds spacing between main video section and chat section, and relative allows absolutely positioned elements inside to be positioned relative to this container if needed, thus here below.
        // <div className="h-full flex gap-3 relative">

        // step1370: finally also add this "str-video" in the topmost div of the JSX being returned ; as by rule of STREAM DOCS TELLS THAT : only then it activates the STREAM-THEME SYSTEM FOR CALL COMPONENTS AND ALL, in the entire app and show the colors and all for the call component ; actually when we imported the styles form stream in step1369 , all the classes gets scoped and grouped together in this "str-video" class ; so the entire JSX being returned must have this class on its topmost div there ; thus overall : str-video → required theme wrapper that activates Stream’s styling system here/there, thus here below.

        /* 
        ALSO IN THIS FILE BELWO : WE HAVE SO MANY "RELATIVE" CLASS GIVEN TO PARENT THOUGH THERE IS NO CHILD CLASS INSIDE IT, THAT HAS "ABSOLUTE" CLASS > THEN WHY WAS RELATIVE EVEN GIVEN HERE BELOW ?

        > IT WAS BECAUSE : WE ARE USING SO MANY INTERNAL IN-BUILT SDK STREAM COMPONENTS USED HERE LIKE "SPEAKERLAYOUT" AND ALL, WHICH INTERNALLY USES "ABSOLUTE" CLASS ; SO IF WE DON'T USE RELATIVE ON THE PARENT CLASSES, THEN IT WON'T GET POSITIONED CORRECTLY WITH RESPECT TO THESE RELATIVE PARENTS , AS BY RULE ABSOLUTE CHILD IS PLACED ALWAYS W.R.T THE CLOSEST PARENT WITH "RELATIVE" CLASS IN IT THERE.

        SO HERE: THATS WHY THE TOPMOST DIV HERE "RELATIVE" MAKES THE SPEAKER LAYOUT TO BE POSITIONED INSIDE THIS ONLY I.E. W.R.T TO THIS DIV CONTAINER ONLY ; SAME WAY OTHER "RELATIVE" USED BELOW TO POSITION CALL-COMPONENTS AT CORRECT PLACE AS WE HAD "H-FULL" IN THE CLASS WRAPPING THIS VIDEOCALL COMPONENT IN SessionPage > SO : IT TAKES H-FULL AND SO THEN SINCE ITS RELATIVE , THE INTERNAL CALL-CONTROLS , TAKE THE BOTTOMO-MOST POSITION WITH ABSOLUTE CLASS INTERNALLY BY RULE : thats why making this relative make sit to be positioned sing its internal "absolute and bottom-0" class to the bottom of this h-full vala div i.e. places the call components at the bottom of the screen as h-full mea sit takes full screen and it has absolute bottom-0 i.e. parent jo "relative" hai, uske sabse niceh gets placed ; if h-full rmeoved from sessionPage, it will be on bottom-most of jitna bhi area video layout taking ; thats why to make it be at bottomost of screen we used h-full , as now since parent is h-full, then when the child SDK in-built class used in it "absolute bottom-0" it gets placed at bottom of this parent i.e. the call components gets placed at bottom of the screen thta we wanted too here/there, thus here below.
        */

        // step1371: now see the next steps in step1372.txt file now there, thus here below.
        <div className="h-full flex gap-3 relative str-video">

            {/* step1343: so now here again we have a div which : uses Tailwind CSS where flex-1 allows this section to take remaining horizontal space, flex flex-col stacks its children vertically, and gap-3 adds spacing between internal sections, thus here below. */}
            <div className="flex-1 flex flex-col gap-3">
                
                {/* step1344: now here > we now have the first component of the vertical flexbox as the top header that has : the number of participants followed by the chat button there, thus here below. */}

                {/* step1345: so the top header containing the number of participants and chat text will be on both ends of this section as it has justify-between, thus here below. */}
                <div className="flex items-center justify-between gap-2 bg-base-100 p-3 rounded-lg shadow">

                    {/* step1346: so now lets have the users icon and the number of participants in one component of flexbox on leftmost side and has gap-2 between them, thus here below. */}
                    <div className="flex items-center gap-2">
                        <UsersIcon className="w-5 h-5 text-primary" />
                        <span className="font-semibold">
                            {/* step1347: show the plural if there is more than 1 participant, thus here below. */}
                            {participantCount} {participantCount === 1 ? "participant" : "participants"}
                        </span>
                    </div>

                    {/* step1347: now the 2nd component inside the flexbox is this section which will be on the rightmost end as we had justify between in the parent flexbox ; so the previous div was leftmost, so this rightmost with gap between them, thus here below. */}
                    
                    {/* step1348: so here we have the chat icon which will be shown only if the chatClient is there and is not undefined and also there should be the channel initialized, if they are not yet loaded there, then we will not show the chat icon and show only once they are loaded there, thus here below. */}

                    {/* step1349: NOTE THAT : these chatClient and channel came here as prop from SessionPage, so once its loaded and initialized there by functions we wrote there, only then it will be NOT UNDEFINED NOW HERE and then only it will render the chat icon below, thus here below. */}
                    {(chatClient && channel) && (
                        <button
                            // step1350: so we toggle if chat to be shown or not on click ; i.e. if chat open, close it and vice-versa, thus here below.

                            // step1351: its an arrow function and not just {setIsChatOpen(!isChatOpen)} because if we do so it will run the function as soon as the page renders, but NOO : we want it to run only when user clicks the button, sof ro that we use arrow function always here/there y rule there, thus here below.
                            onClick={() => setIsChatOpen(!isChatOpen)}

                            // step1352: so now here : btn and btn-sm and gap-2 are always applied there i.e. it uses : DaisyUI + Tailwind CSS where btn: applies base button styling, btn-sm: reduces size, gap-2: spaces icon and text, and then we have dynamic class which switches between > btn-primary(highlighted state when chat is open) and btn-ghost(minimal style when closed) there, thus here below.
                            className={`btn btn-sm gap-2 ${isChatOpen ? "btn-primary" : "btn-ghost"}`}

                            // step1353: the "title" is used to show the TOOLTIP i.e. the text to be shown there when the button is hovered there i.e. if we hover onto the button and wait, we see some text tooltip there, it comes due to this "title" ; so we show different tooltip based on if currently chat is open, show there clcik to Hide chat and if the chat is closed, show there click to Show chat, thus here below.
                            title={isChatOpen ? "Hide chat" : "Show chat"}
                        >
                            {/* step1354: so now inside the button tag, here we have what to display inside the button there, thus here below. */}

                            {/* step1355: HERE NOTE THAT : w-4 and h-4 both can be used or equivalent to that size-4 can be sued ; as by rule : size-x means h-x and w-x both of same value applied there ; so instead of w-4 and h-4 both of value "4", we can use size-4, thus here below. */}
                            <MessageSquareMore className="size-4" />
                            Chat
                        </button>
                    )}
                </div>

                {/* step1356: so now we cam out of the flexbox header at top that was for the number of participnats and the CHAT button there ; so now we are still inside the flex-col ; so thenext div inside i.e. the div below now will appear below that header with participant and CHAT button now as its flex-col i.e. all the children are stacked vertically one below the other, thus here below. */}

                {/* step1357: so below the header, we have this div which : uses Tailwind CSS + DaisyUI theme color where flex-1 makes this video area take the remaining vertical space inside the column layout, bg-base-300 applies a slightly darker surface background from DaisyUI theme (good contrast behind video tiles), rounded-lg softens the corners, overflow-hidden ensures video tiles or internal elements don’t spill outside the rounded corners, and relative allows absolutely positioned elements (like overlays, controls, etc.) inside this container to position relative to it, thus here below. */}
                <div className="flex-1 bg-base-300 rounded-lg overflow-hidden relative">

                    {/* step1378: Now this SpeakerLayout is a pre-built component from @stream-io/video-react-sdk that automatically arranges video participants based on who is currently speaking. It dynamically detects the active speaker and places them in a larger, prominent position while arranging other participants in smaller tiles. This layout updates in real-time as speaking activity changes. It automatically connects to the active call through context (provided earlier by <StreamCall>), so we do not need to manually pass the call object to it. It internally listens to participant video tracks, audio activity, and call state to intelligently manage layout without us writing custom grid logic, thus here below. */}

                    {/* step1379: also : Before adding <SpeakerLayout />, the app was successfully connecting to the video system using <StreamVideo> and joining the call using <StreamCall> that wrapped this component in SessionPage earlier there, but we were not rendering any component that actually displays participant video tracks on the screen. That means the call was active in the background, participants were connected, and video streams existed — but nothing in the UI was subscribed to those streams or instructed to render them visually. When we added <SpeakerLayout />, that component subscribed to the call context, accessed the participants’ video and audio tracks, and rendered those streams in a visual layout on the screen. In simple terms: StreamVideo sets up the video system, StreamCall activates the specific call, but SpeakerLayout is the component that actually displays the video streams. Without a layout component, the call runs but nothing appears visually. */}

                    {/* step1380: thats why on adding this component, VIDEO starts displaying on the screen there because :SpeakerLayout is the component that actually displays the participant video on the screen ; before this, the call was connected, but nothing was rendering the video. */}

                    {/* SO OVERALL : this adds the layout for the video to be displayed on ; and its called Speaker Layout as based on speaker whoever is talking the loudest is placed at top and then one below other based on speaker levele, wheneevr osmeone else speaks others quiet, their layout of vidoe comes at top, like that there, thus here below. */}
                    <SpeakerLayout />
                </div>

                {/* step1360: now after the SpeakerLayout , we will pass the component to render the call controls, thus here below. */}

                {/* step1361: callControls refer to the toolbar we have in the call to toggle the mic, camera ; add reactions , share screen record call and end call button there, thus here below. */}

                {/* step1362: and the END CALL button of callControl will only make the participant to leave the call ; it won't end the session as only HOST can end the session there, thus here below. */}

                {/* step1363: so the div here below : uses Tailwind CSS + DaisyUI theme color where bg-base-100 applies the main surface background color, p-3 adds internal padding, rounded-lg gives smooth rounded corners, shadow adds subtle elevation for visual separation, flex enables flexbox layout, and justify-center horizontally centers the CallControls component inside the container, thus here below. */}
                <div className="bg-base-100 p-3 rounded-lg shadow flex justify-center">

                    {/* step1364: now we here below : use the Stream Video SDK component CallControls, which renders a ready-made control bar (mute/unmute, camera on/off, leave call, etc.) automatically connected to the active call context. The "onLeave" prop overrides the default leave behavior by executing the arrow function when the user clicks the leave button. Inside it, navigate("/dashboard") (from React Router’s useNavigate) programmatically redirects the user to the dashboard page after leaving the call. The arrow function ensures navigation happens only when the leave button is clicked, not during render, thus here below. */}

                    {/* step1365: we now have this callControls component rendered there ; onLeave is basically the function that runs when the red “End Call” button is pressed inside <CallControls /> there ; so we are here making that ; when the user clicks on the RED END CALL button provided by the callControls, we will not end the session as by rule session can be ended by HOST only using the END-SESSION we made earlier in the left panel, thus here below.  */}

                    {/* step1366: so instead , when someone presses the END CALL button there , it will not end the session ; but navigate the person to the dashboard page, thus here below ; and thats the used o navigate by rule ; that its not like Link which runs only when clicked on the text wrapped with Link ; but navigate function takes us to new page wheneevr programatically this function is called or runs anywhere, it takes to the passed path or url inside it, thus here below. */}

                    {/* step1367: so overall : once user leaves the call using the RED END CALL button of the callControl, they will be taken to the dashboard page using the navigate method/function, thus here below. */}
                    <CallControls onLeave={() => navigate("/dashboard")} />
                </div>
            </div>

            {/* step1373: so now > we will have the chat section to be made there now here, thus here below. */}

            {/* step1374: this component is placed as the 2nd component after the above div of video section, inside the outermost <div> with "flex" in it ; i.e. this will now appear on right of the video section there as their parent is flexbox and normal flex direction is hroizontal i.e. side by side there, thus here below. */}

            {/* step1375: so here > we render the chat section only if : both chatClient and channel exists > i.e the logged-in user(StreamChat connection) and Specific chat room we had passed as prop in this function from sessionPage , they take time to initialize intially ; so we don't want this to render when they are "undefined" initially there as soon as we load the page there, but instead we want it to be displayed only once they are initialized well in sessionPage and then passed to this and used here, as then its NOT UNDEFINED, and thus good to go to be used, as else if we don't do this then undefined may come and cause app crash with errors like "cannot read properties of undefined", thus here below. */}
            {chatClient && channel && (

                // step1376: now the classes here below are dynamic : here the first few classes i.e "flex flex-col rounded-lg shadow overflow-hidden bg-[#272a30] transition-all duration-300 ease-in-out" are outside ${..} , so they will always be applied and these classes : uses Tailwind CSS where flex enables flexbox layout, flex-col stacks children vertically, rounded-lg gives smooth rounded corners, shadow adds elevation effect, overflow-hidden ensures content does not spill outside the rounded edges (important when width becomes 0), bg-[#272a30] applies a custom dark background color to the chat section container : using arbitrary Tailwind value, transition-all enables smooth animation for all changing properties, duration-300 sets animation time to 300ms, and ease-in-out makes the transition smooth at start and end when we try to bascically toggle and see and close the CHAT SECTION here/there, thus here below.

                // step1378: then we also : use dynamic Tailwind classes where if "isChatOpen is true" which by rule becomes true or false based on when we click the CHAT button there, we had set earlier to toggle this isChatOpen to true false based on when we click the chat button there ; w-80 sets fixed width (20rem = 320px) and opacity-100 makes it fully visible; otherwise w-0 collapses the width completely and opacity-0 makes it invisible ; Combined with transition-all, this creates a smooth slide-and-fade animation effect when opening or closing the chat panel, thus here below.

                // step1379: we had "flex-1" in the parent of the "VIDEO-SECTION" above > so when the chat is closed its w-0 and opacity-0 i.e. vanishes and so due to flex-1 the above video section takes all remaining space in flexbox ; and when chat openend since this VIDEO and CHAT have flex parent ; they come one beside the other with chat taking w-20 space and vidoe automatically adjusted due to flex-1 to take remaining space available in the flexbox ; also since "gap-" was not mentioned with "flex" in parent of both these VIDEO and CHAT ; so they appear STICKED-TOGETHER" to each other there with no gap in between them here/there, thus here below.

                //  so here : THE TRANSITION OCCURING IS THE CHANGE OF WIDTH ON TOGGLE BUTTON CLICK AND THAT WIDTH TO EXPAND TO W-80 AND SHRINK BACK TO W-0 : TO MAKE THAT SMOOTH, we are adding this > "transition-all duration-300 ease-in-out" ; thus here below.
                <div className={`flex flex-col rounded-lg shadow overflow-hidden bg-[#272a30] transition-all duration-300 ease-in-out ${isChatOpen ? "w-80 opacity-100" : "w-0 opacity-0"}`}>

                    {/* step1380: now this is what will be shown when the button is clicked to make isChatOpen TRUE and thus the chatbox gets finally w-80 and visible there, so once its visible, we will render the following inside the chatbox there, thus here below. */}
                    {isChatOpen && (

                        // step1381: we will have a react fragment <></> to wrap this whole thing to be rendered here because by rule we can render only 1 component to be returned inside a conditional renderin or even inside any return() too ; but here below we want to have 2 independent div's to be there here below ; all are not erapped in 1 div, but 2 divs here ; thats why we wrap them in a single component using the react fragment to make react happy as now only one <> </> has to be returned or rendered here ans it can now contain as mnay div's as now the main component ebing returned is only 1 i.e the react fragment, thus here below.
                        <>
                            {/* step1382: now here : the outer div here : uses Tailwind CSS where bg-[#1c1e22] applies a custom dark background color (arbitrary hex value), p-3 adds internal padding, border-b adds a bottom border line, border-[#3a3d44] applies a custom gray border color, flex enables flexbox layout, items-center vertically centers the children, and justify-between pushes the title to the left and the close button to the right, thus here below. */}

                            {/* step1383: this below is the top header section inside the CHAT popup that we are making here below with dark backgorund and a grayish border at the bottom of it, thus here below. */}
                            <div className="bg-[#1c1e22] p-3 border-b border-[#3a3d44] flex items-center justify-between">
                                {/* step1384: so in that header, we have this heading first which : uses Tailwind CSS where font-semibold slightly increases font weight for emphasis and text-white ensures strong contrast against the dark background, thus here below. */}
                                <h3 className="font-semibold text-white">Live Chat</h3>

                                {/* step1385: now the other component inside this flexbox is the CLOSE button here below ; since the flexbox in which this used is justify-between, so : the above heading will be the 1st compoennt on leftmost side and then the CLOSE button as the 2nd component on the RIGHTMOST side here/there, thus here below. */}
                                <button
                                    // step1386: so we set the isChatOpen to false when clicked on this button and by logic written above , once its false , the chat section becomes w-0 with ease-in-out animation as mentioned above there and vanishes with opacity-0 now there, thus here below.
                                    onClick={() => setIsChatOpen(false)}

                                    // step1387: now this here below : uses Tailwind CSS where text-gray-400 applies muted gray color by default, hover:text-white changes the icon color to white on hover for interactive feedback, and transition-colors enables smooth color transition animation, thus here below.
                                    className="text-gray-400 hover:text-white transition-colors"

                                    // step1388: this is used to show this TEXT inside a tooltip when the button is hovered here/there, thus here below.
                                    title="Close chat"
                                >
                                    {/* step1389: either use w-5 h-5 together OR size-5 alone : as both are equivalent and means the same by rule and logic always here/there, thus here below. */}
                                    <XIcon className="size-5" />
                                </button>
                            </div>

                            {/* step1390: now the 2nd component inside the react fragment is the one that will be shown below the header section made above ; since we want this to be shown below the header made above, we put this below the above parent div ; its because since "div" is a block level element, so : when placed indepenedently, they will appear one below the other there since they are block-level elements here/there, thus here below. */}

                            {/* step1391: so this div container for the chat UI will have : flex-1 → takes remaining vertical space inside chat panel ; since this is part of the flexbox above inside which this is also there, so it means it will take all the remianing space here below vertically ; since the parent of this div was a flexbox with flex-col : as all the elements i.e. the header then this chatUI appears one below the other here ; so now : header took some space above , now we want this chatUI to take all vertical space (vertical as it was not normal flexbox but flex-col) ; so : we want it to take all the available space vertically inside the overall parent chat div and take all space there, thus here below.  */}

                            {/* step1392: so this div here below : uses Tailwind CSS + Stream Chat theme class where flex-1 allows this container to take the remaining available space inside its parent flex container (in this case, vertically because the parent uses flex flex-col, if it was just a flex i.e. horizontal flexbox then using flex-1 would make it take all the horizontal space i.e. take all the space horizontally then there), ensuring the chat area expands to fill leftover height below the header here/there, thus here below. */}

                            {/* step1393: also here : "overflow-hidden" prevents internal scrollable elements (like the message list) from overflowing outside the rounded container; and "stream-chat-dark" activates Stream Chat’s built-in "dark theme styles" so that message components, input fields, and other chat UI elements render using the dark color scheme defined by the Stream Chat CSS, thus here below. */}
                            <div className="flex-1 overflow-hidden stream-chat-dark">

                                {/* step1394: now here : below is the traditional sequence of layout i.e. outermost Chat , then Channel, then window and inside them : MessageList and MessageInput ; this is what is always told to put up to enable proper chatting system there coming from STREAM DOCUMENTATION, thus here below. */}

                                {/* step1395: so now : "Chat" tag connects the UI to authenticated chatClient passed here in this file as prop , that was created in Session Page earlier to authenticate and ensure that the user logged in is also authenticated on stream, thus here below. */}

                                {/* step1396: This the most outermost Chat System Provider that : acts like a global provider for the chat and makes the chat state available to the all the child components using the REACT CONTEXT : React Context is a way to share data between components without passing props manually at every level ;  normally in Prop Drilling : Parent → passes props → Child → passes props → Grandchild ; but "context" creates a global data tunnel inside a subtree ; so here below now : when we passed the chatClient as prop only to the parent Chat , it becomes available automatically to all the child components inside it and can be internally used in all of them to ensure that the user is authenticated and so on that the chatClient passed to this told , whatever we created it earlier there that here/there, thus here below. */}

                                {/* step1397: so here : chatClient is important because it is the active connection between your app and Stream’s chat servers, and it represents the logged-in user session. When you pass client={chatClient} into <Chat>, the SDK uses it to know who the user is, which server to talk to, how to send and receive messages, listen for real-time updates, handle typing indicators, reactions, and connection state. Without passing chatClient, the chat components (Channel, MessageList, MessageInput, etc.) would have no backend connection and no user identity, so they simply wouldn’t know where to fetch messages from or where to send them — meaning the chat UI would render but not actually work. */}

                                {/* step1398: so overall this : is a component from stream-chat-react that acts as the top-level provider for the entire chat system. The client={chatClient} prop connects the UI to the authenticated Stream chat client instance (which was created and connected earlier), enabling real-time messaging, event listening, and state management through React context. Without passing this client, the chat components inside would not know how to fetch or send messages. The theme="str-chat__theme-dark" prop applies Stream’s built-in dark theme styling, ensuring all nested chat components (like MessageList and MessageInput) render with the correct dark UI appearance according to the imported Stream CSS, thus here below. */}

                                {/* step1399: so : Chat is the top-level provider component from Stream Chat. It takes your chatClient (which is the live connection to Stream’s servers) and makes it available to all chat components inside it using React context. It handles user session, real-time message updates, connection state, typing indicators, reactions, and event listeners. Without wrapping everything inside <Chat>, none of the inner chat components would know which user is logged in or how to communicate with the server ; so : chatClient) is the main connection between your app and Stream’s chat servers. It represents the logged-in user and manages everything behind the scenes — connecting to the server, authenticating with a token, sending messages, receiving real-time updates, listening for new messages, typing events, reactions, and handling connection state. Think of it as the engine + internet connection of your chat system. Without it, your app has no communication with Stream at all here/there, thus here below. */}
                                <Chat client={chatClient} theme="str-chat__theme-dark">

                                    {/* step1400: now channel : binds the UI to a specific chat room ; "channel" we created in useStreamClient using the sessionId ; this : tells which room to show messages from ; so : Channel is a specific chat room or conversation inside Stream. While chatClient connects you to Stream globally, a channel represents one particular space where messages are exchanged — like “session-123”, “general-room”, or “support-chat”. It stores the messages, members, and metadata for that conversation. So if chatClient is the engine that connects you to the platform, the channel is the actual room where people are talking. */}
                                    <Channel channel={channel}>

                                        {/* step1401: then > window is a layout component ; It basically structures the chat area ; it holds the message list i.e. the list of messages sent and the input from where to send the message togerher at one place, thus here below. */}

                                        {/* step1402: so > Window is mainly a layout wrapper provided by the Stream UI library. It organizes the internal structure of the chat view, typically separating the message display area from the message input area. It doesn’t handle backend logic; it just provides structured layout and styling so that MessageList and MessageInput appear correctly arranged inside the chat panel. */}
                                        <Window>

                                            {/* step1403: now this MessageList component provides a : real-time message display ; now we do NOT manually render messages ; all happens in real-time by this in-built component automatically and is shown as a list here/there in the UI ; list of all the messages here/there, thus here below. */}

                                            {/* step1404: so > MessageList automatically fetches and renders all messages from the active channel. It listens in real time for new incoming messages, edits, deletions, and reactions, and updates the UI automatically. It also handles scrolling behavior, timestamps, avatars, grouping messages by user, and formatting — so you don’t have to manually build message rendering logic. */}
                                            <MessageList />

                                            {/* step1405: finally this : MessageInput component coming from stream > gives the text input box , send button ; and it Sends messages to the channel automatically and Clears input and Updates UI with new messages automatically here/there, thus here below. */}
                                            <MessageInput />
                                        </Window>

                                        {/* step1406: now outside the window, this Thread : helps Replies to specific messages ; it shows > It shows nested replies under a parent message ; it thus like whatsapp helps to reply to a specific message there ; message to message reply like whatsapp can be doen using this component here ; without this component , there can be no threaded replies support here/there, thus here below.*/}

                                        {/* step1407: so > <Thread /> is the component that handles message reply threads within a channel. When a user clicks “Reply” on a specific message in the MessageList, Stream opens a threaded conversation where all replies to that message are grouped together separately from the main chat. The <Thread /> component listens for that selected parent message and displays its replies in a focused thread view, allowing users to have organized side discussions without cluttering the main message flow here/there, thus here below. */}

                                        {/* step1408: so finally > DON'T MUG-UP THIS ARCHITECTURE > ITS JUST A COPY PASTE THAT WAS PROVIDED IN THE STREAM VIDEO REACT SDK DOCS AND DOCUMENTATION ; SO WE NEED TO > JUST KNOW THIS IS THE ARCHITECTURE TO BE USED FOR SETTING UP CHAT OF STREAM , JUST USE THE CHATCLIENT TO AUTHETICATED AND CHANNEL TO TELL THAT THE CHAT IS FOR WHICH USER AND SESSION AND THEY WE KNOW WERE MADE USING CLERKID , USER OBJECT OF CLERK AND ALL , IN "USESTREAMCLIENT" HOOK EARLIER THERE ; thats all to keep in mind here, thus here below. */}
                                        <Thread />
                                    </Channel>
                                </Chat>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default VideoCallUI
