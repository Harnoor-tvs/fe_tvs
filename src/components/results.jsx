import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
 
const brandLinks = {
  "apache rr 310": "https://www.tvsmotor.com/tvs-apache/super-premium/rr-310",
  "apache rtr 310": "https://www.tvsmotor.com/tvs-apache/apache-rtr-310",
  "apache 200": "https://www.tvsmotor.com/tvs-apache/premium/apache-rtr-200-4v",
  "apache 180": "https://www.tvsmotor.com/tvs-apache/apache-rtr-180",
  "apache 160 4v": "https://www.tvsmotor.com/tvs-apache/apache-rtr-160-4v",
  "apache 160 2v": "https://www.tvsmotor.com/tvs-apache/apache-rtr-160-2v",
  "apache 150": "https://www.tvsmotor.com/tvs-apache",
  "apache": "https://www.tvsmotor.com/tvs-apache",
  "apache rtr": "https://www.tvsmotor.com/tvs-apache",
  "raider": "https://www.tvsmotor.com/tvs-raider",
  "ronin": "https://www.tvsmotor.com/tvs-ronin",
  "xl 100": "https://www.tvsmotor.com/tvs-xl100",
  "xl super": "https://www.tvsmotor.com/tvs-xl100",
  "zest": "https://www.tvsmotor.com/tvs-zest",
  "ntorq": "https://www.tvsmotor.com/tvs-ntorq",
  "jupiter 125": "https://www.tvsmotor.com/tvs-jupiter-125/smartxonnect",
  "jupiter": "https://www.tvsmotor.com/tvs-jupiter/jupiter-disc-smartxonnect",
  "iqube": "https://www.tvsmotor.com/electric-scooters/tvs-iqube",
  "tvs x": "https://www.tvsmotor.com/electric-scooters/tvs-x",
  "king ev max": "https://www.tvsmotor.com/three-wheelers/king-ev-max",
  "king": "https://www.tvsmotor.com/three-wheelers",
  "3w": "https://www.tvsmotor.com/three-wheelers",
  "sport": "https://www.tvsmotor.com/tvs-sport",
  "star city+": "https://www.tvsmotor.com/tvs-star-city-plus",
  "star city": "https://www.tvsmotor.com/tvs-star-city-plus",
  "radeon": "https://www.tvsmotor.com/tvs-radeon",
};
 
const getBrandLink = (modelName = "") => {
  const key = modelName.toLowerCase();
  const sortedKeys = Object.keys(brandLinks).sort((a, b) => b.length - a.length);
  for (const name of sortedKeys) {
    if (key.includes(name)) {
      return brandLinks[name];
    }
  }
  return null;
};
 
const getImageForResult = (item) => {
  const category = item.category?.toLowerCase() || "";
  const engine = item.engine_type?.toLowerCase() || "";
 
  if (engine === "ev" && category.includes("scooter")) return "/images/evscooter.webp";
  if (engine === "ev" && (category.includes("three wheeler") || category.includes("auto")))
    return "/images/evauto.webp";
  if (category.includes("scooter") || category.includes("bebek")) return "/images/scooter.webp";
  if (category.includes("motorcycle")) return "/images/bike.webp";
  if (category.includes("auto") || category.includes("three wheeler")) return "/images/auto.webp";
  if (category.includes("moped")) return "/images/xl.webp";
  return "/images/auto.webp";
};
 
function Results() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
 
  useEffect(() => {
    const fetchResults = async () => {
      const token = sessionStorage.getItem("token");
  console.log(" Token sent:", token);

  if (!token) {
    console.warn("No token available yet");
    return;
  }
      try {
        const response = await fetch("http://localhost:8080/search", {
          method: "POST",
          headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, },
          body: JSON.stringify({ query }),
        });
        const data = await response.json();
        

        setResults(data.results || []);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };
    if (query) fetchResults();
  }, [query]);
 
  const textStyle = { margin: "4px 0", fontSize: "14px", color: "#555" };
 
  return (
    <div
      style={{
        padding: "24px",
        minHeight: "calc(100vh - 80px)",
        backgroundColor: "#fafafa",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "900px", width: "100%" }}>
        <h2 style={{ marginBottom: "24px" }}>
          Results for "<strong>{query}</strong>"
        </h2>
 
        {results.length === 0 ? (
          <p>No results to display.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
           {results.map((item, index) => {
  const isVehicle = item._type === "vehicle";
  const isAccessory = item._type === "accessory";

  const link = isVehicle ? getBrandLink(item.model_name) : "#";

  const imageSrc = isVehicle
    ? getImageForResult(item)
    : item.image_urls?.[0] || "/images/default-accessory.webp";

  return (
    <a
      key={index}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        flexWrap: "wrap",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* 🔹 Left: Image */}
      <img
        src={imageSrc}
        alt="Result"
        style={{
          width: "220px",
          height: "180px",
          objectFit: "contain",
          padding: "12px",
          marginTop: "20px",
          backgroundColor: "#fff",
        }}
      />

      {/* 🔹 Right: Details */}
      <div style={{ padding: "16px", flex: 1, minWidth: "250px" }}>
        {isVehicle ? (
          <>
            <h4 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
              {item.model_name || "Unknown Model"}
            </h4>
            <p style={textStyle}><strong>Brand:</strong> {item.brand || "N/A"}</p>
            <p style={textStyle}><strong>Engine Type:</strong> {item.engine_type || "N/A"}</p>
            <p style={textStyle}><strong>Color:</strong> {item.color || "N/A"}</p>
            <p style={textStyle}><strong>Power:</strong> {item.power ? `${item.power} W` : "N/A"}</p>
            <p style={textStyle}><strong>Engine Capacity:</strong> {item.engine_capacity ? `${item.engine_capacity} cc` : "N/A"}</p>
            <p style={textStyle}><strong>Weight:</strong> {item.weight ? `${item.weight} kg` : "N/A"}</p>
            <p style={textStyle}><strong>Category:</strong> {item.category || "N/A"}</p>
            <p style={textStyle}><strong>Industry:</strong> {item.industry || "N/A"}</p>
            <p style={textStyle}><strong>Location:</strong> {item.name || "N/A"}</p>
            <p style={textStyle}><strong>Price:</strong> {item.price || "N/A"}</p>
          </>
        ) : isAccessory ? (
          <>
            <h4 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
              {item.title || "Unknown Accessory"}
            </h4>
            <p style={textStyle}><strong>Vendor:</strong> {item.vendor || "N/A"}</p>
            <p style={textStyle}><strong>Type:</strong> {item.type || "N/A"}</p>
            <p style={textStyle}><strong>Tags:</strong> {item.tags || "N/A"}</p>
            <p style={textStyle}><strong>Price:</strong> {item.variant_price || "N/A"}</p>
            <p style={textStyle}><strong>Weight (Grams):</strong> {item.variant_grams || "N/A"}</p>
            <p style={textStyle}><strong>Description:</strong> {item.body_html || "N/A"}</p>
          </>
        ) : (
          <p style={textStyle}>Unknown type of item.</p>
        )}
        <p style={textStyle}><strong>Score:</strong> {item._score ? item._score.toFixed(2) : "N/A"}</p>
      </div>
    </a>
  );
})}

          </div>
        )}
      </div>
    </div>
  );
}
 
export default Results;