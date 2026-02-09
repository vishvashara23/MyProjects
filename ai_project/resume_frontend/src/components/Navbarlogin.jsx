import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth"; 

// Import your default profile picture as a fallback
import defaultProfilePic from "../image/photo-1534528741775-53994a69daeb.webp";

function Navbarlogin() {
  const { isLoggedIn } = useAuth();
  const [userName, setUserName] = useState("");
  // State to hold the profile picture URL, defaulting to the imported static image
  const [profilePicture, setProfilePicture] = useState(defaultProfilePic);

  useEffect(() => {
    // This effect runs when the isLoggedIn status changes.
    if (isLoggedIn) {
      // Create an async function to fetch user profile data from the backend.
      const fetchUserProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
          // Call the /api/auth/profile endpoint with the auth token.
          const response = await fetch("http://localhost:8080/api/auth/profile", {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            // Set the user's name from the response.
            setUserName(data.name || "User");
            // If the user has a picture URL in the database, use it.
            // Otherwise, the default static picture will be used.
            if (data.picture) {
              setProfilePicture(data.picture);
            }
          } else {
            // If the token is invalid or expired, the fetch will fail.
            console.error("Failed to fetch user profile. Status:", response.status);
          }
        } catch (error) {
          console.error("An error occurred while fetching the user profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, [isLoggedIn]); // Dependency array ensures this runs only when login state changes.

  const handleLogout = () => {
    // Clear the token from storage, which will set isLoggedIn to false.
    localStorage.removeItem("token");
    // Redirect to the home page to reflect the change.
    window.location.href = "/";
  };

  return (
    <div className="navbar shadow bg-base-100">
      {/* Navbar start and center sections remain unchanged */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to={"/about"}>About</Link></li>
            <li><Link to={"/services"}>Services</Link></li>
            <li><Link to={"/contact"}>Contact Us</Link></li>
            <li><Link to={"/premium"}>Premium</Link></li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">AI Resume Maker</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to={"/about"}>About</Link></li>
          <li><Link to={"/services"}>Services</Link></li>
          <li><Link to={"/contact"}>Contact Us</Link></li>
          <li><Link to={"/premium"}>Premium</Link></li>
        </ul>
      </div>

      <div className="navbar-end">
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {/* The 'src' now uses the state variable, which holds the URL from the DB or the default */}
                <img alt="User Profile" src={profilePicture} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a className="justify-between">{userName}</a></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        ) : (
          <a href="/Signup" className="btn">Login</a>
        )}
      </div>
    </div>
  );
}

export default Navbarlogin;