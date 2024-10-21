import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const DynamicHead: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    let title: string;
    let favicon: string;

    switch (true) {
      case location.pathname === "/voxeland":
        title = "Voxeland - Home";
        favicon = "/public/assets/img/voxeland/VOXELANDLOGO.png";
        break;
      case location.pathname === "/voxeland/gameinfo":
        title = "Voxeland - Game Info";
        favicon = "/public/assets/img/voxeland/VOXELANDLOGO.png";
        break;
      case location.pathname.startsWith("/voxeland/news"):
        title = "Voxeland - News";
        favicon = "/public/assets/img/voxeland/VOXELANDLOGO.png";
        break;
      case location.pathname === "/voxeland/support":
        title = "Voxeland - Support";
        favicon = "/public/assets/img/voxeland/VOXELANDLOGO.png";
        break;
      case location.pathname === "/":
        title = "Zeta Studios";
        favicon = "/public/assets/img/logoSmallZETASTUDIOS.svg";
        break;
      default:
        title = "NOT FOUND";
        favicon = "";
        break;
    }

    // Actualiza el título de la pestaña
    document.title = title;

    // Actualiza el favicon
    const link: HTMLLinkElement | null =
      document.querySelector("link[rel='icon']");
    if (link) {
      link.href = favicon;
    }
  }, [location]);

  return (
    <Helmet>
      <link rel="icon" href="/path/to/default-favicon.ico" />
    </Helmet>
  );
};

export default DynamicHead;
