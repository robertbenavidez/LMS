import User from '../models/user'
import { hashPassword, comparePassword } from '../utils/auth'


export const register = async (req, res) => {
    try {
        // console.log(req.body)
        // validate user
        // Note: this is crude validation. Look into a non Yup validation solution
        const { name, email, password} = req.body;
        if (!name) return res.status(400).send('Name required.')
        if (!email) return res.status(400).send('Email required')
        if (!password || password.length < 6) {
            return res.status(400).send('Password must be at least 6 letters and or numbers long')
        }
        let userExist = await User.findOne({email}).exec();
        if (userExist) return res.status(400).send("email is taken")

        // hash password
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error. Try again.')
    }
}