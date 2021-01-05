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

//Adding middleware
//Encrypt the password before we save
//.pre because we want this to happen pre save
userSchema.pre('save' ,async function(next) {
    //Part of mongoose. Checks if there is an update but not password
    //Passing the field we want to check
    if(!this.isModified('password')){
        next() //moves on
    }

    const salt = await bcrypt.genSalt(10)
    //setting plain text passowrd to hashed password
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User