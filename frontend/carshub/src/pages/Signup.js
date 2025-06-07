import React, { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import {  Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('')
  const [conPassword , setConPassword] = useState('')
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (password === conPassword) {
        await axios.post('http://localhost:5000/usersignup', {
          username,
          password,
          email,
        });
        toast.success('User signed up successfully.');
        localStorage.setItem('username', username);
        navigate('/')
      } else {
        toast.error('Passwords do not match.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error((error.response?.data?.message || 'Unknown error'));
    }
  };
  return (
    <>
    <Toaster/>
      <div class='container'>
      <center>
        <div style={{width:'40%',border:'solid black 1px',padding:'35px',marginTop:'120px',borderRadius:'5%',backgroundColor:'whitesmoke'}}>
          <h3><u>Signup</u></h3>
            <form method='post' onSubmit={ handleLogin }>
              Email = <input type='email' name='email' placeholder='enter your email' class='mt-3 p-1' onChange={(e) => setEmail(e.target.value)} />
              <br />
              Username = <input type='text' name='username' placeholder='enter your username' class='mt-3 p-1' onChange={(e) => setUsername(e.target.value)} />
              <br />
              Password = <input type='password' name='password' placeholder='enter your password' class='mt-3 p-1' onChange={(e) => setPassword(e.target.value)} />
              <br/>
              Conform password = <input type='password' name='conformPassword' placeholder='enter your password again' class='mt-3 w-50 p-1' onChange={(e) => setConPassword(e.target.value)} />
              <br/>
              <button type='submit' class='btn btn-outline-primary mt-3'>submit</button>
              <p className='mt-2'>Already have a account?   <Link to={'/accounts/login'}>log in</Link></p>
            </form>
          </div>
        </center>
    </div>
    </>
  )
}

export default Signup