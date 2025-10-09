import React, { createContext, useContext, useEffect, useState } from "react";
import apiClient from "./AdminDashboard/Utils/ApiClient/apiClient";

const LogoContext = createContext();
export const useLogo = () => useContext(LogoContext);

const LogoFaviconManager = ({ children }) => {
  const [logo, setLogo] = useState("/images/All/Logo.png");
  const [favicon, setFavicon] = useState("/images/All/Logo.png");

  const getImageUrl = (url) => {
    if (!url) return "/images/All/Logo.png";
    const fixed = url.replace(/^\/uploads\//, "/public/").replace(/\\/g, "/");
    return `${apiClient.defaults.baseURL.replace(/\/$/, "")}${fixed}`;
  };

  const setFaviconTag = (url) => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      document.head.appendChild(link);
    }
    link.href = `${url}?v=${Date.now()}`;
  };

  const fetchLogo = async () => {
    try {
      const res = await apiClient.get("/logo");
      const data = res.data?.data || [];
      const logoData = data.find((x) => x.type === "logo");
      const faviconData = data.find((x) => x.type === "favicon");

      if (logoData?.url) {
        const logoUrl = getImageUrl(logoData.url);
        setLogo(logoUrl);
        console.log("✅ Logo URL:", logoUrl);
      }

      if (faviconData?.url) {
        const favUrl = getImageUrl(faviconData.url);
        setFavicon(favUrl);
        setFaviconTag(favUrl);
      } else {
        setFaviconTag("/images/All/Logo.png");
      }
    } catch (err) {
      console.log("Failed to fetch logo & favicon", err);
      setFaviconTag("/images/All/Logo.png");
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []); // ✅ hanya dipanggil sekali

  return (
    <LogoContext.Provider value={{ logo, favicon, refresh: fetchLogo }}>
      {children}
    </LogoContext.Provider>
  );
};

export default LogoFaviconManager;
