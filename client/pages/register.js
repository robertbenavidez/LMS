import { useState } from "react";
const Register = () => {
    // stores name from form
    const [name, setName] = useState('');
    // stores email from form
    const [email, setEmail] = useState('');
    // stores password from form
    const [password, setPassword] = useState('');



    const handleSubmit = e => {
        e.preventDefault();
        console.table({name, email, password})
    }
    return (
        <>
            <h1 className='jumbotron text-center bg-primary square'>Register</h1>
            
            <div className='container col-md-4 offset-md-4 pb-5'>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='text' 
                        className='form-control mb-4 p-4' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter Name'
                     />
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
                     <button type='submit' className='btn btn-block btn-primary'>submit</button>
                </form>
            </div>

        </>
    )
}
/*
    1.Get username, email, and password
    2.Send usernam, email, and password to the database
 */
export default Register;