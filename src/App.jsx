
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Results from "./components/results";
import SearchBar from "./components/searchbar";

function App() {
  useEffect(() => {
    
   fetch("http://localhost:8000/get-token")
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem("token", data.token);
        console.log("Token stored in sessionStorage");
      })
      .catch((err) => {
        console.error("Failed to fetch token:", err);
      });
  }, []);
  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
           width: "100vw",
          minHeight: "100vh", 
        }}
      >
        {/* Sticky Header */}
        <header
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #ccc",
            position: "sticky",
            top: 0,
            zIndex: 999,
            rowGap: "12px",
          }}
        >
          
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              flex: 1,
              minWidth: "200px",
            }}
          >
            <img
              src="/TVSLogo.svg"
              alt="TVS Logo"
              style={{ height: "32px", marginRight: "12px" }}
            />
            <span style={{ cursor: "pointer", whiteSpace: "nowrap" }}>Products</span>
            <span style={{ cursor: "pointer", whiteSpace: "nowrap" }}>Services</span>
            <span style={{ cursor: "pointer", whiteSpace: "nowrap" }}>Shop</span>
            <span style={{ cursor: "pointer", whiteSpace: "nowrap" }}>Company</span>
          </div>

          
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              minWidth: "250px",
              padding: "0 8px",
            }}
          >
            <SearchBar />
          </div>

      
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              fontSize: "14px",
              color: "#003399",
              whiteSpace: "nowrap",
              alignItems: "center",
              justifyContent: "flex-end",
              flex: 1,
              minWidth: "200px",
            }}
          >
            <span style={{ cursor: "pointer" }}>Buy Vehicle</span>
            <span style={{ cursor: "pointer" }}>Test Ride</span>
            <span style={{ cursor: "pointer" }}>Dealers</span>
          </div>
        </header>

        
        <main
          style={{
            flex: 1, 
            overflow: "auto", 
            backgroundColor: "#f9f9f9",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
