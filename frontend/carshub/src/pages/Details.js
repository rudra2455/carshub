import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

// Get today's date in YYYY-MM-DD format
const d = new Date();
const today = d.toISOString().split('T')[0];

// Generate a random code
let code = Math.random() * (100000, 999999);
code = Math.floor(code);

const Details = () => {
  const { carId } = useParams('carId');
  const [cardata, setCardata] = useState([]);
  const [citydata, setCitydata] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhoneno] = useState('');
  const [city, setCity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [carData, setCarData] = useState({});

  // Payment fields
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  // Fetch car data
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:5000/cardata');
        setCardata(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // Fetch city data
  useEffect(() => {
    (async () => {
      try {
        const city = await axios.get('http://localhost:5000/cities');
        setCitydata(city.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // Booking handler
  const handleBooking = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !date || !email || !phone || !city) {
      toast.error('Please enter all fields');
      console.log('Booking Form Error:', { name, date, email, phone, city }); // Debugging info
      return;
    }

    // Set the selected car data for payment
    const selectedCar = cardata.find((car) => car._id === carId);
    setCarData(selectedCar);
    setShowModal(true); // Open payment modal
  };

  // Payment handler
  const handlePayment = async (e) => {
    e.preventDefault();

    // Check if all payment fields are filled
    if (!paymentMethod || !cardNumber || !cvv || !expiryDate) {
      toast.error('Please fill all payment details');
      console.log('Payment Form Error:', { paymentMethod, cardNumber, cvv, expiryDate }); // Debugging info
      return;
    }

    try {
      await axios.post('http://localhost:5000/bookOrder', {
        username,
        carId,
        name,
        date,
        email,
        phone,
        code,
        city,
        amount: carData.price,
        paymentMethod,
        cardNumber,
        cvv,
        expiryDate,
      });

      toast.success('Payment successful and car booked!');
      setShowModal(false);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <>
      <Navbar />
      {cardata.length > 0 ? (
        cardata
          .filter((value) => value._id === carId)
          .map((value) => (
            <div className="container" key={value._id}>
              <h1 className="mt-3" style={{ fontSize: '45px' }}><b>{value.carname}</b></h1>
              <center>
                <img src={value.img} alt={value.carname} style={{ width: '750px', borderRadius: '5%' }} />
              </center>
              <br />
              <h5 style={{ fontSize: '30px' }}>Brand is {value.carbrand}.</h5>
              <br />
              <p style={{ fontSize: '20px' }}>{value.description}</p>
              <br />
              <ul>
                <li style={{ fontSize: '18px' }}>Mileage: {value.mileage}</li><br />
                <li style={{ fontSize: '18px' }}>Average: {value.average}</li><br />
                <li style={{ fontSize: '18px' }}>Fuel: {value.fuel}</li><br />
                <li style={{ fontSize: '18px' }}>Model Year: {value.modelyear}</li><br />
              </ul>
              <h5 style={{ fontSize: '23px' }}><b><u>Price: {value.price} INRs.</u></b></h5>
              <br />
              <form method="post" onSubmit={handleBooking}>
                <div className="d-flex flex-column flex-md-row align-items-center">
                  <div className="me-3">
                    <label htmlFor="fullname" className="form-label">Full Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="p-1 form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="me-3">
                    <label htmlFor="date" className="form-label">Date <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className="p-1 form-control"
                      min={today}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className="me-3">
                    <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                    <input
                      type="email"
                      className="p-1 form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="me-3">
                    <label htmlFor="phone" className="form-label">Phone number <span className="text-danger">*</span></label>
                    <input
                      type="tel"
                      className="p-1 form-control"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhoneno(e.target.value)}
                    />
                  </div>

                  <div className="me-3">
                    <label htmlFor="city" className="form-label">City <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter your city"
                      className="p-1 form-control"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="d-flex mt-3 ms-6 p-2">
                  <button type="submit" className="btn btn-success">Book Now</button>
                </div>
              </form>

              {/* Payment Modal */}
              {showModal && (
                <>
                  <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Payment for {carData.carname}</h5>
                          <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                          <h4>Total amount to pay: {carData.price}</h4>
                          <form onSubmit={handlePayment}>
                            <div className="mb-3">
                              <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                              <select
                                name="paymentMethod"
                                className="form-select"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                              >
                                <option value="">Select payment method</option>
                                <option value="credit">Credit Card</option>
                                <option value="debit">Debit Card</option>
                              </select>
                            </div>

                            <div className="mb-3">
                              <label htmlFor="cardNumber" className="form-label">Card Number</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                              />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="cvv" className="form-label">CVV</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                              />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                              />
                            </div>

                            <button type="submit" className="btn btn-success">Pay Now</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-backdrop fade show"></div> {/* Backdrop */}
                </>
              )}
            </div>
          ))
      ) : (
        <div style={{marginTop: '150px',marginBottom: '390px'}}>
        <center>
          <p style={{color:'gray',fontSize:'20px'}}>No car data found.</p>
        </center>
      </div>
      )}

      <Footer />
    </>
  );
};

export default Details;