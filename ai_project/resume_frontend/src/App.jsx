import { StrictMode } from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // 
import About from "./pages/About";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/Login";
import GenerateResume from "./pages/GenerateResume";
import { Toaster } from "react-hot-toast";
import  Premium  from "./pages/premium";
import Navbarlogin from "./components/Navbarlogin";
const App = () => (
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="generate-resume" element={<GenerateResume />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<Login />} />
          <Route path="premium" element={<Premium />} />
          <Route path="navlogin" element={<Navbarlogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

export default App;
