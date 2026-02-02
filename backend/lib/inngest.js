// step77: now lets import inngest from the package installed and other two imports, thus here below.
import { Inngest } from "inngest"
import { connectDB } from "./db.js"
import User from "../models/User.js"

// step78: now go on ingest.com > docs > NodeJs > step3 is to create a client to send and recieve events, so copy them and paste it, thus here below.

// step79: so we create a new inngest client object here, so that the client instance can talk to Inngest service ; and lets say this is for our application called "Codiq", thus here below.
export const inngest = new Inngest({ id: "Codiq" });

// step80: now lets create some functions like syncUser to take the user from clerk and save it to the MongoDB database, thus here below.

// step81: so these event function is like a background job we are creating here below using the createFunction method of inngest ; so if a event comes from Clerk then it will be handled by this function ; its just like app.get() runs when a route is called, similarly this function will be run when an event comes from Clerk, thus here below.
const sycUser = inngest.createFunction(

    // step82: so 1st we have a unique id/name for this function ; can be anything, thus here below.
    {
        id: "sync-user"
    },

    // step83: then we have that which event from Clerk will trigger this function ; here its "clerk/user.created" , which means when a user is created in Clerk , this function will run, thus here below.
    {
        event: "clerk/user.created"
    },

    // step84: now we have the actual function which will be run when this event comes from Clerk, thus here below.

    /* step85: so now it takes the event object which contains the event data ; now we can test what this "event" contains by doing > go on clerk.com > "Testing" select in that webhook we created there > select event "user.created" and then we see there that the "event" that will be created and that inngest will get via webhooks connected are -

    {
    "data": {
        "backup_code_enabled": false,
        "banned": false,
        "create_organization_enabled": true,
        "create_organizations_limit": null,
        "created_at": 1716883200000,
        "delete_self_enabled": true,
        "email_addresses": [],
        "enterprise_accounts": [],
        "external_accounts": [],
        "external_id": null,
        "first_name": "John",
        "has_image": true,
        "id": "user_2g7np7Hrk0SN6kj5EDMLDaKNL0S",
        "image_url": "https://img.clerk.com/xxxxxx",
        "last_active_at": 1716883200000,
        "last_name": "Doe",
        "last_sign_in_at": 1716883200000,
        "legal_accepted_at": 1716883200000,
        "locked": false,
        "lockout_expires_in_seconds": null,
        "mfa_disabled_at": null,
        "mfa_enabled_at": null,
        "object": "user",
        "passkeys": [],
        "password_enabled": true,
        "phone_numbers": [],
        "primary_email_address_id": "idn_2g7np7Hrk0SN6kj5EDMLDaKNL0S",
        "primary_phone_number_id": null,
        "primary_web3_wallet_id": null,
        "private_metadata": null,
        "profile_image_url": "https://img.clerk.com/xxxxxx",
        "public_metadata": {},
        "saml_accounts": [],
        "totp_enabled": false,
        "two_factor_enabled": false,
        "unsafe_metadata": {},
        "updated_at": 1716883200000,
        "username": null,
        "verification_attempts_remaining": null,
        "web3_wallets": []
    },
    "event_attributes": {
        "http_request": {
        "client_ip": "192.168.1.100",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        }
    },
    "instance_id": "ins_2g7np7Hrk0SN6kj5EDMLDaKNL0S",
    "object": "event",
    "timestamp": 1716883200,
    "type": "user.created"
    }

    ; so we see that, in "data" , we have "first_name", "image_url", "created_at", etc ; that we will be grabbing now sent from clerk on inngets via webhooks, thus here below.

    */

    async({event}) => {
        // step86: so first we connect to the MongoDB database, thus here below.
        await connectDB();

        // step87: now we grab the data from the event object, thus here below.
        const { id, email_addresses, first_name, last_name, image_url } = event.data;

        // step88: now lets create an object that will have all the fields that are there in the User model we created and so lets form an object with values getting from the event data, thus here below.
        const newUser = {

            // step89: data came from clerk so id is clerk id of that user here, thus here below.
            clerkId: id,

            // step90: its an array like : [{ email_address: "abc@gmail.com" }] ; so we get the 0th index of that array and get its email_address, thus here below ; we use "?." i.e. chaining operator to use it if it exists, else to prevent crashing the app, we just have it "undefined" taken here, thus here below.
            email: email_addresses[0]?.email_address,

            // step91: now we save the name like this seperated by " " space and use || to ensure that if user has no first name or no last name then keep it as empty rather than printing and haveing "null" for it there, thus here below.
            name: `${first_name || ""} ${last_name || ""}`,
            profileImage: image_url
        }

        // step92: now lets create a new user document in the database in the users collection; as .create is used to create a new document ; so the above object becomes that one document, thus here below.
        await User.create(newUser);
    }
)

// step95: now similarly have a function to be run for "user.deleted" event that comes when a user is deleted from Clerk, thus here below.
const deleteUserFromDB = inngest.createFunction(
    {
        id: "delete-user-from-db"
    },
    {
        event: "clerk/user.deleted"
    },
    async({event}) => {
        await connectDB();
        const { id } = event.data;

        // step96: now mongoose uses this method of deleting one matching document with this id as its "clerkId" there, which was sent from clerk for the user who was deleted ; that document thus gets deleted from MongoDB as well using this code below now, thus here below.

        // step97: see the next steps in server.js file now there, thus here below.
        await User.deleteOne({ clerkId: id });
    }
)

// step93: finally we export a list of all the functions to be exported and used in other files and store this array into a variable named "functions", thus here below.

// step94: these can now be exported so that ingest uses them ; so : It exports an array of Inngest functions so they can be registered and executed by the server, thus here below.
export const functions = [sycUser, deleteUserFromDB];