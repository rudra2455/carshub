import React from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import defaultProfilePic from '../images/profile.jpg'


const Navbar = () => {
    const user = localStorage.getItem('username')
    function isLoggedin(){
        if(user){
            return true
        }
        else{
            return false
        }
    }
    function logout(){
        toast.success('user logged out successfully')
        localStorage.removeItem('username')
        setTimeout(()=>{window.location.reload()},3000)
    }
    const navigate = useNavigate()
    function handleBookClick(e) {
        if (!isLoggedin()) {
          e.preventDefault(); // Prevent default link behavior
          toast.error('You need to log in to book a car');
          navigate('/accounts/login'); // Redirect to login page
        }
      }

  return (
    <>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top" style={{ backgroundColor: '#ECEFF1'}}>
            <div class="container">
                <Link to={'/'} class="navbar-brand">
                    <h1>Cars Hub</h1>
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <Link to={'/'} class="nav-link active">home</Link>
                        </li>
                        <li class="nav-item">
                            <Link to={'/book'} className="nav-link active" onClick={handleBookClick}>Book</Link>
                        </li>
                        <li class="nav-item">
                            <Link to={'/orders'} class="nav-link active">orders</Link>
                        </li>
                        <li class="nav-item">
                            <Link to={'/locations'} class="nav-link active">Location</Link>
                        </li>
                        <li class="nav-item me-5">
                            <Link to={'/contact'} class="nav-link active">contacts</Link>
                        </li>
                    </ul>
                </div>
                    {!isLoggedin() && (
                        <>
                            <Link to="/accounts/login">
                                <button className="btn btn-success me-3">Log In</button>
                            </Link>
                            <Link to="/accounts/signup">
                                <button className="btn btn-primary">Sign Up</button>
                            </Link>
                        </>
                    )}
                    {isLoggedin() && (
                        <div className="dropdown">
                            <a href="" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={defaultProfilePic} alt="User" width="32" height="32" className="rounded-circle me-2" style={{border:'solid black 1px'}} />
                                <strong>{user}</strong>
                            </a>
                        <ul className="dropdown-menu dropdown-menu-end text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a className="dropdown-item" href="" onClick={logout}>Log Out</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
        </div>
    </>
  )
}

export default Navbar