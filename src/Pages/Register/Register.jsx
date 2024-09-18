import  {useState} from 'react'
import './Register.scss'
import { FaGoogle,FaFacebookF } from "react-icons/fa"


function Register() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")  
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const handleRegister = async() => {

        
    }

    return <div className="container">
        <form class="form">
        <h1>Register </h1>
        <p>Signup now and get full access to our app. </p>
        <div class="flex-row">
            <label>
                <input type="text" placeholder="" required=""/>
                <span>Firstname</span>
            </label>
    
            <label>
                <input type="text" placeholder="" required=""/>
                <span>Lastname</span>
            </label>
        </div>  
                
        <div className='flex-col'>
            <label>
                <input type="email" placeholder="" required=""/>
                <span>Email</span>
            </label> 
                
            <label>
                <input type="password" placeholder="" required=""/>
                <span>Password</span>
            </label>
            <label>
                <input type="password" placeholder="" required=""/>
                <span>Confirm password</span>
            </label>
            <button class="submit" onClick={handleRegister}>Register</button>
            <p>Bạn đã có tài khoản? <a href="#">Sign In</a> </p>
        </div>
        <div className='login'>
          <button>
          <i>
          <FaGoogle />
          </i>
            Đăng nhập với Google
         </button>
         
          <button>
          <i>
            <FaFacebookF />
          </i>
            Đăng nhập với Google
          </button>
        </div>
    </form>
    </div>            
}

export default Register


