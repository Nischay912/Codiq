// step64: now lets import the mongoose model, which will help to communicate with the database there, thus here below.
import mongoose from "mongoose"

// step65: now lets create a schema i.e. a blueprint of how each document in the collection will look like ; like what fields exist and their validations ; then we put all these in a schema object, thus here below.
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // as emails of each must be unique, though names can be same of many
        },
        profileImage: {
            type: String,
            default: ""
        },

        // step66: also every user will have a unique clerk id, to get to know that which this user saved in MongoDB is, in the clerk dashboard, ITS LIKE A REFERNCE TO THE CLERK DASHBOARD THERE, thus here below.
        clerkId: {
            type: String,
            required: true,
            unique: true,
        }
    },
    // step67: always add timestamps true at end to ensure that the createdAt and updatedAt fields are added to the schema when created in MongoDB database there, thus here below. 
    {
        timestamps: true,
    }
)

// step68: now we create a model based on this schema, using which we can interact with the database collection ; so model is used to indert, update, delete or read data ; so we have : Schema → structure of one document ; Model → represents one collection ; Document → one row/record inside collection ; Collection → group of documents, thus here below.

// step69: so here below "User" is collection name which is by converntion written singular and first letter caps & then mongoose automatically converts it to lowercase+plural, thus saving it as "users" collection, thus here below ; thus syntax is : const ModelVariable = mongoose.model("ModelName", schemaObject), thus here below.

// step70: also we keep the model name as singular only as by rule its automatically made plural+lowercase when saved in database, thus here below.
const User = mongoose.model("User", userSchema)

// step71: now lets export the model to be used in other files, thus here below.

// step72: see the next steps in step73.txt file now there, thus here below.
export default User
