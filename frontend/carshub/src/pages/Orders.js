import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = localStorage.getItem('username');

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:5000/showOrders', {
          params: { user },
        });
        setOrders(response.data.ordersWithCarDetails); // Adjust according to your response structure
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    })();
  }, [user]);

  const handleClose = (orderId) => {
    // You can handle the logic for closing/removing an order here
    console.log(`Close order: ${orderId}`);
    // Example: Call a delete API or remove from state
    setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>Your Orders</h1>
        <div className="row">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div className="col-md-12 mb-4" key={order._id}>
                <div className="card d-flex flex-row">
                  <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0 p-2"
                    aria-label="Close"
                    onClick={() => handleClose(order._id)}
                  ></button>
                  <div className="col-md-5 p-0">
                    <img
                      src={order.carDetails?.img} // Assuming the car image URL is in the carDetails object
                      alt={order.carDetails?.carname}
                      style={{
                        width: '614px', 
                        objectFit: 'cover', // Maintain aspect ratio and cover the container
                      }} 
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body" style={{marginLeft:'80px'}}>
                      <h5 className="card-trditle">Order ID: {order._id}</h5>
                      {order.carDetails && (
                        <>
                          <h6 className="card-subtitle text-muted">
                            Car: {order.carDetails.carname}
                          </h6>
                          <p className="card-text">
                            Brand: {order.carDetails.carbrand}
                          </p>
                          <p className="card-text">
                            Price: {order.carDetails.price} INR
                          </p>
                          <p className="card-text">Name: {order.name}</p>
                          <p className="card-text">Date: {order.date}</p>
                          <p className="card-text">Email: {order.email}</p>
                          <p className="card-text">Phone: {order.phone}</p>
                          <p className="card-text">City: {order.city}</p>
                          <p className="card-text">Code: {order.code}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{marginTop: '150px',marginBottom: '390px'}}>
              <center>
                <p style={{color:'gray',fontSize:'20px'}}>Haven't ordered any car yet.</p>
              </center>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
