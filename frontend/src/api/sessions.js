// step704: now lets first get the import for the axios Instance we created earlier to make requests to the URL using this instance, thus here below.
import axiosInstance from "../lib/axios";

// step705: now lets create an object here below to be used make calls using the axios instance, thus here below.

// step706: so now we will have here a group of related API functions in one place, which we can export and use in other files now there as needed there, thus here below.
export const sessionApi = {
    // step707: now here : we have a function to create a session, where user will pass some data and then in the backgorund we will be calling to the backend endpoint, thus here below.
    createSession: async(data) => {

        // step708: so we here : have call made to "/sessions" and in axios.js file we had made them to be automatically prefixed with : "http://localhost:3000/api" there > so it ultimately becomes : "http://localhost:3000/api/sessions", thus here below.

        // step709: and by the below syntax, we pass the data to be sent to the backend here, as its a POST request, thus here below.
        const response = await axiosInstance.post("/sessions", data);

        // step710: finally we return the data that came back from the backend which is stored in "data" field in the response object that came from backend, thus here below.
        return response.data
    },

    // step711: similarly we will have more such methods, thus here below.

    // step712: its a GET request, used to just fetch data from the backend, so no data needs to be sent, thus here below.
    getActiveSessions: async() => {
        const response = await axiosInstance.get("/sessions/active");
        return response.data
    },
    getMyRecentSessions: async() => {
        const response = await axiosInstance.get("/sessions/my-recent");
        return response.data
    },

    // step713: now here we will send the id of the session to be joined to the backend, thus here below.

    // step714: though its a GET request we are sending "id" in it ; as we know there is no data sent in GET request, but we need this "id" to be sent dynamically from the URL , so that backend can recieve it like ; if we have : /sessions/10, then req.params.id = 10 & if /sessions?id=10, then req.query.id = 10, thus here below.
    getSessionById: async(id) => {
        const response = await axiosInstance.get(`/sessions/${id}`);
        return response.data
    },

    // step715: now we have POST request, but we are not sending any data there like (....., data) like done above ; its because POST doesn't means that we surely have to send the data to the backend ; but here by joining session, number of participants and all changes, database chnages ; so in this case whenever a server state changes, we should use POST and not GET ; here POST takes the data needed from URL itself sent here as "id", thus here below.
    joinSession: async(id) => {
        const response = await axiosInstance.post(`/sessions/${id}/join`);
        return response.data
    },

    // step716: similarly here : we make the POST request here with the "id" that tells which session has to be ended ; and this id we are passing to URL below ; so in backend, it takes the "id" from URL there using req.params in the backend there, thus here below.

    // step717: now in any file where this object with all these functions are imported, we can use these functions directly there using lets say sessionApi.endSession(id) ; thus here below.

    // step718: see the next steps in step719.txt file now there, thus here below.
    endSession: async(id) => {
        const response = await axiosInstance.post(`/sessions/${id}/end`);
        return response.data
    },
    getStreamToken: async() => {
        const response = await axiosInstance.get(`/chat/token`);
        return response.data
    }
}