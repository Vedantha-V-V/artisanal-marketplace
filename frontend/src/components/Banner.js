import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';
import BannerImg from './banner-2.jpg';

function Banner() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("latest-products");
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
};

  return (<>
    <div className="sales-timer">
        <span>Free Shipping Worldwide</span>
    </div>
    <section className="banner">
      <img src={BannerImg} alt="Banner" className="banner-image" />
      <div className="banner-content">
        <h1>Find Your Perfect Product</h1>
        <p>Explore our collection of amazing products</p>
        <button className="btn" onClick={scrollToProducts}>Shop Now!</button>
      </div>
    </section></>
  );
}

export default Banner;