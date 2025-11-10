import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  
 //=========================================================
 const [credentials , setCredentials] = useState({ email : '' , password : ''})
 //=========================================================
 let navigate = useNavigate();
 //=========================================================

 
  const handleSubmit = async(e) => {
    e.preventDefault();                                   //----------> to stop page reloading
        //*******/
        //---------------> LOGIN API CALL IN THUNDER CLIENT
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email :credentials.email , password:credentials.password})           // body data type must match "Content-Type" header

        });
        const json = await response.json()
        console.log(json);

        if (json.success) {
          //Save the auth token and redirect
          localStorage.setItem('token' , json.authtoken)
          props.showAlert("Logged in Successfully " , "success")   //------->  to show alert
          navigate("/")
        }

        else{
      // alert('Invalid Credentials')
    props.showAlert("Invalid Details" , "danger" )
        }
  }
        /***** */
          // Function to handle input changes
  const onChange = (e) => {
    setCredentials({...credentials , [e.target.name]: e.target.value})
     }

  return (
    <div className='mt-3'>
      {/* ====================== */}
  <h1> Login to continue to ThinkPad</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" >Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password'  value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Submit</button>
      </form>

      {/* ====================== */}
    </div>
  )
}

export default Login