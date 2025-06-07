import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
  return (
    <>
        <div className="container-fluid">
        <footer className="text-center text-lg-start text-dark bg-light" >
          <section>
            <div className="container text-center text-md-start mt-3 pt-2">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Social Media</h6>
                  <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <div className='text-black'>
                    <a href="" className="text-dark me-3">
                    <i className="fab fa-facebook-f"></i> {/* Facebook Icon */}
                    </a> 
                    <a href="" className="text-dark me-3">
                    <i className="fab fa-twitter"></i> {/* Twitter Icon */}
                    </a>
                    <a href="" className="text-dark me-3">
                    <i className="fab fa-google"></i> {/* Google Icon */}
                    </a>
                    <a href="" className="text-dark me-3">
                    <i className="fab fa-instagram"></i> {/* Instagram Icon */}
                    </a>
                    <a href="" className="text-dark me-3">
                    <i className="fab fa-linkedin"></i> {/* LinkedIn Icon */}
                    </a>
                    <a href="" className="text-dark me-3">
                    <i className="fab fa-github"></i> {/* GitHub Icon */}
                    </a>
              </div>
                </div>

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Cars</h6>
                  <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <p>
                    <a href="#!" className="text-dark">Honda</a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">Hyundai</a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">Toyota</a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">Maruti Suzuki</a>
                  </p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Useful links</h6>
                  <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <p>
                    <a href="#!" className="text-dark">Home</a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">Book a Car</a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">Orders</a>
                  </p>
                </div>

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <p><i className="fas fa-home mr-3"></i> Bhavnagar, Gujrat ,India</p>
                  <p><i className="fas fa-envelope mr-3"></i> rudra@gmail.com</p>
                  <p><i className="fas fa-phone mr-3"></i> + 91 9484571820</p>
                  <p><i className="fas fa-print mr-3"></i> + 91 1234567890</p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center p-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
            © Copyright : 
            <a className="text-dark" href=""> Rudra Mehta</a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Footer