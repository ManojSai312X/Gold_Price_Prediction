import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaCoins,
  FaSearchDollar,
  FaGlobeAmericas,
} from "react-icons/fa";
// import 'index.css'; // Create this CSS file

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">
          <FaCoins /> Gold Price Prediction
        </h1>
        <p className="hero-subtitle">
          Leverage advanced machine learning to forecast gold prices with
          unprecedented accuracy
        </p>
        <div style={{ width: "100%" }}>
          <button
            className="cta-button"
            style={{
              padding: "10px 20px",
              color: "white",
              backgroundColor: "#4CAF50",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={() => navigate("/calc")} // Changed to navigate to /calc
          >
            <FaSearchDollar /> Try Predictor Now
          </button>
        </div>
      </section>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <FaChartLine />
          </div>
          <h3>Advanced Analytics</h3>
          <p>
            Our machine learning model processes dozens of indicators to deliver
            precise forecasts.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaGlobeAmericas />
          </div>
          <h3>Global Factors</h3>
          <p>
            Incorporates worldwide economic data for comprehensive analysis.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaCoins />
          </div>
          <h3>Daily Updates</h3>
          <p>Model is regularly updated with the latest market data.</p>
        </div>
      </div>

      <section className="content-section">
        <h2>How It Works</h2>
        <ol>
          <li>Enter current market data in our prediction form</li>
          <li>Our model processes the information in real-time</li>
          <li>Receive an accurate price forecast with confidence metrics</li>
          <li>Use the insights to inform your investment decisions</li>
        </ol>
      </section>
    </div>
  );
};

export default Home;
