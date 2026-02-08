// To start off and get the boilerplate initially there, we can do "rfce" and press enter to get it, thus here below.

import { useUser } from "@clerk/clerk-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions"
import Navbar from "../components/Navbar"
import WelcomeSection from "../components/WelcomeSection"
import StatsCards from "../components/StatsCards"
import ActiveSessions from "../components/ActiveSessions"
import RecentSessions from "../components/RecentSessions"
import CreateSessionModal from "../components/CreateSessionModal"

function DashboardPage() {

  // step755: lets get the diffent variables from various packages to be used here, thus here below.

  // step756: this navigate now helps us to navigate to different URLs automatically in the code when a line hits programatically unlike Link where we need to click some button to navigate , but here it navigates directly when this navigate() is called with some path URL in it there, thus here below.
  const navigate = useNavigate()

  /* step757: now clerk provides with information about the currently logged-in user using the useUser hook ; it returns various fields like -
    {
      isLoaded: true,
      isSignedIn: true,
      user: {
        id: "user_2abc123",
        firstName: "Nischay",
        lastName: "Kumar",
        username: "nischayk",
        imageUrl: "https://img.clerk.com/xyz.jpg",
        primaryEmailAddress: {
          emailAddress: "nischay@gmail.com"
        },
        createdAt: 1712345678901,
        updatedAt: 1712349999999
      }
    }
      ; thus later we can use this "user" field destructured from useUser to get various things about the logged in user using "user.id" , "user,firstName" etc, thus here below.
  */
  const {user} = useUser()

  // step758: now we will be having a state to detect if we should display the modal/pop-up or not, this will be used to toggle the modal : i.e. whether to show the MODAL/POP-UP or not, thus here below.

  // step759: initially false as we don't want to show the modal pop-up on the screen by default, thus here below.
  const [showCreateModal, setShowCreateModal] = useState(false)

  // step760: now we can have the state to : store the problem and diffculty for the room/session we want to create, thus here below.

  // step761: initially, we want the problem and difficulty to be empty strings, thus here below.
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" })

  // step762: now lets get the result coming from the hooks we have created in useSessions.js file earlier there, thus here below.

  /* step763: NOTE THAT : in the useSessions.js file ; we pass only some fields like queryKey, queryFn etc there, then the useQuery hook uses them to fetch data and returns us many fields like -

  {
    queryKey: ["activeSessions"],
    queryFn: sessionApi.getActiveSessions
  }

  it returns -

  {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    status,
    refetch,
    fetchStatus,
    isFetching,
    isRefetching,
    ...
  }

  ; similarly in useMutation we pass -

  {
    mutationKey: ["createSession"],
    mutationFn: sessionApi.createSession,
    onSuccess: () => {...},
    onError: (error) => {...}
  }

  ; then it uses these and then changes the data and returns back the following object there in result which is returned thus here below as -

  {
    mutate,
    mutateAsync,
    data,
    error,
    isPending,
    isSuccess,
    isError,
    status,
    reset,
    variables,
    ...
  }

  ; where for example : mutate(data) is a function it returns that can be called to make the API run with the passed data, thus here below.
  */

  // step763: so lets use the above concept and access the hooks, thus here below.
  const createSessionMutation = useCreateSession()

  // step764: now we know the GET method to which the usequery hook called returend data , that we get here below ; and also we get isLoading here which is "true" while API is running for the first time ; once data is fetched and laoded , it becomes "false", thus here below.

  // step765: can't do data, isLoading for both as then it would be a name conflict, so its advised to rename the variables using ":" operator, which is used to rename the variables taking its value into it now here/there, this is done using ":" operator, thus here below.
  const {data: activeSessionsData, isLoading: loadingActiveSessions} = useActiveSessions()
  const {data: recentSessionsData, isLoading: loadingRecentSessions} = useMyRecentSessions()

  // step769: now lets create a method here that will be used to create a session, whenever we click the CREATE ROOM button there, thus here below.
  const handleCreateRoom = () => {

    // step770: if the problem and difficulty for the room to be created has not been set, don't create a room, thus here below.
    if(!roomConfig.problem || !roomConfig.difficulty) {
      return;
    }
    // step771: else we will call the mutate method we had from the useMutation hook above, to make a call to the API under the useCreateSession hook ; and by rule "mutate" method coming from useMutation() takes the data to be passed in the POST method call ; so we pass the problem and difficulty and make a call to the api to create a session, to the backend here/there, thus here below.

    // step772: this is correct also as in the backend, we were expecting the data to come shoudl have problem and difficulty there that we got in req.body in the sessionController.js file we had written to get problem and difficulty, and thats why we are sending the object below there, thus here below.
    createSessionMutation.mutate(
      {
      problem: roomConfig.problem,
      difficulty: roomConfig.difficulty.toLowerCase(),
      },
      // step773: now the 1st argument baove is always a "data" and now we can pass some options too like here below ; here we pass the "data" field that we saw is returned by the backend, thus here below.
      {
        onSuccess: (data) => {
          // step774: so once session created, we should hide the modal/pop-up there, so setShowCreateModal to false, thus here below.
          setShowCreateModal(false)

          // step775: also now we make the user to be navigated to "/session/:id" page, thus here below.

          /* step776: its because we know sessions are stored in mongoDb once created , so since the data returned by backend has sessions object as -
          
          {
            session: {
              _id: "abc123",
              problem: "Two Sum"
            }
          }

          ; so we go to that session object and use the id of the new session given by mongoDb to get the session by its id and then use that id in the URL params and navigate to the "/session/:id" page ; and later it can be used from URL using req.params in the backend there, thus here below.
          */
          navigate(`/session/${data.session._id}`)
        }
      }

    )
  }

  // step766: can console log these values now > then go on /dashboard page > inspect > console > there we see that : initially its undefined till its loading and so the loading state returns "true" ; once loade we can see th eobjects for both there , both by name of "sessions" of the object as in backend > sessionsController , we had saved the fetched data into a "Sessions" object there and we returned that "Sessions" object there, thats what we are seeing in the console for both these API calls here/there, thus here below.

  // console.log(activeSessionsData)
  // console.log(loadingActiveSessions)
  // console.log(recentSessionsData)
  // console.log(loadingRecentSessions)

  // step767: now we see that console log gave sessions as the main object with many fields in it ; but before it was rendered we saw undefined was there in the console log first there as at that time the data was not loaded yet ; so we see that if sessions object coming from these are undefined, then we : cannot read undefined.sessions as can cause error like : "Cannot read property 'sessions' of undefined" ; so : to prevent the crash like this we instead have it set to [] initially ther, so that atleast the [].sessions won't cause any error or crash the website ratehr will load there empty array and once data loads , it will show the actual data there, thus here below.

  // step768: ?. used as it may be possible that sessionsData or recentSessionsData may be undefined, so we do optional chaning ?. here, to prevent crash like : "Cannot read property 'sessions' of undefined" ; thus here below.
  const activeSessions = activeSessionsData?.sessions || []
  const recentSessions = recentSessionsData?.sessions || []

  // step878: now lets create a session to check if a user is host or a participant in a session, thus here below.

  // step879: so here : we take a parameter whenever this function is called and then we know that the "user" coming from useUser of clerk is the details of the logged in user, so we get the "id" if the user , thus here below.
  const isUserInSession = (session) => {

    // step880: now we check if the "id" exists ; as if no user is logged-in ; it means user can't be part of the session, so return false immediately and exit, thus here below.
    if(!user.id){
      return false;
    }

    /* step881: now here we know that -

    ; the sessions object coming from useActiveSessions() and being stored here in activeSessionsData , we saw earlier in console too that it returns : 

    {
      sessions: [...]
    }
    
    ; so we know it will look like -

    activeSessionsData = {
      sessions: [
        {
          _id: "abc123",
          problem: "Two Sum",
          difficulty: "easy",
          host: {
            clerkId: "user_2abc123",
            name: "Nischay"
          },
          participant: {
            clerkId: "user_5xyz789",
            name: "Rahul"
          },
          createdAt: "2026-02-08T00:00:00Z"
        },
        {
          _id: "def456",
          problem: "Binary Search",
          difficulty: "medium",
          host: {...},
          participant: {...}
        }
      ]
    }

    ; so when we do : const activeSessions = activeSessionsData?.sessions || [] in the lines way above , we get -

    activeSessions = [
      { session1 },
      { session2 },
      { session3 }
    ]

    ; so now : activeSessions.length gives us the total number of activeSessions that we use laster in StatsCard component and so on...

    Now each session in this is also an object, that looks like -

    session = {
      _id: "abc123",
      problem: "Two Sum",
      difficulty: "easy",

      host: {
        clerkId: "user_2abc123",
        name: "Nischay"
      },

      participant: {
        clerkId: "user_5xyz789",
        name: "Rahul"
      }
    }

    ; so now here below : we check the clerkId of the session and match it with current user and similarly do for particpantId ; we do so to check that the current user is either a host or a participant and then only we return "true", thus here below.
    */

    // step882: so now here: we have "?." optional chaining to ensure that the app doesn't crash as it may be possible that a session ahs no participant yet , session.participant is "undefined" , so it will come : "Cannot read property 'clerkId' of null" > so to prevent this error to come and rather just show error in consoel but don't crash the app, we use ?. , that tells to go and check the id only if the session has a participant or a host, thus here below.

    // step883: so if this function returns TRUE, means that the current logged in user is part of that session we have passed in the function here above here/there, thus here below.

    // step884: see the next steps in backend folder > sessionController.js file now there, thus here below.

    // step888: so now we have made the data coming for activeSessions to include the participant's clerkId as well, so that now we can access the participant clerkId using "session.participant?.clerkId" , just like we did the same thing for host too , thus here below.
    return session.host?.clerkId === user.id || session.participant?.clerkId === user.id
  }

  return (
    // step777: now we will wrap the whole return statement using a <> recat fragment as inside this return <> we have more than 1 div being returned and by rule we can only return 1 element/tag in a return statement, thus here below.
    <>
      {/* step578: so here for the topmost/outer-most parent, we : Set minm height as the full screen height so this section covers the entire screen atleast always as its "minm" i.e. atleast it will always cover the entire screen here/there, then it uses DaisyUI base-300 background color from Tailwind CSS theme to give a slightly different background shade, and use flex with column direction so all child elements are arranged one below the other, thus here below. */}
      <div className="min-h-screen bg-base-300">
        {/* step778: now as always we will have the navbar first at the top here, thus here below. */}
        <Navbar />

        {/* step779: now lets have the following component to be rendered there ; which takes props to be used in its file there later, thus here below. */}
        <WelcomeSection

          /* step780: so we are passing a function in this as a prop ; and we doing () => and not just {setShow...} , because by rule when () => is used, it doesn't immediately calls the function , else if we did onCreateSession={setShowCreateModal(true)} then it would call the function immediately during rednering itself i.e. the modal/popup would open as soon as this WelcomeSection component is rendered there, but we don't want that, we want to open the modal/popup only when the button is clicked ; as then we would be calling the function there itself instead of passing it to this child component WelcomeSection as a prop there ; so here -

          In JavaScript:

          functionName()  → calls the function immediately
          () => functionName() → creates a new function that calls it later

          So : onCreateSession={() => setShowCreateModal(true)} : this creates a new arrow function and we are passing that function to the child component as a prop ; Later, inside the child component (for example inside a button): <button onClick={onCreateSession}> this will execute the function that was passed to it as a prop there ; i.e. when the button is pressed, it will call this function we passed with its defination here below , and will set the showCreateModal state to true, and thus will show the modal/popup to appear there, thus here below.

          */

          // step781: so here : we are not calling the function but just passing the function with its defination that if this function is used later in the component, it will run this defination with which we have passed the prop and will make the showCreateModal state to true ; state changes so React will re-render the component and will make the modal/popup appear there, thus here below.

          // step782: see the next steps in WelcomeSection.jsx file now there, thus here below.
          onCreateSession = {() => setShowCreateModal(true)}
        />

        {/* step802: now lets have a GRID LAYOUT here to show the different sections on the screen, thus here below. */}

        {/* step803: so here : the div below : creates a centered layout wrapper using Tailwind’s container utility, mx-auto centers it horizontally, px-6 gives horizontal padding so content doesn’t touch screen edges, and pb-16 adds bottom spacing so the section doesn’t feel cramped at the bottom, thus here below. */}
        <div className="container mx-auto px-6 pb-16">

          {/* step804: so now the classes here : turns the inner div into a CSS grid layout where by default it shows 1 column on small screens, and switches to 3 columns on large screens (lg: breakpoint), while gap-6 adds consistent spacing between the grid items to keep the layout clean and evenly spaced, thus here below. */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">

            {/* step805: now we will have two components to be rendered here ; don't get confused that we have grid cols 3 but only 2 components how and why ; its because later the activesessions component will be taking the space of two cols using col-span-2 and the recent sessions component will be taking the space of one col using col-span-1 ; later there in the classes of their respective components there, can see there for verification and proof there, thus here below. */}
            <StatsCards 
              // stepp862: so now we : pass the props to be used in the StatsCards component i.e. the length of the active and recent session, thus here below.

              // step863: see the next steps in StatsCards.jsx file now there, thus here below.
              activeSessionsCount = {activeSessions.length}
              recentSessionsCount = {recentSessions.length}
            />
            <ActiveSessions 
              // step889: now lets pass the following props to be used in the ActiveSessions component there, thus here below.
              sessions = {activeSessions}
              isLoading = {loadingActiveSessions}

              // step890: REMEMBER THAT : we don't need to pass the parameter that was defined to be passed to this function, as in PROPS we just pass a refernce that this function is what will be called when used in the ActiveSessions component there; this is not a function call ebing made but just passing refernece of what function will be called, thus here below.

              // step891: so we will pass the paramter and call the function in the ActiveSessions component there wherever needed as there we must pass the parameter that will be used by this function defined here whose refernce has been/ is being passed over to this child component here/there, thus here below.
              isUserInSession = {isUserInSession}
            />
          </div>

          {/* step806: now outside the grid, we will also have a recent sessions section below the above div of GRID, thus here below. */}
          <RecentSessions 
            // step958: now lets pass the following props here below & get the same in the RecentSessions component to be used there, thus here below.

            // step959: see the next steps in RecentSessions.jsx file now there, thus here below.
            sessions = {recentSessions}
            isLoading = {loadingRecentSessions}
          />
        </div>
      </div>

      {/* step807: finally we will have a seperate component independent of the above div because we don't want this modal to be part of the main layout above, we just put this as an independent component here below and later we will toggle its visibility using the respective state ; thats why we had wrapped the return with <> earlier there as here return will have 2 independent divs being returned here/there ; as by rule the return should have only one parent element and not 2 independent ones, and if its so , both must be wrapped with a single element at the top i.e. inside a <></> or a single <div></div> here/there, thus here below. */}
      <CreateSessionModal
        // step808: now lets pass some props from this parent file to be used in this component ther, thus here below.

        // step809: the left side of props being passed is just names decided by us , but the same name should be used when destructuring them and recievng them in CreateSessionModal.jsx file there, thus here below.

        // step810: so now first we send the state to tell if the modal has been opened or not, thus here below.
        isOpen = {showCreateModal}

        // step810: next we send the function along with its defination here below ; so that whenever this function is called in the child component, it will run this function there ; don't think that this function is called here below while passing NOO : that would have happend if we just did {setShowCreateModal} , but we used () => , so it means : this will not be called now , but will be called with this defination passed below when its called in the CreateSessionModal.jsx file there ; and thus it will make the state to be false and close the modal/popup there, thus here below.
        onClose = {() => setShowCreateModal(false)}

        // step811: then we pass the various states telling the {problem: ... , difficulty: ...} ; then the roomConfig setter to set the values in the state and finally the function to create a session to eb passed and used in the modal/popup there, thus here below.
        roomConfig = {roomConfig}
        setRoomConfig = {setRoomConfig}
        onCreateRoom = {handleCreateRoom}

        // step812: now we know that the createSessionMutation contains the result returned from useMutation hook earlier above, and we saw there that it used the fields passed earlier in useSessions.js and then returned various fields as an object like : { mutate, data, error, isLoading, isError, refetch, ..... } and we store it finally in the variable createSessionMutation there ; so from that we are now extracting the "isPending" field using the "." dot operator here below ; it tells us if the API is currently running or not and becomes false again back once the POST request finishes and data has been changed using the mutation there as by rule useQuery is used to frtch data, but useMuatation is used to change the data, thus here below.

        // step813: see the next steps in createSessionModal.js file now there, thus here below.
        isCreating = {createSessionMutation.isPending}
      />
    </>
  )
}

export default DashboardPage
