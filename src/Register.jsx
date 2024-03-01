import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
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
        const Register = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            username: formData.username,
            password: formData.password
        }
        if (formData.firstname == '' || formData.lastname == '' || formData.username == '' || formData.password == '') {
            return alert("Values cannot be empty");
        }
        else {
            fetch(`http://localhost:8080/register/add`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(Register)
            })
                .then((response) => {
                    if (!response.ok) {
                        alert("UserName is Already exists");
                        throw new Error("Failed to fetch data");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data === !formData.username) {
                        return alert("UserName is Already Taken");
                    } else {
                        console.log("Data", data)
                        setFormData(data)
                    }
                })
                .catch((error) => {
                    console.error("Error During fetch", error);
                })
        }

        // fetch(`http://localhost:8080/register/checkregister?`, {
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     method: 'POST',
        //     body: JSON.stringify(Register)
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error("Failed to fetch data");
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         if (data === !formData.username) {
        //             return alert("UserName is Already Taken");
        //         } else {
        //             console.log("Data", data)
        //             setFormData(data)
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error During fetch", error);
        //     })
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
                <div style={inputContainerStyle}><label htmlFor="firstname" style={labelStyle}>FirstName : </label>
                    <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} style={inputStyle} /><br /></div>
                <div style={inputContainerStyle}><label htmlFor="lastname" style={labelStyle}>LastName : </label>
                    <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} style={inputStyle} /><br /></div>
                <div style={inputContainerStyle}><label htmlFor="username" style={labelStyle}>UserName : </label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} style={inputStyle} /><br /></div>
                <div style={inputContainerStyle}><label htmlFor="password" style={labelStyle}>Password : </label>
                    <input type="text" name="password" value={formData.password} onChange={handleChange} style={inputStyle} /><br /></div>
                <div style={buttonContainerStyle}><button type="submit" style={submitButtonStyle}>Sign Up</button></div>
            </form>
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
export default Register;