import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';

const Locations = () => {
  const [citydata, setCitydata] = useState([]);

  // Fetch car data on component mount
  useEffect(() => {
    // Function to fetch data
    (async () => {
      try {
        const response = await axios.get('http://localhost:5000/cities');
        setCitydata(response.data);
        console.log(citydata)
      } catch (err) {
        console.log(err);
      }
    })();
  }, [citydata]); 
  return (
    <>
        <Navbar/>
        <div class="container mt-5">
          {citydata.length > 0 ? (
            citydata.map((value) => (
              <ul>
                <li style={{ fontSize:'20px' }}>
                  { value.city }
                </li>
              </ul>
          ))
          ) : (
            <div style={{marginTop: '150px',marginBottom: '390px'}}>
              <center>
                <p style={{color:'gray',fontSize:'20px'}}>Loading cities...</p>
              </center>
            </div>
          )}
        </div>
        <Footer/>
    </>
  )
}

export default Locations