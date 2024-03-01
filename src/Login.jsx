import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    console.log(name, value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(formData);
    // const Register ={
    //     username: formData.username,
    //     password: formData.password
    // }
    if (formData.username == "" || formData.password == ""){
      return alert("Input Values Cannot be empty");
    }
    else{
      fetch(`http://localhost:8080/register/check?username=${formData.username}&password=${formData.password}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        if (data === !formData.username && data === !formData.password) {
          return alert("Enter Valid Details");
        } else {
          console.log("Data", data)
          setFormData(data)
        }
      })
      .catch((error) => {
        console.error("Error During fetch", error);
      })
    }
  }
  return (
    <div>
      <div class="d-flex justify-center mt-5 ml-5 text-center"><div style={change} class="text-end">
        <Link to='/login'>Login</Link>
      </div>
        <div style={home}>
          <Link to='/register'>Register</Link>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}><label style={labelStyle} htmlFor="username">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} style={inputStyle}></input><br></br></div>
        <div style={inputContainerStyle}><label style={labelStyle} htmlFor="password">password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} style={inputStyle}></input><br></br></div>
        <div style={buttonContainerStyle}><button type="submit" style={submitButtonStyle}>Sign In</button></div>
        <Link to="/register">Create New Accout</Link>
      </form>
      <div className='container'>
        {Array.isArray(formData) && formData.map((formData) => (
          <div className='card' key={formData.id}>
            <h1>Welcome {formData.username}</h1>
          </div>
        ))}
      </div>
    </div>
  );

}
const home = {
  padding: '10px',
  maxWidth: '100px',
  margin: 'auto',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
const change = {
  maxWidth: '100px',
  margin: 'auto',
  padding: '10px',
  backgroundColor: 'yellow',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
const formStyle = {
  maxWidth: '400px',
  margin: 'auto',
};

const inputContainerStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box',
};

const buttonContainerStyle = {
  marginTop: '15px',
};

const submitButtonStyle = {
  padding: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
export default Login;