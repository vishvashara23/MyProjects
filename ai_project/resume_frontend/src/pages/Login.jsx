import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
    // Unified state for form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Generic handler for all input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    // Handler for traditional email/password form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log("Attempting to log in with:", formData);

        try {
            // NOTE: The original code used axios.get, but login should be a POST request.
            // Changed to axios.post for correctness.
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);

            console.log("Server Response:", response.data); // Log success response

            if (response.data && response.data.token) {
                // Store token and user info in localStorage for session persistence
                localStorage.setItem('token', response.data.token);
                
                // Navigate to a protected page, e.g., a dashboard
                navigate('/generate-resume'); 
            } else {
                setError(response.data.message || 'Login failed. An unknown response was received from the server.');
            }
        } catch (err) {
            console.error("Login Error:", err); // Log the full error object

            if (err.response) {
                // The server responded with an error
                console.error("Error data:", err.response.data);
                setError(err.response.data.message || 'Invalid email or password.');
            } else if (err.request) {
                // The request was made but no response was received
                setError('Could not connect to the server. Please check your network connection.');
            } else {
                // Something else happened
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handler for "Login with Google" button click
    const handleGoogleLogin =async (credentialResponse) => {
        // This redirects the user to the Spring Security Google login endpoint
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
         try {
    //   const res = await axios.post('http://localhost:8080/api/auth/oauth2/google', {
    //     token: credentialResponse.credential,
    //   });

      if (res.data.token) {
        // Store the token from the backend
        localStorage.setItem("token", res.data.token);
        // Navigate to a protected route
        navigate("/about");
      } else {
        setError("Google login failed.");
      }
    } catch (err) {
      console.error('Login error', err);
      setError("An error occurred during Google login.");
    }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
                <div className="text-center">
                    <FiLogIn className="w-12 h-12 mx-auto text-indigo-600" />
                    <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to access your account
                    </p>
                </div>

                {error && (
                    <div className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-lg" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <FiMail className="absolute w-5 h-5 text-gray-400 top-3.5 left-3" />
                        <input
                            type="email"
                            name="email" // 'name' attribute is crucial for handleChange
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Email address"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FiLock className="absolute w-5 h-5 text-gray-400 top-3.5 left-3" />
                        <input
                            type="password"
                            name="password" // 'name' attribute is crucial for handleChange
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>

                    <div className="relative flex items-center justify-center">
                        <div className="w-full border-t border-gray-300" />
                        <span className="absolute px-2 text-sm text-gray-500 bg-white">Or continue with</span>
                    </div>

                    <button
                        type="button" // This prevents the button from submitting the form
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center w-full px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <FcGoogle className="w-6 h-6 mr-3" />
                        Continue with Google
                    </button>
                </form>
                <p className="mt-6 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;