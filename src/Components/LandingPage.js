// src/components/LandingPage.js
import React from 'react';

import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="landing-page" style={{ paddingTop: "80px", fontFamily: "'Roboto', sans-serif", color: "#333" }}>
      <header className="header" style={{ paddingTop: "3px", position: "relative", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            position: "fixed",
            top: "0px",
            right: "0px",
            zIndex: 1000,
            padding: "10px",
            width: "100%",
            backgroundColor: "white", // optional for better visibility
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "150px",
              margin: 8,
              padding: "10px 20px",
              border: "none",
              borderRadius: "20px",
              fontSize: "16px",
              fontWeight: "700", // Bold
              color: "#fff",
              background: "linear-gradient(135deg, #6e8efb, #a777e3)",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </button>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "150px",
              margin: 8,
              padding: "10px 20px",
              border: "none",
              borderRadius: "20px",
              fontSize: "16px",
              fontWeight: "700", // Bold
              color: "#fff",
              background: "linear-gradient(135deg, #6e8efb, #a777e3)",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
            }}
            onClick={() => navigate('/register')}
          >
            Register
          </button>

        </div>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '36px', marginBottom: '10px' }}>Welcome to Fashionista Mall</h1>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>Your ultimate shopping destination for trendy clothing and accessories!</p>
        <img src="https://img.freepik.com/premium-photo/luxury-shopping-mall-department-clothing-store-interior_652667-376.jpg?w=826" style={{ height: "400px", padding: "0 50px" }} alt="Fashionista Mall Interior"></img>
      </header>

      {/* Section for Featured Categories */}
      <section className="categories">
        <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize:'28px' }}>Shop by Category</h2>
        <div className="category-list">
          <div className="category">
            <img src="https://th.bing.com/th/id/OIP.YCsxUYl9nbpZqrSn0qt8ywHaE8?w=305&h=204&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Men's Clothing" />
            <h3 style={{ fontFamily:"'Montserrat', sans-serif"}}>Men's Fashion</h3>
            <p>Explore the latest trends in men's wear.</p>
          </div>
          <div className="category">
            <img src="https://th.bing.com/th/id/OIP.Ub-wQHto9vAV0fKsfj5puAHaFu?rs=1&pid=ImgDetMain" alt="Women's Clothing" />
            <h3 style={{ fontFamily:"'Montserrat', sans-serif"}}>Women's Fashion</h3>
            <p>Discover the hottest styles for women.</p>
          </div>
          <div className="category">
            <img src="https://img.freepik.com/premium-photo/clothing-accessories-men-women-ready-travel-life-style_11304-1345.jpg" alt="Accessories" />
            <h3 style={{ fontFamily:"'Montserrat', sans-serif"}}>Accessories</h3>
            <p>Complete your look with trendy accessories.</p>
          </div>
        </div>
      </section>

      {/* Section for Promotions or Discounts */}
      <section className="promotions" style={{
        backgroundImage: 'url("https://ctoscredit.com.my/wp-content/uploads/2016/11/3.Article_festive-shopping-image_cover-min.png")', backgroundSize: '90%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}>
        <h2 style={{ fontFamily:"'Montserrat', sans-serif", fontSize:'28px' }}>Exclusive Offers</h2>
        <div className="promotion-list">
          <div className="promotion">
            <h3>Buy 1 Get 1 Free</h3>
            <p>On selected Men's and Women's clothing.</p>
          </div>
          <div className="promotion">
            <h3>Flat 50% Off</h3>
            <p>On accessories and footwear. Limited time only!</p>
          </div>
          <div className="promotion">
            <h3>Seasonal Sale</h3>
            <p>Shop the latest collection with up to 70% off.</p>
          </div>
        </div>
      </section>

      {/* Section for Customer Reviews */}
      <section className="reviews">
        <h2 style={{ fontFamily:"'Montserrat', sans-serif", fontSize:'28px' }}>What Our Customers Say</h2>
        <div className="review-list">
          <div className="review">
            <p>"I love the variety of clothes and the fast delivery!" - Jane D.</p>
          </div>
          <div className="review">
            <p>"Amazing quality and great customer service!" - John P.</p>
          </div>
          <div className="review">
            <p>"The best place to shop for my entire family!" - Lisa K.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 Fashionista Mall. All rights reserved.</p>
        <div className="footer-links">
          <a href="#categories">Categories</a>
          <a href="#offers">Offers</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;