import { useState } from "react";
import MapCountry from "../map/MapCountry";

export default function CardWorld() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div style={{ borderRadius: "12px", border: "1px solid #e5e7eb", background: "#ffffff", padding: "20px", borderColor: "#e5e7eb", backgroundColor: "#ffffff", color: "#e5e7eb", backgroundImage: "none", boxShadow: "none", darkBorderColor: "#404040", darkBackgroundColor: "rgba(255, 255, 255, 0.03)" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1f2937" }}>Customers Demographic</h3>
          <p style={{ marginTop: "4px", fontSize: "12px", color: "#6b7280" }}>Number of customer based on country</p>
        </div>
        <div style={{ position: "relative", display: "inline-block" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: "0" }} onClick={toggleDropdown}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="6" r="2" fill="currentColor" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <circle cx="12" cy="18" r="2" fill="currentColor" />
            </svg>
          </button>
          {isOpen && (
            <div style={{ position: "absolute", top: "100%", right: "0", width: "160px", padding: "8px", borderRadius: "8px", background: "#ffffff", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", zIndex: "10" }} onClick={closeDropdown}>
              <div style={{ padding: "8px", fontSize: "14px", color: "#6b7280", borderRadius: "4px", cursor: "pointer" }} onClick={closeDropdown}>View More</div>
              <div style={{ padding: "8px", fontSize: "14px", color: "#6b7280", borderRadius: "4px", cursor: "pointer" }} onClick={closeDropdown}>Delete</div>
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: "16px", marginTop: "24px", overflow: "hidden", border: "1px solid #e5e7eb", borderRadius: "12px" }}>
        <div id="mapOne" style={{ height: "212px", width: "252px", marginLeft: "-16px", marginTop: "-24px", marginRight: "-16px", marginBottom: "-24px" }}>
          <div style={{ height: "100%", width: "100%", background: "#e5e7eb", borderRadius: "8px" }}>Map Placeholder</div>
        </div>
      </div>
      <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden" }}>
              <img src="./images/country/country-01.svg" alt="usa" style={{ width: "100%", height: "100%" }} />
            </div>
            <div>
              <p style={{ fontWeight: "600", fontSize: "14px", color: "#1f2937" }}>USA</p>
              <span style={{ display: "block", fontSize: "12px", color: "#6b7280" }}>2,379 Customers</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", maxWidth: "140px" }}>
            <div style={{ position: "relative", width: "100px", height: "8px", background: "#e5e7eb", borderRadius: "4px" }}>
              <div style={{ position: "absolute", top: "0", left: "0", height: "100%", width: "79%", background: "#4f46e5", borderRadius: "4px" }}></div>
            </div>
            <p style={{ fontWeight: "500", fontSize: "14px", color: "#1f2937" }}>79%</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden" }}>
              <img src="./images/country/country-02.svg" alt="france" style={{ width: "100%", height: "100%" }} />
            </div>
            <div>
              <p style={{ fontWeight: "600", fontSize: "14px", color: "#1f2937" }}>France</p>
              <span style={{ display: "block", fontSize: "12px", color: "#6b7280" }}>589 Customers</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", maxWidth: "140px" }}>
            <div style={{ position: "relative", width: "100px", height: "8px", background: "#e5e7eb", borderRadius: "4px" }}>
              <div style={{ position: "absolute", top: "0", left: "0", height: "100%", width: "23%", background: "#4f46e5", borderRadius: "4px" }}></div>
            </div>
            <p style={{ fontWeight: "500", fontSize: "14px", color: "#1f2937" }}>23%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
