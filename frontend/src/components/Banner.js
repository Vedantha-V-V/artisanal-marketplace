import React, { useState, useEffect } from 'react';
import './Banner.css';
import BannerImg from './banner-2.jpg';

function Banner() {
  const calculateTimeLeft = () => {
    const difference = +new Date('2024-12-31T23:59:59') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const scrollToProducts = () => {
    const productsSection = document.getElementById("latest-products");
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
  };

  return (
    <>
      <div className="sales-timer">
        <span>
          Sale ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>
      <section className="banner">
        <img src={BannerImg} alt="Banner" className="banner-image" />
        <div className="banner-content">
          <h1>Find Your Perfect Product</h1>
          <p>Explore our collection of amazing products</p>
          <button className="btn" onClick={scrollToProducts}>Shop Now!</button>
        </div>
      </section>
    </>
  );
}

export default Banner;