import  {useState} from 'react'
import './Login.scss'
import { FaGoogle } from "react-icons/fa"
import { FaFacebookF } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"
import { FaEye } from "react-icons/fa"

function Login() {
    const [email, setEmail] = useState("")  
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState("false")
    
    const handleLogin = async() => {

        
    }

    const handleShowPassword = () => {
      setShowPassword(showPassword === "false"? "true" : "false")
    }

    return <form class="form">
        <h1>Login </h1>
        <p>Signup now and get full access to our app. </p>     
        <div className='flex-col'>
            <label>
                <input type="email" placeholder="" required=""/>
                <span>Email</span>
            </label> 

           
            <label className="password-container">
            <input
              type={showPassword === "true" ? "text" : "password"}
              placeholder=""
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
            <i onClick={handleShowPassword} className="password-icon">
              {showPassword === "true" ? <FaEye /> : <FaEyeSlash />}
            </i>
            </label>

            <span>
              Bạn quên mật khẩu? <a href= "">Nhấn vào đây!</a>
            </span>

            <button class="submit" onClick={handleLogin}>Login</button>
            
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
        

       
}

export default Login
