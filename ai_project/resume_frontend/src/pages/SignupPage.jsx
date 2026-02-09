import React, { useState } from 'react';
import axios from 'axios';
// Importing icons from the 'react-icons/fi' (Feather Icons) library
import { FiMail, FiLock, FiUserPlus, FiArrowRight, FiLoader, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const SignupPage = () => {
    // State management for form data, messages, and loading status
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset states on new submission
        setIsError(false);
        setMessage('');

        // --- Client-side Validation ---
        if (password !== confirmPassword) {
            setIsError(true);
            setMessage('Passwords do not match!');
            return;
        }
        if (password.length < 8) {
            setIsError(true);
            setMessage('Password must be at least 8 characters long.');
            return;
        }
        
        setLoading(true);

        // --- API Call ---
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', {
                email,
                password,
                confirmPassword
            });

            setIsError(false);
            setMessage(`Account created for ${response.data.email}!`);
            // Clear form fields on success
            setEmail('');
            setPassword('');
            setConfirmPassword('');

        } catch (error) {
            setIsError(true);
            if (error.response) {
                setMessage(error.response.data.message || 'An error occurred during sign-up.');
            } else if (error.request) {
                setMessage('No response from server. Please check your connection.');
            } else {
                setMessage('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        // Main container with a subtle gradient background
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
                {/* Header Section */}
                <div className="text-center">
                    <FiUserPlus className="w-12 h-12 mx-auto text-indigo-600" />
                    <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                        Create Your Account
                    </h2>
                   {/* Message Display Area */}
                {message && (
                    <div className={`flex items-center mt-4 p-4 text-sm rounded-lg ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {isError ? <FiAlertCircle className="w-5 h-5 mr-3"/> : <FiCheckCircle className="w-5 h-5 mr-3"/>}
                        <span>{message}</span>
                    </div>
                )}
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Email Input with Icon */}
                    <div className="relative">
                        <FiMail className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Email address"
                            required
                        />
                    </div>

                    {/* Password Input with Icon */}
                    <div className="relative">
                        <FiLock className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Password"
                            required
                        />
                    </div>
                    
                    {/* Confirm Password Input with Icon */}
                    <div className="relative">
                        <FiLock className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                    
                    {/* Submit Button with Icon and Loading State */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative flex justify-center w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                        >
                            {loading ? (
                                <FiLoader className="w-5 h-5 mr-2 animate-spin" />
                            ) : (
                                <>
                                   Create Account
                                    <FiArrowRight className="absolute w-5 h-5 right-4 top-3.5 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
                <p className="text-gray-600 text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-500 font-semibold">Login</a>
        </p>
            </div>
        </div>
    );
};

export default SignupPage;
