import Link from 'next/link';
import React from 'react';

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">heroBanner.smallText</p>
        <h3>heroBanner.midText</h3>
        <h1>heroBanner.largeText1</h1>
        <img src="" alt="keyboards" className="hero-banner-image" />

        <div>
          <Link href="/product/ID">
            <button type="button">heroBanner.buttonText</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>heroBanner.desc</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
