import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Purchase = () => {
  const [cardata, setCardata] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  // Fetch car data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cardata');
        setCardata(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []); // Only fetch once when the component mounts

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter cars based on search query
  const filteredCars = searchQuery === ''
    ? cardata // If search query is empty, show all cars
    : cardata.filter(car =>
        car.carname.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <>
      <Navbar/>
      <div className='container'>
        <div className='mt-3 mb-2'>
          <form onSubmit={e => e.preDefault()}>
            <div className="input-group">
              <input
                type="search"
                className="form-control rounded p-2"
                placeholder="Search for any car"
                name='s'
                value={searchQuery}
                onChange={handleSearchChange} // Update search query on input change
              />
            </div>
          </form>
        </div>
        <br/>
        
        <div class="row row-cols-1 row-cols-md-3 g-4">
        {filteredCars.length > 0 ? (
          filteredCars.map((value) => (
            <div class="col">
            <div class="card">
            <h3 class="card-title fw-bold mt-2 mb-1 ms-1 p-1">{value.carname}</h3>
            <img class="card-img-top" src={value.img} style={{width:'414px',border:'solid black 1px'}} alt={value.carname}/>
                <div class="card-body">
                    <p class="card-text">price : { value.price }</p>
                    <Link to={'/book/cardetails/' + value._id}>
                      <button className="btn btn-primary mb-2">Book</button>
                    </Link>
                </div>
            </div>
            <br/>
        </div>
          ))
        ) : (
          <div style={{marginTop: '150px',marginBottom: '390px'}}>
              <center>
                <p style={{color:'gray',fontSize:'20px'}}>No cars found.</p>
              </center>
          </div>
        )}
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default Purchase;