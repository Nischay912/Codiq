// step720: now lets import the useQuery and useMutation hooks from TanStack, thus here below.
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";

// step721: now lets have a hook where we can get the active sessions ; can use this directly in ProblemsPage or anywhere too but better to keep all files organized here/there, thus here below.
export const useActiveSessions = () => {
    // step722: we use this useQuery() as it has many in-built features like refetch that automatically calls the API when any change happens in any state there and so re-renders the component automatically there, thus here below.
    const result = useQuery({

        // step723: the useQuery() hook takes these fields into it ; like : here this queryKey tells the unique name for the query, which is used to tell which data returned by the queryFn belongs to which query, thus here below.
        queryKey: ["activeSessions"],

        // step724: this is the function that runs everytime this query is called and used ; and this function fetches the data from the API, thus here below.

        // step725: the final result returned by useQuery returns an object like : { data, error, isLoading, isError, refetch, ..... } and we store it finally in result, thus here below.
        queryFn: sessionApi.getActiveSessions
    })
    
    // step726: finally we return this result, so that wherever this hook is used, this result containing the data can be used there, thus here below.

    // step727: see the next steps in step728.txt file now there, thus here below.
    return result;
}

// step729: now lets create a mutation hook for creating a new session, thus here below.

// step730: unlike useQuery which is used to fetch data, useMutation is used to change data, thus here below.
export const useCreateSession = () => {

    // step731: unlike useQuery this is not triggered automatically as when we have to chnage something, it must be triggered manually, thus here below.
    const result = useMutation({

        // step732: again we have a unique key to recognize that data belongs to which query, thus here below.
        mutationKey: ["createSession"],

        // step733: then we have that this function below will make the API call, to create a new session, thus here below.
        mutationFn: sessionApi.createSession,

        // step734: so now : this function below will be called if the API call is successful, thus here below.
        onSuccess: () => {
            toast.success("Session created successfully!")
        },

        // step735: so now : this function below will be called if the API call fails, thus here below.
        onError: (error) => {

            // step736: here we are using toast.error() to show the error message, and taking the error object given by react query automatically to us ; and then the error returned by axios has an error object that has : response as a field inside that we have another object that has data and then inside that data , that data is also an object inside which we have message, thus here below.

            // step737: we do optional chaning ?. here ; i.e. : if response exists then continue and access data and so on... as it may be possible that response may not exist ; so if its undefined and we try to do undefined. <anything> it will give error : Cannot read property 'data' of undefined ; so better let it stop there and be undefined and so if left side undefined run he right part after || there and show that error message in the toast, thus here below.
            toast.error(error.response?.data?.message || "Failed to create session!")
        }

    })

    // step738: finally we return this result, so that wherever this hook is used, this result containing the data can be used there, thus here below.
    return result
}

// step739: now lets have another hook similar to getActiveSessions but now for getRecentSessions, thus here below.
export const useMyRecentSessions = () => {
    // step740: we are again here fetching data, so it will be a useQuery() hook and not useMutation() as its used to change data and not to fetch data, thus here below.
    const result = useQuery({
        queryKey: ["myRecentSessions"],
        queryFn: sessionApi.getMyRecentSessions
    })
    return result;
}

// step741: similarly now make for getting the sessions by id, thus here below.

// step742: so it accepts an "id" parameter, thus here below.
export const useSessionById = (id) => {

    // step743: now the useQuery has many features that can be added here, like the ones here below, thus here below.
    const result = useQuery({

        // step744: so here we pass both id and a unique name for the key ; "id" needed here as we want different keys for different id's query and not just same "sessionById" for all as it must be unique for all of them here/there, thus here below.
        queryKey: ["sessionById", id],
        queryFn: () => sessionApi.getSessionById(id),

        // step745: now this controls when to run this query ; !! is used to convert a value to boolean ; so : !!10 = true , !!0 = false , !!undefined = false, !!null = false, !!"" = false, !!{} = true, !!"hello" = true, thus here below.

        // step746: so this makes it safe to run the query only if id is there, to prevent app from crashing as without "id" if we run this, it may crash as we have id = undefined and we are passing it into the function here/there ; Prevents accidental API calls like: /sessions/undefined and thus prevents app from crashing, thus here below.
        enabled: !!id,

        // step747: now we know that useQuery() makes the call regualrly one by one till a data is fetched , so even if call fails it keeps on calling it ; so now we can add the refetch interval here to make it call the API regualrly to detect the status of the session after every 5 seconds ; called POLLING i.e. used when session status may change from "active" to "completed" later ; we know useQuery() runs again again till data is loaded ; but once lets say data loaded for an active session, then it stops ; now if the status of session changes from "active" to "completed" later, then it will not be calling again automatically as it has fetched data so it stopped already ; thats why we use refetchInterval so that every 5 seconds it will keep on calling the API and checking the status and update it automatically if status of the session changes from "active" to "completed" anytime after the data was first time loaded by this useQuery there earlier here/there, thus here below.
        refetchInterval: 5000, // refetch every 5 seconds to detect session status changes
    })

    // step748: finally we return this result, so that wherever this hook is used, this result containing the data can be used there, thus here below.
    return result
}

// step749: now we can have more hooks now here below, thus here below.

// step1042: now we remove the parameter "id" from here below in both join and end session because of the reason told in step1039 and 1040 earlier there, thus here below.

// step1043: and so we also change here below the : mutationFn: () => sessionApi.endSession(id) into : mutationFn: sessionApi.endSession ; as here below now : earlier we had "id" passed in the function, so we wrapped the mutationFn using arrow function as arrow function is not called immediately but called when user wants , so the function manually called the API using the id when we called mutate() method in SessionPage there ; but now we are not passsing the "id" here and rather just using a refernce of the endSession and joinSession API from sessions.js file here, so : we saw in step1039 that we now pass the id when calling: endSessionMutation.mutate(id) there ; so react internally automatically takes whatever we pass into mutate(id) and provides it as the argument to mutationFn; so internally mutationFn(id) -> sessionApi.endSession(id) ; so now : we can directly pass the function reference and This works because React Query will automatically call: sessionApi.endSession(id) when : mutationFn: sessionApi.endSession is hit there, thus here below.

// step1044: so it means : now when we do mutate(id) in SessionPage , it takes the "id" and pass to the refernece mention here below i.e to the joinSession function of sessins.js directly and there we know and saw the "id" will be used to make call to the URL with that id here/there, thus here below.

// step1045: see the next steps in SessionPage.jsx file now there, thus here below.
export const useJoinSession = () => {

    // step750: we know we had join session as a POST request and not to fetch data via GET , so this will be useMutation and not usequery as we know that useQuery is used to fetch data and not to change data, thus here below.

    // step751: here by joining of user, database is getting modified and changed, so we will use useMutation as by rule useMutation is used to change data, thus here below.
    const result = useMutation({

        // step752: same as done above here also done all, thus here below.
        mutationKey: ["joinSession"],
        mutationFn: sessionApi.joinSession,
        onSuccess: () => {
            toast.success("Session joined successfully!")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to join session!")
        }
    })
    return result
}

// step753: similarly ending a session removes a participant from session and thus changes the database, so: here also we will use useMutation as by rule useMutation is used to change data, thus here below.

// step754: now see the next steps in DashboardPage.jsx file now there, thus here below.
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