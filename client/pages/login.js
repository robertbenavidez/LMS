import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify'
import { SyncOutlined } from "@ant-design/icons";
import Link from 'next/link';


const Login = () => {
    
    // stores email from form
    const [email, setEmail] = useState('');
    // stores password from form
    const [password, setPassword] = useState('');
    // state for loading
    const [loading, setLoading] = useState(false)



    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.table({name, email, password})
        try {
            setLoading(true)
            const {data} = await axios.post(`/api/login`, {
                email,
                password
            })
            console.log('Login response', data)
            // setLoading(false)
            
        } catch (err) {
            toast(err.response.data)
            setLoading(false)
        }
    }


    return (
        <>
            <h1 className='jumbotron text-center bg-primary square'>Login</h1>
            
            <div className='container col-md-4 offset-md-4 pb-5'>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='email' 
                        className='form-control mb-4 p-4' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter Email'
                     />
                    <input 
                        type='password' 
                        className='form-control mb-4 p-4' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter Password'
                     />
                     <button 
                        type='submit' 
                        className='btn btn-block btn-primary'
                        disabled={ !email || !password || loading}
                        >
                            {loading ? <SyncOutlined spin /> : 'Submit'}
                    </button>
                </form>

                <p className="text-center p-3">
                    Not registered?
                    <Link href='/register'>
                        <a> Register</a>
                    </Link>
                </p>
            </div>

        </>
    )
}
/*
    1.Get username, email, and password
    2.Send usernam, email, and password to the database
 */
export default Login;