import React, { useState, useEffect, Fragment } from "react";
import { Link ,useNavigate} from "react-router-dom";

// import config
import axios from '../config/axios';

// axios
const initialFormValue = {
   name : '',
   email : '',
   password : '',
   age : '',
   phoneNo : ''
}
const Register = () => {
  
  // state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [errors, setErrors] = useState({});


  const { name, email, password, age, phoneNo }  = formValue;
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [age, setAge] = useState('')

  const handleChange = (e) => {
    const { name, value }  = e.target;
    let formData =  {...formValue, ...{ [name] : value } }
    setFormValue(formData)
    // if(e.target.name === 'name'){
    //   setName(e.target.value)
    // } else if(e.target.name === 'email'){
    //   setEmail(e.target.value)
    // } else if(e.target.name === 'password'){
    //   setPassword(e.target.value)
    // } else {
    //   setAge(e.target.value)
    // }

  }
  // useNavigate
  const navigate=useNavigate();

  const handleSubmit = async () => {
    try {
      let respData = await axios({
        method: 'post',
        url: `/register`,
        data: {
           'email' : email,
           'password' : password,
           'name' : name,
           'age' : age,
           'phoneNo' : phoneNo
        }
      });
  
      // console.log(respData, 'respDatarespDatarespData')
      if(respData && respData.data && respData.data.status === true){
        alert(respData.data.message)
        setErrors({})
        setFormValue(initialFormValue)
        navigate('/login')
      }
    } catch (err) {
       if(err && err.response && err.response.data && err.response.data.status === false){
        setErrors(err.response.data.errors)
       }
    }
  
  }
  
 

  return (
    <form>
      <div className="container">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />
        <label><b>Name</b></label>
        <input type="text" placeholder="Enter Name" name="name" onChange={handleChange} value={name} />
        <span className='text-error'>{errors.name}</span><br />
        <label><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" onChange={handleChange} value={email} />
        <span className='text-error'>{errors.email}</span><br />
        <label><b>Phone No</b></label>
        <input type="text" placeholder="Enter Phone Number" name="phoneNo" onChange={handleChange} value={phoneNo} />
        <span className='text-error'>{errors.phoneNo}</span><br />
        <label><b>Age</b></label>
        <input type="text" placeholder="Enter Age" name="age" onChange={handleChange} value={age} />
        <span className='text-error'>{errors.age}</span><br />
        <label><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password" onChange={handleChange} value={password}/>
        <span className='text-error'>{errors.password}</span><br />
        <hr />
        <p>By creating an account you agree to our <a href="#">Terms &amp; Privacy</a>.</p>
        <button type="button" className="registerbtn" onClick={handleSubmit}>Register</button>
      </div>
      <div className="container signin">
        <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
      </div>
    </form>
  )
}

export default Register;
