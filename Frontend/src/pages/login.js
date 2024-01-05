import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

// import lib
import { setAuthToken } from '../lib/localStorage';

// import config
import axios, { setAuthorization } from '../config/axios';

const initialFormValue = {
   email : '',
   password : '',
}

const Login = () => {
  
  // hooks
  const navigate = useNavigate();

  // state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [errors, setErrors] = useState({});


  const {email, password}  = formValue;


  const handleChange = (e) => {
    const {name, value }  = e.target;
    let formData =  {...formValue, ...{ [name] : value } }
    setFormValue(formData)
  }
  
  const handleSubmit = async () => {
    // localStorage.setItem('USER_NAME', 'VETRI');
    // let userName = localStorage.getItem('USER_NAME');
    // localStorage.removeItem('USER_NAME');
    // alert(userName)
    // return 
    try {

      let respData = await axios({
        method: 'post',
        url: `/login`,
        data: {
           'email' : email,
           'password' : password
        }
      });

   
  
      console.log(respData, 'respData')
      if(respData && respData.data && respData.data.status === true){
        alert(respData.data.message)
        setAuthToken(`Bearer ${respData.data.token}`);
        setAuthorization(`Bearer ${respData.data.token}`);
        setErrors({})
        setFormValue(initialFormValue)
      }
    } catch (err) {
       if(err && err.response && err.response.data && err.response.data.status === false){
        setErrors(err.response.data.errors)
       }
    }
  }
  
 
  console.log(errors, 'nameeeee')
  return (
    <form>
      <div className="container">
        <h1>Login</h1>
        <p>Please fill in this form to login your account.</p>
        <hr />
        <label><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" onChange={handleChange} value={email} />
        <span className='text-error'>{errors.email}</span><br />
        <label><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password" onChange={handleChange} value={password}/>
        <span className='text-error'>{errors.password}</span><br />
        <hr />
        <p>By creating an account you agree to our <a href="#">Terms &amp; Privacy</a>.</p>
        <button type="button" className="registerbtn" onClick={handleSubmit}>Login</button>
      </div>
      <div className="container signin">
      <p>Forget your password?<Link to="/forgetpassword">Click Here</Link>.</p>
        <p>New User? <Link to="/register">Register Here</Link>.</p>
      </div>
    </form>
  )
}

export default Login;
