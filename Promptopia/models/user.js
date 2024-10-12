import { Schema , model , models } from "mongoose";

const UserSchema = new Schema({
    email : {
        type : String,
        unique : [true,'Email already exists!'],
        required : [true,'Email is required'],
    },

    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric characters and be unique"]
    },

    image : {
        type : String,
    }
});


//this route is called everytime from scratch when the connection is established
//so the models.User first checks whether it exists previously or not 
// if it exists it wont create again
const User = models.User || model("User",UserSchema);

export default User;