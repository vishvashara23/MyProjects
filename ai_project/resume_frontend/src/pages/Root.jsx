import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Navbarlogin from "../components/Navbarlogin";

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const jwtToken = localStorage.getItem("token");
      const googleUser = localStorage.getItem("googleUser"); // store google info in localStorage after login

      setIsLoggedIn(!!jwtToken || !!googleUser);
    };

    checkAuthStatus();

    window.addEventListener("storage", checkAuthStatus);
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {isLoggedIn ? <Navbarlogin /> : <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
