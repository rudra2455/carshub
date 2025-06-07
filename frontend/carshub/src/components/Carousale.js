import React from 'react'
import i1 from '../images/i10.jpg'
import i2 from '../images/inova.jpg'
import i3 from '../images/ii.jpg'

const Carousale = () => {
  return (
    <>
        <center>
            <div id="carouselExampleDark" class="carousel carousel-dark slide w-50" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                    <img src={i1} class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                <h5></h5>
                <p></p>
            </div>
            </div>
            <div class="carousel-item" data-bs-interval="2000">
            <img src={i2} class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block">
                <h5></h5>
                <p></p>
            </div>
            </div>
            <div class="carousel-item">
            <img src={i3} class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block">
                <h5></h5>
                <p></p>
            </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
        </center>
    </>
  )
}

export default Carousale