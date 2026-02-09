// import React, { createContext, useState, useEffect, useContext } from 'react';

// // 1. Create the context
// const AuthContext = createContext(null);

// // 2. Create the Provider component
// export function AuthProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // This function checks localStorage and updates the state.
//   // It can be called on load, and also when storage changes.
//   const checkAuthStatus = () => {
//     const token = localStorage.getItem("token");
//     const googleUser = localStorage.getItem("googleUser");
//     setIsLoggedIn(!!token || !!googleUser);
//   };

//   useEffect(() => {
//     // Check the auth status when the component mounts
//     checkAuthStatus();

//     // Add an event listener to check status when storage changes (e.g., in another tab)
//     window.addEventListener('storage', checkAuthStatus);

//     // Cleanup the event listener when the component unmounts
//     return () => {
//       window.removeEventListener('storage', checkAuthStatus);
//     };
//   }, []);

//   // The value provided to consuming components
//   const value = { isLoggedIn, checkAuthStatus };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // 3. Create a custom hook for easy access to the context
// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === null) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }