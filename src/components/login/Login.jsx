import  {useState} from 'react'
import './login.scss';

function Login() {
    const [email, setEmail] = useState("")  
    const [password, setPassword] = useState("")
    const [showPassword, setshowPassword] = useState("false")
    
    const handleLogin = async() => {
        
    }

    return <div className='form-login'>
        <h1>Login</h1>
        <label htmlFor="email" >Email</label>
        <input type="text" id='email' placeholder='Enter your email...'/>
        <label htmlFor="password">Password</label>
        <input type="password" id='password' placeholder='Password'/>
        <a href="">Forgot Password?</a>
        <button
        onClick={() => handleLogin()}
        >Login</button>
    </div>
}

export default Login