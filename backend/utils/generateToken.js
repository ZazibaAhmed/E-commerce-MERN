import jwt from 'jsonwebtoken'

//Id is the payload we want to add to this token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d' //Token will expire in 30days
    });
}

export default generateToken;