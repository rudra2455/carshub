import React,{ useState } from 'react'
import axios from 'axios';
import {  Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/userlogin', {username,password});
      toast.success('User logged in successfully.');
      localStorage.setItem('username', username);
      navigate('/')
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
        <div style={{width:'30%',border:'solid black 1px',padding:'40px',marginTop:'120px',borderRadius:'5%',backgroundColor:'whitesmoke'}}>
          <h3><u>Login</u></h3>
            <form method='post' onSubmit={ handleLogin }>
              Username = <input type='text' name='username' placeholder='enter your username' class='mt-3 p-1' onChange={(e) => setUsername(e.target.value)} />
              <br />
              Password = <input type='password' name='password' placeholder='enter your password' class='mt-3 p-1' onChange={(e) => setPassword(e.target.value)} />
              <br/>
              <button type='submit' class='btn btn-outline-success mt-3'>submit</button>
              <p className='mt-2'>Don't have any account?   <Link to={'/accounts/signup'}>sign up</Link></p>
            </form>
        </div>
      </center>
    </div>
    </>
  )
}

export default Login