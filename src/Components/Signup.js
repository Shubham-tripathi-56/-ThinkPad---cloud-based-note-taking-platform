import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {

  //=========================================================
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })
  //=========================================================
  let navigate = useNavigate();
  //=========================================================


  const handleSubmit = async (e) => {
    e.preventDefault();                                   //----------> to stop page reloading

    const { name, email, password } = credentials;
    //*******/
    //---------------> LOGIN API CALL IN THUNDER CLIENT
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })           // body data type must match "Content-Type" header

    });
    const json = await response.json()

    if (json.success) {
    //Save the auth token and redirect
    localStorage.setItem('token', json.authtoken)
    navigate("/")
    props.showAlert("Account Created Successfully " , "success")
  }

  else{
    // alert('Invalid Credentials')
    props.showAlert("Invalid credentials" , "danger")
  }

}
  /***** */
  // Function to handle input changes
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    //=====================================

  }
  return (
    <div className='container mt-2'>
      {/* ====================== */}
      <h1 className='my-3'> Create an account to continue to ThinkPad</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="name" className="form-label" >Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="namemaile" className="form-label" >Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange}  minLength={5} />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange}     minLength={5} />
        </div>


        <button type="submit" className="btn btn-primary" onChange={onChange} >Submit</button>
      </form>

      {/* ====================== */}
    </div>
  )
}

export default Signup       