import {useEffect, useState} from "react";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial" }}>
      
      {/* HERO */}
      <section style={{
        padding: "100px 20px",
        textAlign: "center",
        background: "#111",
        color: "#fff"
      }}>
        <h1 style={{ fontSize: 48 }}>Sydeign Store</h1>
        <p style={{ opacity: 0.8 }}>Modern ecommerce built on Laravel + Hydrogen</p>

        <button style={{
          marginTop: 20,
          padding: "10px 20px"
        }}>
          Shop Now
        </button>
      </section>

      {/* CONTENT */}
      <section style={{ padding: 40 }}>
        <h2>Featured Products</h2>

        <div id="products">Loading...</div>
      </section>

    </div>
  );
}