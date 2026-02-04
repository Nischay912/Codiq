// step164: so we as usual have this model again with name as capital first letter and singular not plura l ".js", thus here below.

// step165: Now : lets import the mongoose model, which will help to communicate with the database there, thus here below.
import mongoose from "mongoose";

// step166: now lets create a schema i.e. a blueprint of how each document in the collection will look like ; like what fields exist and their validations ; then we put all these in a schema object, thus here below.
const sessionSchema = new mongoose.Schema(
    {
        // step167: every session will have a problem/question, thus here below.
        problem: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,

            // step168: enum is used to define the possible values of the field ; so it cannot be anything else than these values passed in enum array here, thus here below.
            enum: ["easy", "medium", "hard"],
            required: true
        },
        // step169: the person that creates the session, will be a user ; so we have type as the one mentioned below which is used for the "_id" that mongoDb gives us when a document is created and called the objectId, so we are storing another document's id here ; and it creates a relationship like foreign key in SQL ; as this objectId belongs to the User collection and links to the User model ; so we are referring to the User model using the "ref" property, thus here below.
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // step170: similarly for the participant as we will be having only 2 people in a session at a time like a student and an interviewer, thus here below.
        participant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",

            // step171: don't make this as required as the participant can join later also OR may not join, so participant is not required, thus here below.
            // required: true

            default: null
        },

        // step172: this will be used to tell if session is active OR if end session is pressd, then make it complete, thus here below.
        status: {
            type: String,
            enum: ["active", "completed"],
            default: "active" //as once we create a session, it will be active by default
        },

        // step173: now we have a STREAM video call id here, that will be used to connect to the STREAM's video call, thus here below.
        callId: {
            type: String,
            default: ""
        }

    },
    {
        timestamps: true,
    }
);

// step174: now lets create a model, which will help us to perform operations like creating, reading, updating and deleting data, based on this schema, thus here below.
const Session = mongoose.model("Session", sessionSchema)

// step175: now lets export the model to be used in other files, thus here below.

// step176: see the next steps in step177.txt file now there, thus here below.
export default Session

