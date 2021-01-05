import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
}) 

//Use bcrypt to compare the entered plain text with the db passowrd that is hashed
// the compare method comapares the plain text with encrypted password
userSchema.methods.matchPassword = async function(enteredPassword){
    //We call matchPassword on the specific user and access their password with this.password
    return await bcrypt.compare( enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User