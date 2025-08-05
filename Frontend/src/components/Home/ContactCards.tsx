import React from "react";

const ContactCards = () => {
  return (
    <div
      id="ContactUscards"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        width: "100%",
      }}
    >
      <div
        className="card"
        style={{
          width: "90%",
          backgroundColor: "#e0f0ff",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <div
          className="icon"
          style={{ fontSize: "32px", color: "#007BFF" }}
        >
          ✈️
        </div>
        <div>
          <h4 style={{ margin: "0 0 5px 0" }}>Travel Inquiries</h4>
          <p className="info" style={{ margin: 0 }}>
            hello@vehigo.com
          </p>
          <p
            className="sub"
            style={{ margin: "5px 0 0 0", fontSize: "14px", color: "gray" }}
          >
            Response within 2 hours
          </p>
        </div>
      </div>

      <div
        className="card"
        style={{
          width: "90%",
          backgroundColor: "#e6ffe6",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <div
          className="icon"
          style={{ fontSize: "32px", color: "#28a745" }}
        >
          🌍
        </div>
        <div>
          <h4 style={{ margin: "0 0 5px 0" }}>24/7 Support</h4>
          <p className="info" style={{ margin: 0 }}>
            1800-100-100
          </p>
          <p
            className="sub"
            style={{ margin: "5px 0 0 0", fontSize: "14px", color: "gray" }}
          >
            Emergency assistance
          </p>
        </div>
      </div>

      <div
        className="card"
        style={{
          width: "90%",
          backgroundColor: "#f3e6ff",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <div
          className="icon"
          style={{ fontSize: "32px", color: "#6f42c1" }}
        >
          📍
        </div>
        <div>
          <h4 style={{ margin: "0 0 5px 0" }}>Visit Our Office</h4>
          <p className="info" style={{ margin: 0 }}>
            Xyz, New Delhi
          </p>
          <p
            className="sub"
            style={{ margin: "5px 0 0 0", fontSize: "14px", color: "gray" }}
          >
            Mon-Sat: 9:00AM-6:00PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
