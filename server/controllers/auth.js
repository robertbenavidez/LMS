import User from '../models/user'
import { hashPassword, comparePassword } from '../utils/auth'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        // validate user
        // Note: this is crude validation. Look into a non Yup validation solution
        
        const { name, email, password } = req.body;
        if (!name) return res.status(400).send('Name required.')
        if (!email) return res.status(400).send('Email required')
        let userExist = await User.findOne({email}).exec();
        if (userExist) return res.status(400).send("email is taken")

        // hash password
        const hashedPassword = await hashPassword(password)
        console.log('hashedPassword',hashedPassword)
        // register user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save()
        console.log('saved user', user)
        return res.json({ok: true})
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error. Try again.')
    }
}

export const login = async (req, res) => {
    try {
        console.log('login', req.body)
        // email and password from frontend login
        const {email, password} = req.body

        // Check if the user email is in the DB
        const user = await User.findOne({ email }).exec();
        if (!user) return res.status(400).send('No user found')

        // compare password to password in the DB
        const match = await comparePassword(password, user.password)

        // Create signed JWT
        const token = jwt.sign(
            {
                id: user._id}, 
                process.env.JWT_SECRET, 
                {expiresIn: "7d"
            })
        
            // return user and token to client, exclude hashed password
            res.cookie('token', token, {
                httpOnly: true,
                // secure: true, // only works on https
            })

            // send user as json response
            res.json(user)

    } catch (err) {
        console.log(err)
        return res.status(400).send('Error, Try again.')
    }
}
