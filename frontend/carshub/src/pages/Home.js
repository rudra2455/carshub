import React from 'react'
import Slider from "react-slick";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import i1 from '../images/11.jpg'
import i2 from '../images/4.jpg'
import i3 from '../images/qq.jpg'
import i4 from '../images/i.jpg'
import i5 from '../images/honda.jpg'
import i6 from '../images/ms.webp'
import i7 from '../images/toyota.jpg'
import i8 from '../images/m.png'
import i9 from '../images/t.jpg'
import i10 from '../images/tt.jpg'
import i11 from '../images/f.jpg'
import i12 from '../images/7.jpg'

const Home = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  return (
    <>
      <Navbar/>
        <div className='container'>
          <div class="d-flex">
            <div class="p-2 flex-fill w-50">
              <h3 style={{ marginTop:'90px',fontSize:'40px' }}>Welcome to our showroom.Buy your favourite <span style={{ color:'blue' }}>Car:)</span></h3>
              <br/>
              <p style={{fontSize:'20px',marginTop:'40px',marginLeft:'30px'}}>
                You can book your car from here with the best price.First select your favourite car and then click on book then your car will be book
                and you will get a code.show it to your respective nearby showroom and pay them.basically this website is only for dealership.you
                have to visit your nearby showroom..
              </p>
            </div>
            <div class="p-2 flex-fill w-50">
             <img src={ i1 } alt="img" class="rounded" />
            </div>
          </div>

        <center>
          <div class="d-flex">
              <div class="p-2 flex-fill w-50">
                <img src={ i2 } alt='img' style={{width:'200px',borderRadius:'100%'}}/>
                <h4>20+ cars are available in <br/>this portal.</h4>
              </div>
              <div class="p-2 flex-fill w-50">
                <img src={ i3 } alt='img' style={{width:'200px',borderRadius:'100%'}}/>
                <h4>Our services are available in <br/>30+ cities.</h4>
              </div>
              <div class="p-2 flex-fill w-50">
                <img src={ i4 } alt='img' style={{width:'200px',borderRadius:'100%'}}/>
                <h4>Get every posible information <br/>about cars</h4>
              </div>
            </div>
        </center>

          <br/>
          <br/>
          <h4 style={{fontSize:'30px'}}>available popular brands :</h4><br/>
          <center>
          <Slider {...settings}>
            <div>
            <img src={ i5 } alt='img' style={{width:'300px'}}/>
            </div>
            <div>
            <img src={ i6 } alt='img' style={{width:'300px'}}/>
            </div>
            <div>
            <img src={ i7 } alt='img' style={{width:'250px'}}/>
            </div>
            <div>
            <img src={ i8 } alt='img' style={{width:'300px'}}/>
            </div>
            <div>
            <img src={ i9 } alt='img' style={{width:'300px'}}/>
            </div>
            <div>
            <img src={ i10 } alt='img' style={{width:'300px'}}/>
            </div>
            <div>
            <img src={ i11 } alt='img' style={{width:'300px'}}/>
            </div>
            <div>
            <img src={ i12 } alt='img' style={{width:'280px'}}/>
            </div>
          </Slider>
          </center>
          <br/>
          </div>
      <Footer/>    
    </>
  )
}

export default Home