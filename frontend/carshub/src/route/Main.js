import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Purchase from '../pages/Purchase';
import Contacts from '../pages/Contacts';
import NoPage from '../pages/NoPage';
import Orders from '../pages/Orders';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Details from '../pages/Details';
import Locations from '../pages/Locations'

const Main = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/book/" element={<Purchase />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/locations' element={<Locations />} />
            <Route path='/contact' element={<Contacts />} />
            <Route path='/accounts/login' element={<Login />} />
            <Route path='/accounts/signup' element={<Signup />} />
            <Route path='/book/cardetails/:carId' element={<Details />}/>
            <Route path="*" element={<NoPage />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default Main