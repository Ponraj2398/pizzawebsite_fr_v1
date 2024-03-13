import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import img from '../src/images/lgimg.png'
const YourComponent = () => {
  const [isRightPanelActive, setRightPanelActive] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    console.log(name, value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.username === 'admin' && formData.password === 'admin123') {
      // Perform authentication logic (e.g., set a token in localStorage)
      console.log('Admin signed in successfully!');
      navigate('/admin');
    } else {
      console.log('Invalid credentials');
    }
    fetch(`http://localhost:8080/register/check?username=${formData.username}&password=${formData.password}`)
      .then((response) => {
        if (!response.ok) {
          // alert("Enter Valid Login credentials");
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data", data);
        setFormData(data);
        // if (data.success) {
        //   alert("Sign-in failed");
        // } else {
        navigate('/index',formData);  
        // }
      })
      .catch((error) => {
        console.error("Error During fetch", error);
      });
  }

  const handleSignUpClick = () => {
    console.log("SignUp Clicked");
    setRightPanelActive(true);
    console.log("isRightPanelActive:", isRightPanelActive);
  };

  const handleSignInClick = () => {
    console.log("SignIn Clicked");
    setRightPanelActive(false);
    console.log("isRightPanelActive:", isRightPanelActive);
  };
  const [rgData, setRgData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitRegister = async (event) => {
    event.preventDefault();

    try {

      const response = await fetch('http://localhost:8080/register/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: rgData.email,
          username: rgData.username,
          password: rgData.password,
        }),
      });

      if (!response.ok) {
        if (response.status === 302) {
          // Username already exists
          setErrorMessage('Username is already taken');
        } else {
          throw new Error('Failed to register');
        }
      } else {
        // Registration successful, do something if needed
        const data = await response.json();
        console.log('Registration successful:', data);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An error occurred during registration');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRgData({ ...rgData, [name]: value });
  };
  return (

    <div className={`containers ${isRightPanelActive ? 'right-panel-active' : ''}`} id="containers">
      <div className="form-containers sign-up-containers">
        <form action="#" onSubmit={handleSubmitRegister}>
          <h1 className='wel'>Create Account</h1>
          <div className="social-containers">
            <a href="#" className="social"><i className="bi bi-facebook" style={{ fontSize: '23px' }}></i></a>
            <a href="#" className="social">
              {/* <i class="bi bi-google" style={{fontSize:'25px'}}></i> */}
              <img src="https://www.freepnglogos.com/uploads/google-plus-png-logo/world-brand-google-logo-png-transparent-23.png" width={22} height={22} alt="#" />
            </a>
            <a href="#" className="social"><i className="bi bi-linkedin" style={{ fontSize: '25px' }}></i></a>
          </div>
          <span className='sp'>or use your email</span>
          <div>
            <input type="email"
              name="email"
              value={rgData.email}
              onChange={handleInputChange} placeholder="Email" className="mb-2" required />
          </div>
          <div>
            <input type="text"
              name="username"
              value={rgData.username}
              onChange={handleInputChange} placeholder="Username" className="mb-2" required />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div>
            <input type="password"
              name="password"
              value={rgData.password}
              onChange={handleInputChange} placeholder="Password" className="pass" required />
          </div>
          <button onClick={handleSignUpClick} className='ghost'>Sign Up</button>
        </form>
      </div>
      <div className="form-containers sign-in-containers">
        <form action="#" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="social-containers">
            <a href="#" className="social">
              <i className="bi bi-facebook" style={{ fontSize: '25px' }}></i>
            </a>
            <a href="#" className="social">
              {/* <i class="bi bi-google" style={{fontSize:'25px'}}></i> */}
              <img src="https://www.freepnglogos.com/uploads/google-plus-png-logo/world-brand-google-logo-png-transparent-23.png" width={22} height={22} alt="" />
            </a>
            <a href="#" className="social"><i className="bi bi-linkedin" style={{ fontSize: '25px' }}></i></a>
          </div>
          <span className='sp'>or use your account</span>
          <div>
            <input type="text" name="username" value={formData.username} placeholder="Username" onChange={handleChange} className="user mb-3" required />
          </div>
          <div>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="mb-3" required />
          </div>
          <a href="#" className='forgot text-decoration-none mt-2'>Forgot your password?</a>
          <button onClick={handleSignInClick} className='ghost'>Sign In</button>
        </form>
      </div>
      <div className="overlay-containers">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className='wel'>Welcome Back!</h1>
            {/* <p>To keep connected with us please login with your personal info</p> */}
            <img src={img} className='phoneimg' alt="" />
            <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className='wel'>Hello, Friend!</h1>
            {/* <p>Enter your personal details and start the journey with us</p> */}
            <img src={img} className='phoneimg' alt="" />
            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
