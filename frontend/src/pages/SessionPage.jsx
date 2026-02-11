// step1028: use "rfce" to create a react functional export component's boilerplate first here/there, thus here below.

import { useNavigate, useParams } from "react-router"
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { useEffect, useState } from "react";
import { executeCode } from "../lib/piston";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader, Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";
import confetti from "canvas-confetti";

function SessionPage() {
    // step1029: now lets get the important states and functions to be used here, thus here below.

    // step1030: the useNavigate can be used here now to navigate automatically to the specified PATH, instead of having to click some button to navigate there using Link ; and then we get the current logged in user using the useUser hook of clerk, thus here below.
    const navigate = useNavigate();
    const { user } = useUser();

    // step1031: then we can have the useParams state to get the dynamic parameters with ":" from the URL ; like if we have "/url/:a/:b > then useParams() returns an object having the dynamic parameters that has ":" infront of them stored in it as an object i.e. { a: "1", b: "2" }, thus here below ; so here since "id" is the dynamci parameter in this route of "/session/id" > so lets get it by destructuring it, thus here below.
    const { id } = useParams();

    // step1032: now lets have the output state to store the output and finally the isRunning state to know if the code is currently running or has been completed to run there, thus here below.
    const [output, setOutput] = useState(null);

    // step1034: intially false as by logic code should not be running by default when we reach the page for the first time there, thus here below.
    const [isRunning, setIsRunning] = useState(false); 

    // step1035: now lets get the session itself, using the hook that we created earlier, thus here below.

    /* step1036: we know that the useQuery used in the hook there, uses the data and queryFn and all defined there & then returns an object of different things from the backend, where the call was made like -

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

    ; where : "data" is the actual data returned by the API ; then "isLoading" is a boolean value that is "true" when the API call is in progress and "false" when the API call is completed, thus here below ; and finally the "refetch" is a function that manually calls the API again and again and again .... till the data is not fetched from the backend and till the "undefined" coming from the API is not replaced by the actual data and once the data is fetched, the "undefined" will be replaced by the actual data ad this refetch function stops calling the API then here/there, thus here below.
    */

    // step1037: then here : we rename the variables to some of  good semantics names to understand better when being used later using the ":" syntax, thus here below.
    const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

    // step1038: now we also get the result from the useMuatation hooks created earlier to join and end a session, thus here below.

    /*
    step1039: now we know that again where we defined the useMutation hooks, there, it took these things as input -

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

    ; where "mutate" is a function that we can thus access from the object using "." operator i.e. joinSessionMutation.mutate(data) & this function takes the "data" to be updated in the backend and passes it to the mutationFn and calls/runs the mutationFn here/there, thus here below.

    ; but now we want not to pass the ID in the useMutation() hooks made below and instead use it like -

    joinSessionMutation.mutate(id) & then it will go to the useSessions hooks file and there, since we had not passed the id, so it will be like -

    We in useSessions hooks file have -

    export const useJoinSession = (id) => {
        const result = useMutation({
            mutationFn: () => sessionApi.joinSession(id),
        });
    };

    ; since it takes "id", we are expected to call it here like -

    const joinSessionMutation = useJoinSession(id);

    ; but now we want to instead use it without passing the id here below to the hooks, so for that we will have to remove "id" as taking the parameters from useSessions file too-

    export const useJoinSession = () => {
        return useMutation({
            mutationFn: (id) => sessionApi.joinSession(id),
        });
    };

    ; so now : we don't expect the hook to get an "id", but rather the API call function of sessions.js "joinSession" only that needs an id now there ; so now here we will have -

    const joinSessionMutation = useJoinSession(); // without any "id" passed into it

    ; and then we can call it like -

    joinSessionMutation.mutate(id); // when and wherever we need it, thus here below.

    So: we now when have the function called here like -

    joinSessionMutation.mutate(id) : then this "id" will be passed in the "mutate" function and by rule "mutate" is used to call and run the mutateFn of the useMutation hook defined in useSessions.js file there ; so we pass the "id" indirectly as parameter of the mutate() function as the parameter for the mutateFn there i.e. for the joinSession(id) API call there ; thus this makes the things systematic and logical that there is no need of "id" in the hook, but its needed only when we call the mutate function there, so this is how we solve that issue there, thus here below.

    So just remember that always : mutate() calls the mutateFn() of the useMutation hook ; and whatever we pass in mutate(value) goes as paramter for the mutateFn(value) there, thus here below.

    And we know that the "id" then there in joinSession(id) calls the joinSession method from sessions.js file where we had used "axios" to make POST request to the backend there, so its called with this id , made call to the backend directly there now, thus here below.
    */

    // step1040: also don't get confused there that : earlier in useSessionById(id) why did we pass "id" there, we could not have passed there too as well ; NO ITS NOT LIKE THAT : because useQuery works differently from useMutation ; in useMuatation "data" is passed at execution time ; so The mutation is something you manually trigger ; whenever we wish to send data to backend to update database ; but queries run automatically ; so things like : const { data } = useSessionById(id); > Immediately triggers the API call ; because Query needs the id at hook initialization initially itself there > to Create a unique queryKey there and Run queryFn automatically there > so there "id" is needed immediately there ; so passing "id" as soon as we use useQuery is very much important in case of useQuery if it has parameters in its definition there, thats why we kept "id" as it is in the useQuery() but not in the useMutation() hook now here below here/there; thus here below.

    // step1041: now here : go and remove the "id" in the useSessions.js file now there, thus here below.

    // step1046: now we changed that, so now whenever we call mutate using these we will do : joinSessionMutation.mutate(id) and then it will see the mutationFn there is not a direct function call arrow function taking "id" but a reference to the joinSession of sessions.js file > so goes there and uses this "id" indiretly now in the joinSession API of the sessions.js file there, thus here below.
    const joinSessionMutation = useJoinSession();
    const endSessionMutation = useEndSession();

    /* step1047: now lets get the session from the data sent back from backend in the useSessionById hook, that we renamed the data to "sessionData" there, so lets get the "session" field from there that will have as we have data : renamed to sessionData will be like -

    sessionData = {
        success: true,
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
    }
         ; so lets extract the session from here if its not undfined , so put ?. optional chaining to ensure error doesn't come like "cannot read property of undefined" ; so only if we it exists and is not undefined, then we will get the session object there, to prevent the app from crashing, thus here below.
    */

    const session = sessionData?.session

    // step1048: similarly lets get the boolean value by checking if the current user is a host or the participant by checking if the current session has the clerkId of host === to the current user id coming from clerk or not, and we use ?. optional chaining to ensure error doesn't come like "cannot read property of undefined" if the session itself is undefined or if there is no host field in the session, then error may come if we try to do undefined.clerkId like "cannot read property of undefined" , thus here below.

    // step1049: also it may be that the user logged in, its data is not there in clerk at the moment due to some internal error, so it should crahs the app saying undefined.id like "cannot read property of undefined", so we use ?. optional chaining to prevent that here/there, thus here below.
    const isHost = session?.host?.clerkId === user?.id

    // step1050: similarly do for checking the participant, thus here below.
    const isParticipant = session?.participant?.clerkId === user?.id

    // step1284: now lets destructure all the important states and functions from the hook we just made, to be use here now, thus here below.

    // step1285: and pass all the parameters that we saw earlier in the useStreamClient hook file that it needed as parameters there & then get all the values destructred like this as we saw there , the return was returening an object and to destructure it we use {} here ; and by rule the name of all the values returned there and destructured here should be EXACTLY SAME TYPED HERE BELOW as the name of the values returned there, thus here below.

    // step1286: note here that : we could have done here useStreamClient(session, ..., ..., ...) > but then in that case we should have done in useStreamClient also : useStreamClient(session, ..., ..., ...) there > and the order of arguments and parameters must be same in that case ; but here we are passing the values as props to the hook and we don't want the order of passing the parameters here to matter, so we send as object {session, ..., ..., ...} too and there in useStreamClient we can directly destructure the object and receive also like {session, ..., ..., ...} there ; and since its passed inside object, order doesn't matter now here/there, thus here below.

    // step1287: so main reason to pass as {} and recieve in useStreamClient as {} is that we don't want order of passsing the arguments and recieving them there to matter ; as if passed like htis the argumnets can be in any order inside {} whereas in normal pass , the parameters sent here should be in same order received in the useStreamClient hook's function here/there, thus here below.
    const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient({session, loadingSession, isHost, isParticipant})

    // step1051: now the session also had "problem" field, so if the session has a problem object then only access it using "?." to prevent errors like "cannot read property of undefined" and making the app to crash here/there, thus here below.

    // step1052: and then lets see that if it exists, then we go in "?" case of ternary operator and convert the PROBLEMS object we have in problems.js file to ARRAY using Object.values() because : .find() works only on arrays and not on objects, thus here below.
    const problemData = session?.problem

    // step1053: so we find and store the curren session's problem object in problemData i.e. since we had the problem field of the session above as the same name as the title of problem in PROBLEMS, so we match them in all objects inside PROBLMES and then find out that which of them is matching to this current session's problem and then store that whole problem object about that problem in the problemData variable here/there ; else set problemData to null, thus here below.
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null

    // step1054: now we get the state for the selected Language, that by default will be "javascript", thus here below.
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");

    // step1055: and then for the code to be shown as the value of the editor, we can have the starterCode shown of the problemData for the selected problem of the session in the language selected by the user ; the starter code gives us again object with starter code and language as key value pairs that which language starter code ; so select the value of the selected language to be shown there i.e the starter code for that selected language, thus here below.

    // step1056: else if somehow no problemData is found to be stored in the problemData or any undefined comes on the problemData , then set it to empty string in the code editor there i.e. "" here/there and : then set the code to be empty string, thus here below.
    const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");

    // step1077: now we have another useEffect here for that : when in the dashboard page, we click on JOIN there, then we want it to automatically take us to the session page and then we want to automaticaly run the joinSession mutation method there because : if the user is already the host of the session, he owns it and useMutation had already been called on him when he created it ; and if he is a participant, already earlier he will already be in the participants array for that session, so: useMutation would have been called on him , so no need to call again ; so its just for a normal user to join the session that is active there ; so this useEffect is for : Only auto-join if this is a normal user who is not already part of the session, thus here below.
    useEffect(() => {

        // step1078: first check if there is a session or not that the user is joining, if not then return, thus here below.

        // step1079: and also we check if the user is still logged in or not from clerk and also check if the session is still loading or not, if not then return ; because if we try to auto-join even before the data is ready i.e. already loading and session not yet there OR while joining just then session deleted from database and all ; so these checks done first here/there, thus here below.
        if(!session || !user || loadingSession){
            return
        }
        // step1080: so like mentioned above in step1078, just return if the user is already a host or participant of the session, thus here below.

        // step1081: also as per logic of dashboardPage, we never delete the user if he navigates away , he is already there in database with host of that session, so if goes to new tab and comes back to dashbaord hwe will see the session still there and if he join he will be the host automatically as stored in database earlier when he created it and session status still active so still shows there : If the session is still active in the database, the host will see it again in the active sessions list and can reopen it. They do not need to create it again, thus here below.

        // step1082: also if host is alone it shows 1/2 and if participant joins it shows 2/2 ; but if host leaves and comes back , he already is part of session in database , so sees REJOIN button ; but because of the if(isHost || isParticipant) ; it recognizes that he is part of this session who navigated to new tab and came back , so it just returns below ; and not calls the useMutation agian i.e. not duplicates the participant or host list to prevent increase of count like 3 , 4 .... if useMutate called again on every rejoin , so to prevent that we have this if check below, thus here below.
        if(isHost || isParticipant){
            return
        }
        // step1083: else if the user is not a host or participant of the session, then run the joinSession mutation function there by passing the session id to be joined, thus here below.

        // step1084: again now like told in the step1072: here inSuccess, first the global onSuccess defined in the hook runs to show the toast ; then this local onSuccess runs to run the "refetch" function that we extracted above from useMutation hook there, thus here below.

        // step1085: this "refetch" is needed and ran on success ; because after a participant joins the session ; backend updates the participants array ; but the "session" data still has old participants ; so we call the "refetch" function , which runs the query again to get the fresh data from backend , updates the "data" and re-renders the component automatically with the fresh data from the backend and updates the UI automatically ; so overall : refetch is a function provided by useQuery that here : manually re-executes the query function to fetch the latest data from the backend. thus here below.

        // step1086: so overall what we have here is that : if the user had already joined a session before and after sometimes leaves UI as we had set in dashboard page shows REJOIN for him ; but if a new user later joins that session that the earlir participant left, but host hasn't ended the session yet ; then this useEffect is for that user, thus here below.

        // step1087: also this refetch is used because : when a participant was about to join it was 1/2, but we immediately want to show 2/2 there, so that others see it FULL ; thats why refetch sends the query again to get the fresh data from the backend, thus here below.
        joinSessionMutation.mutate(id, {onSuccess: refetch})

        // step1088: and in the dependency array, we pass all the states whose change should trigger this i..e all the states that are in this useEffect whose change should run this too again, thus here below.

        // step1089: we also pass the joinSessionMutation and refetch here below : as by rule of react, we should pass the function used and also things like navigate, refetch if used in the useEffcet, we should put them also in the depenendency array to prevent warnings from react, thus here below.

    // }, [session, user, loadingSession, isHost, isParticipant, id, joinSessionMutation, refetch])

    // step1090: the above dependency array was making ERRORS in our code because : later if we try to join a session from dashboard ; it will give us INFINTE TOASTS there > with session is full there ; its because : useJoinSession() runs everytime the component re-renders and thus useMutation() returns an object everytime there ; so even if they both have same content, the object reference is new ; and React compares by reference, not by deep equality ; So dependency changed → effect runs again ; same with "refetch" refetch is a function returned by useQuery ; On re-render, React Query may give a new function reference ; so : Again → dependency changed → effect runs again ; here like if toast came for joined successfully, coponent re-rendered again toast came re-rendered again ran mutation and query again re-render but now room full so now : session full toast ; again toast came, seo again re-render , again re-render happended so refernec by refetch and useMuatation changed wven thoigh content was same so again re-render , but oom full so error toast, again toast came again re-render ... and so on ; that why with the above dependency array, we see the session joined success2 times then session full infinte times due to ths useEffect running after every re-render there, thus here below.

    // step1091: thats why we don't pass "joinSessionMutation" and "refetch" in the dependency array there ; it may give errors from ESLINT which is used to detect syntax and other errors in React ; but : ESLint doesn’t understand behavior loops ; ESlint just says you used it inside effect so put all of them in the dependency array, so it may give warnings , but we know its not good to put them in the dependency array and cause infinte re-rendering and error toasts to be shown there on joining a session from dashboard here/there, thus here below.
    }, [session, user, loadingSession, isHost, isParticipant, id])


    // step1073: so now : lets have an useEffect to redirect the participants when the host ends a session in which the paticipant was also there, thus here below.
    useEffect(() => {

        // step1074: if session not exists yet or the data is still loading for the session, do nothing ; just return ; its needed because : when the page renders for the 1st time there, then the session will obviously be undefined at that time as data is still loading at that time ; but if the session is still there then check if its status is completed or not, if its completed then redirect the participant to the dashboard page, thus here below.
        if(!session || loadingSession){
            return
        }
        if(session.status === "completed"){
            navigate("/dashboard")
        }
        // step1075: so we now by rule of react put all the factors whose change will trigger this useEffect in the dependency array here below i.e. run this useEffect if session, loadingSession or the reference of navigate changes here/there, thus here below.

        // step1076: you may think its ok that session and loadingSession are the states changing here when this will be triggered ; but why navigate in this , its because: React Router’s navigate is a function reference and react expects that : if navigate is used in a useEffect, then it must be added to dependency array to avoid warning here/there, thus here below.
    }, [session, loadingSession, navigate])

    // step1092: now we need one more useEffect to update the code, when the problem changes in the session, thus here below.

    // step1093: so : This useEffect ensures that the code editor always displays the correct starter code whenever the problem changes or the selected programming language changes. When a new problem is loaded (problemData updates) or the user switches the language (selectedLanguage updates), this effect checks whether starter code exists for the selected language and then updates the editor state using setCode(). Optional chaining (?.) is used to prevent runtime errors in cases where problemData or starterCode may still be undefined during initial loading ; so there it may cause error like "TypeError: Cannot read properties of undefined (reading 'javascript')" ; so the below useEffect : keeps the editor content synchronized with the current problem and language selection, and run it whenever the problem loads there or the problem is changed by the user or the language is changed by the user, thus here below.
    useEffect(() => {

        // step1094: so whenever the problem or the language is changed, this useEffect will update the code in editor with the starter code for the selected language of the current problem, thus here below.
        if(problemData?.starterCode?.[selectedLanguage]){
            setCode(problemData.starterCode[selectedLanguage])
        }
        // step1095: when language selected changes OR the problemData i.e. when the problem or the session is changed i.e. if the refetch happens and the session is refetched with new problemdata refernec though content same but on re-render refernece changes, so session object changes with new reference , so then also : this useEffect will run and update the code in editor with the starter code for the selected language of the current problem, thus here below.
    },[problemData, selectedLanguage])

    // step1057: now lets have a method to handle the language change done there using the dropdown there, thus here below.
    const handleLanguageChange = (e) => {
        // step1058: we get the value of the option selected from the dropdown using e.target.value, thus here below.
        const newLang = e.target.value
        setSelectedLanguage(newLang)

        // step1059: then lets have the code in the editor to be the starter code for that language, thus here below.

        // step1060: so now : lets have the starterCode set in the code editor based on the starter code of the selected language of the current problem of the session, stored in problemData ; else if somehow no problemData is found to be stored in the problemData or any undefined comes on the problemData , then set it to empty string in the code editor there i.e. "" here/there and : then set the code to be empty string, thus here below.
        const starterCode = problemData?.starterCode?.[newLang] || ""

        // step1061: and by logic when a new language is selected we reset the code editor with its starter code and also reset the ouput panel value to be null there, thus here below.
        setCode(starterCode)
        setOutput(null)
    }

    // same as done in ProblemPage
    const normalizeOutput = (output) => {
        return output
            .trim()
            .split("\n")
            .map((line) =>
                line
                    .trim()
                    .replace(/\[\s+/g, "[")
                    .replace(/\s+\]/g, "]")
                    .replace(/\s*,\s*/g, ",")
            )
            .filter((line) => line.length > 0)
            .join("\n");
    }

    // 
    const checkIfTestsPassed = (actualOutput, expectedOutput) => {
        const normalizedActualOutput = normalizeOutput(actualOutput);
        const normalizedExpectedOutput = normalizeOutput(expectedOutput);

        return normalizedActualOutput === normalizedExpectedOutput;
    };

    // same as done in ProblemPage
    const triggerConfetti = () => {
        const duration = 1500;
        const end = Date.now() + duration;

        const interval = setInterval(() => {
            if (Date.now() > end) {
                clearInterval(interval);
                return;
            }

            confetti({
                particleCount: 20,
                spread: 180,
                origin: {
                    x: Math.random(),
                    y: 0.6
                }
            });
        }, 200);
    };

    // step1062: now lets have the function to run the code there, thus here below.
    const handleRunCode = async () => {
        // step1063: now lets have the isRunning state to be true as we have clicked the run button, thus here below.
        setIsRunning(true)

        // step1064: also reset the ouput as we don't want new output to be there along with the old one ; so first reset the current ouput for new one to come there once this function is completed, thus here below.
        setOutput(null)

        // step1065: now : we use the executeCode method made in the piston.js file earlier there, where we passed the selectedLanguage and the code and then we get the result of running the code from the executeCode method made under the piston.js file earlier there, thus here below.
        const result = await executeCode(selectedLanguage, code)

        // step1066: now finally we update the output with the new result recieved and now since running done, so set back the isRunning state to false, thus here below.
        setOutput(result)
        setIsRunning(false)

        // same as done in ProblemPage for confetti
        if (result.success) {
            const expectedOutput = problemData?.expectedOutput?.[selectedLanguage];

            const testsPassed = checkIfTestsPassed(
                result.output,
                expectedOutput
            );

            if (testsPassed) {
                triggerConfetti();
            }
        }
    }

    // step1067: now lets have one more function here below to run when HOST clicks on the "end session" button there, thus here below.
    const handleEndSession = () => {
        // step1068: so now here we first ask for a confirmation from the user to end the session, thus here below.

        // step1069: so here : confirm() is a built-in JavaScript browser function ; it returns a boolean value i.e. if user clicks OK then true, else false, thus here below.
        if(confirm("Are you sure you want to end the session? All the participants will be notified!")){

            /* step1070: so if th =e user clicks OK, the condition above becomes TRUE and so the following code runs there ; now what happens here is that -

            First like we saw earlier, we know that in useSessions we had -

            export const useEndSession = () => {
                const result = useMutation({
                    mutationKey: ["endSession"],
                    mutationFn: sessionApi.endSession,
                    onSuccess: () => {
                    toast.success("Session ended successfully!")
                    },
                    onError: (error) => {
                    toast.error(error.response?.data?.message || "Failed to end session!")
                    }
                })

                return result
            }

            ; so : when we do : const endSessionMutation = useEndSession(); > we get an object like : {mutate, isPending, isSuccess, isError, error, data, reset, status, ........} ; so now : here below when we do -

            endSessionMutation.mutate(id, {onSuccess: () => navigate("/dashboard")}) ; then in hook since we had : mutationFn: sessionApi.endSession > so it internally calls : mutationFn(id) > which becomes > sessionApi.endSession(id) > so the sessions.js file ka > POST /sessions/:id/end > this endpoint gets called there like we saw above in step1039 above there.

            SO now : database gets update by this call and session becomes "completed" from "active" ; now by rule what happens next is that -

            The global isSuccess() written in the hook runs first and shows the "toast" > then the local isSuccess runs writte here below to navigate the user to the dashboard page, thus here below.

            */

            // step1071: so we know that this end session option will be there for the HOST only ; so the host will click to this and so this function will run for his UI and he will be navigated to the dashboard page, thus here below.

            // step1072: but what about participant who was in the session too, for that : we will do something about it in the useEffect in the next steps in this same file above now there, thus here below.
            endSessionMutation.mutate(id, {onSuccess: () => navigate("/dashboard")})
        }
    }

    // TO SHOW THE LOADER WITH SPINNING , IF THE SESSION IS STILL LOADING AND IS UNDEFINED FOR THE FIRST TIME IT RENDERS AS SEEN IN MAJOR_ISSUE.TXT FILE TOO & WE KNOW LOADINGSESSION IS TRUE WHILE API RUNNING AND FETCHING THE DAT, SO THEN SHOW THE LOADER ON SCREEN, THUS HERE BELOW.

    // Error may come because if we placed the loader above of the useEffects, then : React will stop rendering early during the first render (when loadingSession was true), so not all hooks will be executed; then on the next render (when loading finished), React will execute additional hooks that were previously skipped ; Since React requires hooks to run in the exact same order on every render, this change in hook count can cause the “Rendered more hooks than during the previous render” error ; so : By placing the loader condition below all hooks but before the JSX return, we ensure that every hook runs on every render in the same order, and only the UI output changes — which follows the Rules of Hooks and fixes the error, thus here below.

    // so we have the below condition just before the return statement of the UI to be shown, so that if the session is still loading, then show the loader and only after that show the UI returned by the return statement below here/there, thus here below.
    if (loadingSession || !session) {
        return (
            <div className="h-screen flex items-center justify-center bg-base-100">
                <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        // step1096: so now the dive here first : uses Tailwind CSS + DaisyUI theme color where h-screen makes the div take full viewport height (100vh), bg-base-100 applies the base background color from DaisyUI theme, flex enables flexbox layout, and flex-col arranges children vertically (top to bottom), making it suitable for page layouts like Navbar + Content, thus here below.
        <div className="h-screen bg-base-100 flex flex-col">

            {/* step1097: using the Navbar component created earlier again now, thus here below. */}
            <Navbar />

            {/* step1098: then the div inside it : uses Tailwind CSS where flex-1 allows this section to grow and take all remaining available vertical space inside the parent flex container, ensuring it fills the space below the Navbar properly, thus here below. */}
            <div className="flex-1">

                {/* step1099: so we create a panel group now here below to divide the screen into two horizontal panels side by side ; since its horizoantal, panels inside will be side by sid e; if it was vertical then panels inside would be top to bottom, thus here below. */}
                <PanelGroup direction="horizontal">

                    {/* step1100: now the first panel lets have here for the left side containing the code editor and the problem statements here/there, thus here below. */}

                    {/* step1101: so we make the first panel to take 50% of the width by default i.e. half screen by left and then the other half screen taken by the right panel there, and the minimum size to which it can be shrinked is set below to 30% of the total width, thus here below. */}
                    <Panel defaultSize={50} minSize={30}>
                        
                        {/* step1105: now inside this left size panel we will have another nested PanelGroup as in the left panel, we want to have another set of 3 panels one below the other, thus here below. */}

                        {/* step1106: since we now want the panels in the left side to be one below the other, so we keep the direction to be vertical, thus here below. */}
                        <PanelGroup direction="vertical">

                            {/* step1107: now inside this panel group we will have the topmost panel for the PROBLEM DESCRIPTION, thus here below. */}

                            {/* step1108: so again now here below > we use the same panel library component where defaultSize={50} sets this panel to take 50% of available height initially, and minSize={20} ensures it cannot shrink below 20% height during resizing, preserving usability, thus here below. */}
                            <Panel defaultSize={50} minSize={20}>

                                {/* step1109: now the first thing we have here is a div that : uses Tailwind CSS + DaisyUI theme color where h-full makes the div take full height of its parent panel, overflow-y-auto enables vertical scrolling if content exceeds height, and bg-base-200 applies a slightly elevated neutral background color from the theme, thus here below. */}
                                <div className="h-full overflow-y-auto bg-base-200">

                                    {/* step1110: now we have another div here that : uses Tailwind CSS + DaisyUI theme colors where p-6 adds generous internal padding, bg-base-100 applies the main surface background color, border-b adds a bottom border line, and border-base-300 applies a subtle neutral border color for section separation, thus here below. */}
                                    <div className="p-6 bg-base-100 border-b border-base-300">

                                        {/* step1111: now : we have the div which is a flexbox, which : uses Tailwind CSS where flex arranges children horizontally, items-start aligns them at the top vertically, justify-baseline aligns items along their text baseline for proper heading alignment, and mb-3 adds spacing below this header row, thus here below. */}

                                        {/* step1112: so this flexbox will keep the problem titles , host name, 1/2 participants and all on one side on the LEFT ; and the difficulty badge on the extremee right ; so to have space in between, we use justify-between, thus here below. */}

                                        {/* step1113: also here: the item-start is used instead of item-center : as here the LEFT side will be of 2-3 lines ; so if we put item-centre the left and rightmost elements should be vertically centred in the flexbox ; but we want the difficulty badge to be at the topmost place ; like if we have -
                                        
                                        PROBLEM_TITLE                                                   MEDIUM
                                        HOST_NAME
                                        1/2 PARTICIPANTS

                                        ; so we want the difficulty badge to be at the topmost place long eith the leftmost section ka topmost TITLE here/there and look better here/there ; so we use item-start instead of item-center here ; thus here below.
                                        
                                        */}
                                        <div className="flex items-start justify-between mb-3">

                                            {/* step1114: so now this div below withou any classes : is a plain structural wrapper used to group multiple elements (h1 and paragraphs) together as a single flex child. Since the parent is flex, each direct child becomes one flex item. This wrapper ensures all text content behaves as one grouped unit instead of being treated as separate flex items, and no styling is applied because layout control is already handled by the parent container, thus here below. */}

                                            {/* step1115: so all content in this will be one of the items of the outer flexbox ; and thus all of this inside this div, will appear on the leftmost side, thus here below. */}
                                            <div>
                                                {/* step1116: so now here we have to show the problem title first ; so we use h1, that : uses Tailwind CSS + DaisyUI theme color where text-3xl makes the heading large and prominent, font-bold increases font weight, and text-base-content applies the main readable text color from the DaisyUI theme for proper contrast, thus here below. */}
                                                <h1 className="text-3xl font-bold text-base-content">
                                                    {/* step1117: now here below we use optional chaining that displays the problem title if available, otherwise shows "Loading..." until data is fetched from the API, preventing runtime errors and empty UI states, thus here below. */}

                                                    {/* step1118: thats why we have ?. so that if session not loaded yet, its undefined.problem may cause error like : TypeError: Cannot read properties of undefined (reading 'problem') ; so instead we show the || "or" case if left side is undefined i.e. a Loading text there, thus here below. */}
                                                    {session?.problem || "Loading..."}
                                                </h1>

                                                {/* step1119: we know h1 is a block level element, so this below <p> now appears belwo the h1 , but since its inside the 1st component div of the flexbox, so it stil is on the leftmost side of the flexbox, thus here below. */}

                                                {/* step1120: then below to that inside another h1 we show the problem's category and again if session not loaded yet, its undefined.category may cause error like : TypeError: Cannot read properties of undefined (reading 'category') ; so thats why we show the following category only if the problemData has been loaded, else dont show the category, show only once the problemData has been loaded, thus here below. */}

                                                {/* step1121: above we did session.problem as the problem title is in the problem field of session object ; but for category and all, we refer the full object about the problem that was set earlier to be present in the problemData object, thus here below. */}
                                                {problemData?.category && (

                                                    // step1122: so now the paragraph below : uses Tailwind CSS + DaisyUI theme color where text-base-content/60 applies the base text color with 60% opacity for secondary information styling, and mt-1 adds small spacing above this paragraph, thus here below.
                                                    <p className="text-base-content/60 mt-1">{problemData.category}</p>
                                                )}

                                                {/* step1123: again now : since <p> tag is also a block level element, so this below <p> now appears below the <p> above , but since its inside the 1st component div of the flexbox, so it still is on the leftmost side of the flexbox, thus here below. */}

                                                {/* step1124: so the paragraph below : uses Tailwind CSS + DaisyUI theme color where text-base-content/60 gives lighter secondary text styling and mt-2 adds slightly larger spacing above compared to the previous paragraph for visual separation, thus here below.  */}
                                                <p className="text-base-content/60 mt-2">

                                                    {/* step1125: again now here : we use ?. so that undefined.host is not there if session not yet loaded nd is undefined ; also if host is undefined due to some reason then don't do undefned.name as it may cause error like : TypeError: Cannot read properties of undefined (reading 'name') ; so instead we show the || "or" case if left side is undefined i.e. a Loading text there, thus here below. */}

                                                    {/* step1126: we use ALT+0149 > and show a bullet there and then some spaces too after that, thus here below. */}
                                                    Host: {session?.host?.name || "Loading..."} •{" "}

                                                    {/* step1127: also now using the ?. again so that if the session not yet loaded then undefined.participant is undefined and may show error like : TypeError: Cannot read properties of undefined (reading 'name') ; and crash the website ; so rather we check it first and then only show this : only if session loaded fully, else don't show t there until session loaded completelty and once session is loaded completely, then here we show 2/2 or 1/2 based on if participant is there then 2/2 as HOST toh rhega hi hamesha and if participant also joins, then it becoems 2/2 but if participant field is null or not there, show 1/2 only as HOST toh rhega hi hamesha ; so show the 1 or 2 of 1/2 and 2/2 based on this conditional ternary operator here/there, thus here below.  */}                                                    
                                                    {session?.participant ? 2 : 1}/2 participants
                                                </p>
                                            </div>

                                            {/* step1128: now outside the 1st component div of the flexbox, we make the 2nd component having the difficulty badge and since fdlexbox had justify between, so this 2nd component will be in the rightmost side of the flexbox here/there and we had item-centre so even though left side has 3 lines, this right side will always be at the top i.e. at the start of the cross axis vertical here (by rule in flex, cross axis is vertical opposite to normal items that are horizontally in same row there && in case of flex-column, cross axis is horizontal opposite to normal items that are vertically in same column there), thus here below. */}

                                            {/* step1129: so we again have a flexbox to have the difficulty and the end-session button to be there in the same horizontal row on the rightmost side there, thus here below. */}

                                            {/* step1130: so the flexbox div here : uses Tailwind CSS where flex arranges child elements horizontally, items-center vertically centers them, and gap-3 adds spacing between them for clean alignment, thus here below. */}
                                            <div className="flex items-center gap-3">

                                                {/* step1131: now we have a span to make the badge , which : uses DaisyUI + Tailwind CSS where, badge: creates the pill-style component,badge-lg: increases badge size for stronger visual emphasis, and getDifficultyBadgeClass(session?.difficulty) coming from utils class created earlier: dynamically applies theme color classes (like success, warning, error) based on difficulty level, thus here below. */}

                                                {/* step1132: again we use ?. to prevent crash by chekcing to access difficulty only one the session has been loaded completely to prevent crash by coming of error like "TypeError: Cannot read properties of undefined (reading 'difficulty')" due to undefined.difficulty, thus here below.   */}

                                                {/* PLEASE REFER THE MAJOR_ISSUE.TXT FILE TO SEE WHY I HAVE ADDED || THAT I DIDN'T HAD EARLIER HERE, SO I ADDED IT LATER HERE BELOW, THUS HERE BELOW. */}
                                                <span className={`badge badge-lg ${getDifficultyBadgeClass(session?.difficulty || "easy")}`}
                                                >
                                                    {/* step1133: so now we here again : use ?. to prevent crash by chekcing to access difficulty only one the session has been loaded completely to prevent crash by coming of error like "TypeError: Cannot read properties of undefined (reading 'difficulty')" due to undefined.difficulty, thus here below.  */}

                                                    {/* step1134: so here : we show the difficulty in 1st character uppercase and rest sliced from 1st index till the last as it is ; because from backend its like "easy", "medium", "hard" as we declared like that in session Schema earlier in enum there in backend , but want to show like : "Easy", "Medium", "Hard" here/there, thus here below. */}

                                                    {/* step1135: if the session difficulty is null or undefined, then show "Easy" as default instead of crashing due to undefined.difficulty causing error like "TypeError: Cannot read properties of undefined (reading 'difficulty')", thus here below. */}

                                                    {/* PLEASE REFER THE MAJOR_ISSUE.TXT FILE TO SEE WHY I HAVE ADDED || THAT I DIDN'T HAD EARLIER HERE, SO I ADDED IT LATER HERE BELOW, THUS HERE BELOW. */}
                                                    {(session?.difficulty || "easy").charAt(0).toUpperCase() + (session?.difficulty || "easy").slice(1)}
                                                </span>

                                                {/* step1136: now we show the end session button only to the HOST and not to participant, so do conditional rendering and show this button only to the HOST, thus here below. */}

                                                {/* step1137: here below : session?.status uses optional chaining so that if session is not yet loaded, it does not try to access .status directly and crash the website with an undefined error. Only when session is fully loaded and its status is "active" does the button render as no need to render the end session if user is seeing the session as a summary after it has been completed as whats the point of ending a completed session obviously by logic here/there, thus here below. */}
                                                {(isHost && session?.status === "active") && (
                                                    <button 
                                                        // step1138: so we have a button now : where btn applies base button styling, btn-error gives red error theme color (destructive action), btn-sm reduces size, and gap-2 adds spacing between icon and text, thus here below.
                                                        className="btn btn-error btn-sm gap-2" 

                                                        // step1139: we call the method we defined earlier to end the session once the button is clicked ; and this is passed as a reference (not executed immediately) because we are not using parentheses or an arrow function inside {} — so React will call handleEndSession only when the button is actually clicked, thus here below.

                                                        // step1140: don't write belwo with () at the end as it means run this as soon as the component renders , but we don't want to run this as soon as the page is loaded ; so we pass the refernece here for th efunction that had () => arrow function in it ; and by rule arrow function is executed only when its called so it is not executed immediately here/there ; we could have done here also () => but sicne we have defined it above seperately just pass its refernece without any () at the end of it here/there, thus here below.
                                                        onClick={handleEndSession}

                                                        // step1141: we disable it while the API call for mutation that runs in the function above in endSession we saw is running , as by rule isPending comes from it as {data, error, isError, isIdle, isLoading, isSuccess,...} ; so we check if isPending is true then disable the button : this prevents multiple clicks and calling multiple APIs continuously, thus breaking and crashing the website here/there, while the mutation is still running and making the API call in the backgorund to the backend here/there, thus here below.
                                                        disabled={endSessionMutation.isPending}
                                                    >
                                                        {/* step1142: so now if the API call is being made : show loader icon, else show the logout icon there, thus here below. */}

                                                        {/* step1143: NOTE THAT : instead of w-4 and h-4 : size-4 can also be written as by rule size-4 means both w-4 and h-4 are there by rule of TailwindCSS here/there, thus here below. */}
                                                        {endSessionMutation.isPending 

                                                        // step1144: so here : animate-spin applies continuous rotation animation to visually indicate loading state, thus here below.
                                                        ? (<Loader className="w-4 h-4 animate-spin" />)
                                                        : (<LogOutIcon className="w-4 h-4" />)
                                                        }
                                                        End Session
                                                    </button>
                                                )}

                                                {/* step1145: so now , here below : we use conditional rendering with optional chaining where session?.status ensures we do not access .status if session is undefined, else it will crash the website with an undefined error saying "TypeError: Cannot read properties of undefined (reading 'status')" and so : only after the session loads and its status becomes "completed" do we render the completed badge, preventing runtime errors and crashes, thus here below. */}

                                                {/* step1146: so we show the COMPLETED BADGE only if the session is completed, else don't show it here/there, thus here below. */}
                                                {
                                                (session?.status === "completed") && 
                                                (
                                                <span className="badge badge-success">Completed</span>
                                            )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* step1147: now inside the panel, but below the flexbox ; but inside the box having the flexbox i.e. outside the grayish type bg-base-100 container, we create another grayish bg-base-100 box now seperate from it for the problem description now here/there, thus here below. */}

                                    {/* step1148: the div below now : uses Tailwind CSS where p-6 adds uniform padding on all sides, and space-y-6 adds vertical spacing between all direct child elements inside this container, thus here below. */}
                                    <div className="p-6 space-y-6">

                                        {/* step1149: so now : we use optional chaining so that if problemData is undefined (data not yet loaded), accessing .description does not throw TypeError: Cannot read properties of undefined ; We first safely check it exists, and only then render the description section, preventing crash during the data loading here/there, thus here below. */}
                                        {problemData?.description && (

                                            // step1150: so if the description for problem exists, we use this div : having bg-base-100 again like the container for the header problem title above , but now a separate div container for description belwo it , as div is a block level element, so it will appear below the above div obviously here below & it : uses Tailwind CSS + DaisyUI theme colors where bg-base-100 applies the main surface background color, rounded-xl adds large rounded corners, shadow-sm gives subtle elevation, p-5 adds internal padding, and border border-base-300 applies a thin neutral border using DaisyUI theme color, thus here below.
                                            <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">

                                                {/* step1151: now the heading below : uses Tailwind CSS + DaisyUI theme color where text-xl increases heading size, font-bold thickens the text, mb-4 adds spacing below it, and text-base-content applies primary readable text color from the theme, thus here below. */}
                                                <h2 className="text-xl font-bold mb-4 text-base-content">
                                                    Description
                                                </h2>

                                                {/* step1152: so now the div below : uses Tailwind CSS where space-y-3 adds vertical spacing between paragraphs, text-base sets normal readable font size, and leading-relaxed increases line height for better readability of long text content, thus here below. */}
                                                <div className="space-y-3 text-base leading-relaxed">

                                                    {/* step1153: now the paragraph below : uses Tailwind CSS + DaisyUI theme color where text-base-content/90 applies main text color with 90% opacity, making it slightly softer than full contrast, thus here below. */}
                                                    <p className="text-base-content/90">
                                                        {problemData.description.text}
                                                    </p>

                                                    {/* step1154: now here below : we use optional chaining to ensure notes exists before calling .map(). Without ?., calling .map() on undefined would throw TypeError: Cannot read properties of undefined (reading 'map') and crash the app. Optional chaining prevents that by stopping execution safely, thus here below. */}

                                                    {/* step1155: so we use map to iterate on the notes array there having various strings in it , so its an array of strings that we iterate if notes exist only then to prevent crash and errors like TypeError: Cannot read properties of undefined (reading 'map'), thus here below. */}
                                                    {problemData.description.notes?.map((note, idx) => (
                                                        <p
                                                            // step1156: since in map , we return only one element by rule and in that element only we put the unique key for each element to be rendered , so here each element we assumed to be named "note" and by rule by puttin "idx" in the (..., idx) above, it takes value 0,1,2,3.. for each element and thus can be used as the unique key for each item to be rendered ; and so : key={idx} helps React efficiently track each mapped element during rendering, thus here below.
                                                            key = {idx}

                                                            // step1157: now each element's div here : uses Tailwind CSS + DaisyUI theme color where text-base-content/90 keeps consistent readable styling, thus here below.
                                                            className="text-base-content/90"
                                                        >
                                                            {/* step1158: so display each element that we mentioned to be named "note" in the (note, ...) above in the map above here/there, thus here below. */}
                                                            {note}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* step1159: so now after the problem description, show the examples section, and since div is a block level element, it will appear below the above div, thus here below. */}

                                        {/* step1160: so we show the below section only if examples exist (covered below using ?.) and there are > 0 examples for the problem if not don't do this else error may come like TypeError: Cannot read properties of undefined (reading 'map') and crash the app, thus here below. */}
                                        {(problemData?.examples && problemData.examples.length > 0) && (

                                            // step1161: then we have a div that : uses Tailwind CSS + DaisyUI theme colors where bg-base-100 applies surface background color, rounded-xl adds large rounded corners, shadow-sm gives subtle elevation, p-5 adds internal spacing, and border border-base-300 applies a thin neutral border for structured card-like appearance, thus here below.
                                            <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">

                                                {/* step1162: then we have another div inside the outer div to have the exmaples in a different colored backgorund than the normal outer container background, that uses : Tailwind CSS + DaisyUI theme color where text-xl increases heading size, font-bold makes it prominent, mb-4 adds spacing below it, and text-base-content ensures proper readable theme text color, thus here below. */}
                                                <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>

                                                {/* step1163: now we have a div that : uses Tailwind CSS where space-y-4 adds vertical spacing between each mapped example block, thus here below. */}
                                                <div className="space-y-4">

                                                    {/* step1164: then we mapthrough the examples array and renders each example dynamically; since we already checked existence above, .map() runs safely without undefined errors, and key={idx} helps React efficiently track each rendered example, thus here below. */}
                                                    {problemData.examples.map((example, idx) => (
                                                        <div

                                                        // step1165: since map can return only one outer parent by rule, thats why we have this one outer div to wrpa all content as only one outer div or any element only 1 can be rendered for each item of a map, and by rule : we put the "key" in the outermost element only that will be the only one there to be rednered and it will be equal to the index of each item there like : 0,1,2,.... which comes by putting (..., idx) in the above map by rule and syntax here/there, thus here below
                                                            key={idx}
                                                        >

                                                            {/* step1166: now we have a flexbox to keep the index number and the text Example in the same horizontal line, so we have a div here that : uses Tailwind CSS where flex aligns badge and title horizontally, items-center vertically centers them, gap-2 adds spacing, and mb-2 separates this header from example content below, thus here below. */}
                                                            <div className="flex items-center gap-2 mb-2">

                                                                {/* step1167: so to show example numbers 1,2,... we use idx+1 as idx starts from 0 by rule and so we have a div here below that : uses DaisyUI where badge creates pill-style label and badge-sm makes it small, used here to show example number, thus here below. */}
                                                                <span className="badge badge-sm">
                                                                    {idx+1}
                                                                </span>

                                                                {/* step1168: then inside the flexbox next to the example number we show this below that : uses Tailwind CSS + DaisyUI theme color where font-semibold slightly thickens the text and text-base-content ensures readable theme text color, thus here below. */}
                                                                <p className="font-semibold text-base-content">
                                                                    Example {idx + 1}
                                                                </p>
                                                            </div>

                                                            {/* step1169: now we have a div below the above div i.e. outside the flexbox , so this div will come below it and has the examples shown with the input and ouput, thus here below. */}

                                                            {/* step1170: so the div here below : uses Tailwind CSS + DaisyUI theme color where bg-base-200 applies slightly elevated background, rounded-lg softens corners, p-4 adds padding, font-mono applies monospace font (ideal for code-like input/output), text-sm reduces font size, and space-y-1.5 adds small spacing between internal lines, thus here below. */}
                                                            <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">

                                                                {/* step1171: then the div here beloe is another flexbox to show the text "Input" and the data for it in the same horizontal line with a gap of 2 between them, thus here below. */}
                                                                <div className="flex gap-2">

                                                                    {/* step1172: now the div here below : uses Tailwind CSS with DaisyUI theme color where text-primary applies primary theme color, font-bold emphasizes the label, and min-w-[70px] ensures a minimum fixed width so “Input:” and “Output:” labels align neatly even if content length differs ; same seen the differnece when not used min-w in IMAGES PLACED IN THE "TEST" FOLDER IN THE FRONTEND FOLDER THERE , can see there too, thus here below. */}
                                                                    <span className="text-primary font-bold min-w-[70px]">
                                                                        Input:
                                                                    </span>
                                                                    <span>{example.input}</span>
                                                                </div>

                                                                {/* step1173: everything same as above , same as input ; show output now below it as div is a block level element, so this div will come below the above one, thus here below. */}

                                                                {/* step1174: and here also we use min-w-70 same as input, so that the text Input and Output are aligned vertically just belwo the other and even if the length of thwir data is differenet , but looks good and laogned ; for proof : same seen the differnece when not used min-w in IMAGES PLACED IN THE "TEST" FOLDER IN THE FRONTEND FOLDER THERE , can see there too, thus here below. */}
                                                                <div className="flex gap-2">

                                                                    {/* step1175: so for the output it : uses Tailwind CSS with DaisyUI theme color where text-secondary applies secondary theme color for visual distinction, font-bold emphasizes it, and min-w-[70px] keeps label alignment consistent, thus here below. */}
                                                                    <span className="text-secondary font-bold min-w-[70px]">
                                                                        Output:
                                                                    </span>
                                                                    <span>{example.output}</span>
                                                                </div>

                                                                {/* step1176: finally if the example being mapped one by one here, if any of that example has explanation given or presen, then only render the div showing the explanation, thus here below. */}
                                                                {example.explanation && (

                                                                    // step1177: so the div here below : uses Tailwind CSS + DaisyUI theme color where pt-2 adds padding above, border-t adds a top divider line, border-base-300 applies subtle neutral border color, and mt-2 adds spacing above the divider section, thus here below.
                                                                    <div className="pt-2 border-t border-base-300 mt-2">

                                                                        {/* step1178: then the span here below : uses Tailwind CSS + DaisyUI theme color where text-base-content/60 makes text lighter (60% opacity), font-sans switches back to default sans-serif font (overriding font-mono), and text-xs makes it smaller as supporting explanation text, thus here below. */}
                                                                        <span className="text-base-content/60 font-sans text-xs">

                                                                        {/* step1179: finally show the explanation text with semibold font here/there, thus here below. */}
                                                                            <span className="font-semibold">
                                                                                Explanation:
                                                                            </span>
                                                                            {" "}
                                                                            {example.explanation}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* step1180: finally : now we show the constraints now below the examples, thus here below. */}

                                        {/* step1181: so again below : we use optional chaining "?." so that if problemData is undefined (data not yet loaded), accessing .constraints does not throw TypeError: Cannot read properties of undefined. We first safely check that constraints exist and that the array length is greater than 0, and only then render the Constraints section, preventing runtime crashes during async loading, thus here below. */}
                                        {problemData?.constraints && problemData.constraints.length > 0 && (

                                            // step1182: so now the div below : uses Tailwind CSS + DaisyUI theme colors where bg-base-100 applies main surface background color, rounded-xl adds large rounded corners, shadow-sm gives subtle elevation effect, p-5 adds internal padding, and border border-base-300 applies a thin neutral border for clean card styling, thus here below.
                                            <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">

                                                {/* step1183: then the heading : uses Tailwind CSS + DaisyUI theme color where text-xl increases heading size, font-bold emphasizes it, mb-4 adds spacing below, and text-base-content ensures proper readable theme text color, thus here below. */}
                                                <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>

                                                {/* step1184: Now : lets have a unordered list here below that will have space-y-2 applied to add vertical spaces between each item of this list and it will use : DaisyUI base text color with 90% opacity for strong readable text, thus here below.  */}
                                                <ul className="space-y-2 text-base-content/90">

                                                {/* step1185: now lets have a "map" to loop throught the array fo constraints that we have ( and thats why we had it an array there as by rule map can be used only on arrays there) ; so now : we will have each constraint element as "constraint" and then automatically have an index for them, so that the index "idx" can be used to give the unique key for each item, which is needed everytime we use "map" in react, thus here below. */}
                                                    {problemData.constraints.map((constraint, idx) => (
                                                        // step1186: so it will render a "li" for each element of the array, thus here below.

                                                        <li
                                                            key={idx}
                                                        // step1187: make it flexbox so that the bullet and the text can be in same row with gap of 2, thus here below.
                                                            className="flex gap-2"
                                                        >
                                                            {/* step1188: now lets have the bullet point and the code itself ; we have bullet in span as its an inline element and we want in same line , even if it was div, still due to outer flexbox will be in same line only, but still lets use span here below, thus here below. */}

                                                            {/* step1189: get the bullet using ("ALT + 0149") ; because the bullets of ul not behaves normally in flex boxes and is removed, so we add a manual bullet here & also adding a manual bullet hepls us to style it with our own color here below using the primary text color based on the theme, thus here below. */}
                                                            <span className="text-primary">•</span>

                                                            {/* step1190: we use code tag now for the mathematical constraint as browser by default renders it In monospace font and looks a bit different than other texts and better for mathematical equations/expressions too ; so we : Use the code tag to semantically mark the constraint as technical or code-like content so it displays in monospace font and looks structured like programming expressions, thus here below. */}

                                                            {/* step1191: so the main reason of code tag is the style browser provides for it , but also we use it here as its <code> is an inline element by default ; but however its not needed here as the outer div is a flexbox and it will automatically have the bullet and the constaraints code here below in the same line, thus here below ; so the main reason of using it is to make it look a bit different than other texts and better for mathematical equations/expressions, thus here below. */}
                                                            <code className="text-sm">{constraint}</code>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Panel>

                            {/* step1192: now : between the top and middle panel, we will again have this resizable handle , but this time eith cursor of col-row-resize as now we want it to move vertically to resize the rows as the panels are one below the othere so clearly moving it up and down will resize the rows present one below the other clearly here/there, thus here below. */}

                            {/* step1193: also this time we won't give it w-2 as width is given when we want it to be from left to right width 2 ; but if we want it to be long from top to bottom then its height not width ; so give h-2 now instead of w-2 ; as here the handle will be moving from top to bottom to resize the row like panels present one belwo the othere, and not move side by side like the horizontal overall outer panels present here/there, thus here below. */}
                            <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
                            
                            {/* step1194: then the middle panel will be for the CODE EDITOR, thus here below. */}

                            {/* step1195: so this takes 50% of the left panel too and by rule both panles of the panel group should have default size sum upto 100, that also is satisfied here, thus here below. */}
                            <Panel defaultSize={50} minSize={20}>
                                
                                {/* step1195: now inside this panel we will have another panel group, that will have two panels again which will be one below the other i.e. vertical direction for the code editor and the output panel, thus here below. */}
                                <PanelGroup direction="vertical">

                                    {/* step1196: so now lets have the two panels here below , the first panel of the code-editor will take the 70% of the default size and thus by rule the panels in a panelgroup must sum upto 100, so the second panel will take 30% of the default size , thus here below. */}
                                    <Panel defaultSize={70} minSize={30}>

                                        {/* step1197: now here lets put the same code editor component, that we had in ProblemPage.jsx file with same props that we had there, thus here below. */}
                                        <CodeEditorPanel
                                            selectedLanguage={selectedLanguage}
                                            code={code}
                                            isRunning={isRunning}
                                            onLanguageChange={handleLanguageChange}
                                            onCodeChange={setCode}
                                            onRunCode={handleRunCode}
                                        />
                                    </Panel>

                                    {/* step1198: again now between the code-editor and output panel, we will again have this resizable handle , but this time with cursor of col-row-resize as now we want it to move vertically to resize the rows as the panels are one below the othere so clearly moving it up and down will resize the rows present one below the other clearly here/there, thus here below. */}

                                    {/* step1199: also this time we won't give it w-2 as width is given when we want it to be from left to right width 2 ; but if we want it to be long from top to bottom then its height not width ; so give h-2 now instead of w-2 ; as here the handle will be moving from top to bottom to resize the row like panels present one belwo the othere, and not move side by side like the horizontal overall outer panels present here/there, thus here below. */}
                                    <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

                                    {/* step1200: now lets have the output panel below the code-editor panel here, thus here below. */}        
                                    <Panel defaultSize={30} minSize={15}>

                                        {/* step1201: so here we put the output component that we had in ProblemPage.jsx file with same props that we had there, thus here below. */}
                                        <OutputPanel output={output} />
                                    </Panel>
                                </PanelGroup>
                            </Panel>
                        </PanelGroup>
                    </Panel>

                    {/* step1103: then lets have the handle to resize the panle now in the middle of both the panels here now, thus here below. */}
                    <PanelResizeHandle
                        // step1104: so here the panel is : styled with Tailwind CSS + DaisyUI theme colors where w-2 sets a thin width (8px) for the resize bar, bg-base-300 applies a neutral background color from DaisyUI theme, hover:bg-primary changes the background to primary theme color when hovered for visual feedback, transition-colors enables smooth color transition effect, and cursor-col-resize changes the mouse cursor to horizontal resize indicator when hovering, clearly signaling that the divider is draggable ; and it is horizontally movable to adjust the size of columns ; if we ant it to resize rows it should move vertically by logic as rows are one below the other, while columns are side by side, thus here below.
                        className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize"
                    />

                    {/* step1102: by rule the default size of both panels should sum up to 100% as by logic and rule, the total width has to eb taken in complete exact by all the panles ; so if they sum up not to 100% and is less or more than that ; the UI will look broken up with gaps or vacant places since the panels don't cover the entire width completely there, thus here below. */}
                    <Panel defaultSize={50} minSize={30}>

                        {/* step1202: see the next steps in step1203.txt file now there, thus here below. */}

                        {/* step1288: so now lets have the video section to be made in the right panel of the outermost panle group that had left and right panels there earlier now here/there, thus here below. */}

                        {/* step1289: so the outr div here below : uses Tailwind CSS + DaisyUI theme color where h-full makes the div take full height of the panel, bg-base-200 applies slightly elevated background color from DaisyUI theme, p-4 adds internal padding for spacing, and overflow-auto enables scrollbars only when content exceeds the container size, preventing layout breakage while keeping UI clean, thus here below. */}
                        <div className="h-full bg-base-200 p-4 overflow-auto">
                            
                            {/* step1290: now there : if the video call is being initialized, then we will render one thing, else if it has been initialized then we will render another thing, thus here below. */}
                            {isInitializingCall
                            ? (
                                // step1291: so if its still initializing, we show the loading spinner now here below , to prevent : showing incomplete content before setup finishes, thus here below.

                                // step1292: so first here below the div : uses Tailwind CSS where h-full makes it take full height of the parent panel, flex enables flexbox layout, items-center vertically centers the content, and justify-center horizontally centers it, ensuring the loader stays perfectly centered on the panel here/there, thus here below.
                                <div className="h-full flex items-center justify-center">

                                    {/* step1293: then the below div : uses Tailwind CSS where text-center horizontally centers all inner text and inline elements like the loader icon and ensures that both the loader icon and the loading message are centered together on the same horizontal line there, thus here below. */}
                                    <div className="text-center">

                                        {/* step1294: then the loader icon here below is shown that : uses Tailwind CSS + DaisyUI theme color where w-12 h-12 sets large icon size (48px), mx-auto horizontally centers the icon, animate-spin applies continuous rotation animation, text-primary applies theme primary color, and mb-4 adds spacing below the icon before the text, thus here below. */}
                                        <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />

                                        {/* step1295: finally we have a paragraph text here that : uses Tailwind CSS where text-lg increases font size for better visibility of the loading message, thus here below. */}
                                        <p className="text-lg">Connecting to the video call...</p>
                                    </div>
                                </div>
                            )
                            : (
                                // step1296: now if the call has been initialized, then we check if the streamClient is available or not or is it undefined and also check if the "call" object is available or not, thus here below.
                                
                                // step1297: so since in the useStreamClient hook, we in finally block made isInitializingCall false, so : even if error came there, still it became false, we saw there as finally block runs even if its success or error, thus here below.

                                // step1298: so once its false, and this code runs : first check if main video connection is there finally i.e. streamClient is available or not ; and also check if the "call" that we made there by useStreamClient hook is ready and available or not ; and if its still not ready correctly there and maybe is undefined, then show the following UI, else don't render anything there, thus here below.

                                // step1299: now rule is that : Inside the : ( ... ) part, you cannot wrap another {} again like that ; That extra {} is breaking the JSX syntax, so TypeScript says ')' expected error here, thus here below.

                                // {(!streamClient || !call) && (
                                //     <div></div>
                                // )}

                                // step1300: so we use the correct way of conditional rendering inside the outer conditional rendering, thus here below.
                                (!streamClient || !call) 
                                ? (
                                    // step1301: the below div now : uses Tailwind CSS where h-full makes it take full panel height, flex enables flexbox, items-center vertically centers content, and justify-center horizontally centers it, ensuring the error card inside this : is perfectly centered in the panel, thus here below.
                                    <div className="h-full flex items-center justify-center">

                                        {/* step1302: now : the div here : uses DaisyUI + Tailwind CSS where card applies structured card styling, bg-base-100 sets the surface background color, shadow-xl gives strong elevation for emphasis, and max-w-md limits card width for better readability and centered layout appearance, thus here below. */}
                                        <div className="card bg-base-100 shadow-xl max-w-md">

                                            {/* step1303: now : the div here: uses DaisyUI + Tailwind CSS where card-body applies internal padding, items-center centers flex items horizontally inside the card body, and text-center aligns text content centrally, thus here below. */}
                                            <div className="card-body items-center text-center">

                                                {/* step1304: now > the below class : uses Tailwind CSS + DaisyUI theme color where w-24 h-24 creates a large circular container (96px), bg-error/10 applies red error color with 10% opacity for soft background effect, rounded-full makes it perfectly circular, flex items-center justify-center centers the icon inside, and mb-4 adds spacing below it, thus here below. */}
                                                <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-4">

                                                    {/* step1305: now the icon here below : uses Tailwind CSS + DaisyUI theme color where w-12 h-12 sets large icon size (48px) and text-error applies red theme color to visually indicate failure state, thus here below. */}
                                                    <PhoneOffIcon className="w-12 h-12 text-error" />
                                                </div>

                                                {/* step1306: so now at the very end, we put the texts here below that uses : card-title which applies styled heading inside card component and text-2xl increases font size for strong emphasis & "text-base-content/70" : that applies main readable color with 70% opacity, making it slightly softer than the title for proper visual hierarchy, thus here below. */}

                                                {/* step1307: now don't think that outermost was a flexbox, so this all icon and text will be in same line ; NOOO : since there is only one div inside the flexbox , in which all these are there, so the flexbox was there to centre the whole content container to centre of screen using items and justify centre ; if ye sara icon, then both p agar alaga alag div me hote inside the flexbox as 3 different components in the flexbox , then they will be one beside othere ; but here its clear now that the only div inside the flexbox i.e. the outer container box for all these will be centred to centre of flexbox using item and justify centre and then : these will be one below the other only here/there, as div and p all are block level elements and so appear one below the other there, thus here below. */}
                                                <h2 className="card-title text-2xl">Connection failed!</h2>
                                                <h2 className="text-base-content/70">❌ Unable to connect to the video call!</h2>
                                            </div>
                                        </div>
                                    </div>
                                )

                                // step1308: so the above div was to show the error page when there was any errors there, thus here below.

                                // step1309: now if both streamClient and call are there, then we render the proper valid video call page, thus here below.
                                : (
                                    // step1310: so now here below we make the UI for the video to be displayed there, so here the div : uses Tailwind CSS where h-full makes this container take full height of its parent panel, ensuring the video call UI expands properly to fill the available vertical space, thus here below.

                                    // BASICALLY : this "h-full" is added there, so that the video call UI takes full height and later when callControls were added, there the components were present just belwo the video of user, as it was not taking full height ; so with this h-full : now it takes full height regardless of the VideoLayout is how smaller than full screen as callComponents always are rednered at end of this layout, so now callComponents are rendered at the very bottom of the screen there instead of showing it just below the video screen layout there, thus here below.
                                    <div className="h-full">

                                        {/* step1311: so this StreamVideo below : is a Stream Video SDK provider component that initializes the video context using the provided streamClient. It wraps all video-related components so they can access the video connection and state internally via context, thus here below. */}

                                        {/* step1312: so it wraps the custom VideoCallUI component present inside Stream’s video system so it can actually connect to a real video call ; its like : it it provides video context and authenticated client access to everything inside, thus here below. */}

                                        {/* step1313: now here below, we pass the : client = {streamClient} > as we know that it contains API key, user identity, token and authentciation things in it, like seen earlier as created in the useStreamClient.js hook file there ; so withou this the video cannot connect ; so it : provides the main connection to Stream’s servers ;"streamClient" is the authenticated video client object created inside the useStreamClient hook, and it contains the API key, user identity, and token. Without passing this client, Stream has no idea who the user is or how to connect to the video service ; so this prop basically tells the SDK: “Here is the logged-in user and connection configuration — use this to power everything inside there”, thus here below. */}

                                        {/* SO OVERALL : StreamVideo is a provider component from Stream’s SDK that initializes the video system using the authenticated streamClient. It wraps all nested components and makes the video connection, user identity, and call state available through React Context. */}
                                        <StreamVideo client={streamClient}>

                                            {/* step1314: StreamCall : is another Stream Video SDK component that binds the specific call instance (room/session) to the UI. It ensures that all nested components operate within this particular call context instead of just the generic video client, thus here below. */}

                                            {/* step1315: so > it basically provides specific call session ; we know that this "call" object being passed into it was created in useStreamClient hook earlier and it was creating a call there using the session ID as : const call = streamClient.call("default", session._id) there ; so this line below : connects the user to this session’s video room, thus here below. */}

                                            {/* step1316: so : the call prop tells StreamCall which specific video room to join. The call object is created from streamClient.call(...) inside the useStreamClient hook and represents a single video session (like one meeting room) ; so: Passing this prop means: “Join this particular call instance.” Without it, the SDK wouldn’t know which session ID or room to connect the user to. So this prop connects the user to the correct live video room tied to the session ID of the session in which this video is being opened there, thus here below. */}

                                            {/* step1317: so the StreamCall here connects the use to join the mentioned "call" vala specific call room there, thus here below. */}

                                            {/* SO OVERALL : StreamCall binds a specific call instance to the UI. The call object represents a single video room created using streamClient.call("default", session._id). By passing it here, all nested components operate within this specific session context. */}
                                            <StreamCall call={call}>

                                                {/* step1318: by rule : these components are provided by providers whose package we using , and they use the context of React internally ; so it means we are not passing the video data down from StreamVideo to StreamCall to this component here below ; but : the providers we using : they inject it automatically into child components present inside them ; so it means by wrapping the component we are going to build now here below ; it automatically assigns the video functionalities by authentication using StreamVideo and the connection to the "call" objects are made by above parent classes wrapping this and all gets applied to this below component we making to actually design the UI there, thus here below. */}

                                                {/* step1319: so this component will be just the UI and since its wrapped by the parent classes talked about above ; so it gets authentication and corrcet call and session connection made correctly and automaticaaly from them into this UI that gets applied and implemented too, thus here below. */}

                                                {/* step1320: so this is : our custom UI component that renders the actual video interface (participants, controls, chat, etc.). It receives "chatClient" and "channel" as props so that video and chat features can work together inside the same session ; so we pass these states as props in this to be used here/there, thus here below. */}

                                                {/* step1323: SO OVERALL : The reason we wrap VideoCallUI inside <StreamVideo> and <StreamCall> is because these components act as providers that use React Context internally to supply video-related data automatically to everything inside them. This means we are not manually passing video state, connection info, or participant data as props from parent to child. Instead, StreamVideo provides the authenticated video client context, and StreamCall provides the specific call (room) context, and both of them inject this data behind the scenes into nested components. So by simply wrapping our custom VideoCallUI inside these providers, it automatically gains access to the active call, participants, media state, and connection status without us explicitly passing those values down through props. */}

                                                {/* step1322: see the next steps in VideoCallUI.jsx file now there, thus here below. */}
                                                <VideoCallUI
                                                    chatClient = {chatClient}
                                                    channel = {channel}
                                                />
                                            </StreamCall>
                                        </StreamVideo>
                                    </div>
                                )
                            )
                            }
                        </div>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    )
}

export default SessionPage