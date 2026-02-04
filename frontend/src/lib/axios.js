// step279: so we import the axios module from the axios package, thus here below.
import axios from "axios";

// step280: now lets create an axios instance using ".create()" to be used to implement the various features of the "axios" there which is used to make API calls similar to fetch, but easier than it, thus here below.
const axiosInstance = axios.create({

    // step281: we now have the common starting URL for all the requests to be made we set that here below, so now instead of writing axios.get("http://localhost:3000/api/users") , we can just write axios.get("/users") ; and it auto-applies the starting url from here, thus here below.
    // baseURL: "http://localhost:3000/api",

    // step282: this syntax is provided by VITE : to access frontend/.env & in backend its using process.env, thus here below ; and these access the .env with prefix "VITE", thats why prefix "VITE" is must in .env here to access it using this syntax there, thus here below.
    baseURL: import.meta.env.VITE_API_URL,

    // step283: we enable this true below to allow frontend to send COOKIES/SESSION with the request made to the backend url ; so if backend sets cookie, then without withCredentials: true , it won't be sent, and with this, it will be sent automatically with the request, to the backend ; so thus : axios.create() creates a reusable Axios instance with default configurations like baseURL and credentials, so we don't repeat them for every request, thus here below.

    // step284: can verify that we have some cookies in the browser when we login by > going for login on the app > go in inspect > application > cookies > clear everything > then do login there and see that SESSION cookies are saved there > so after being logged in > we will want to send this cookie to the backend whenever we make a request to the API, we will want to send this token automatically with it to the backend too for authentication, thus here below ; and for that only we have the following code, thus here below.
 
    // step285: using this / by adding this field below now : the browser will send the cookies to the server automatically on every single request made to the sever from client side on frontend there after being logged in, so that backend and CLERK on backend can use these cookies to authenticate the user, thus here below and ensure that the user is authenticated there before they can make any request to the backend, thus here below ; and ensures that the request came from an authenticated user, thus here below.
    withCredentials: true
})

// step286: finally lets export this axiosInstance to be used in to other files, whenever we want to make a request to the backend and call our API there, thus here below.

// step287: see the next steps in step288.txt file now there, thus here below.
export default axiosInstance