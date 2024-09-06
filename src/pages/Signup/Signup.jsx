// src/pages/Signup.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {

    const { login } = useAuth();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        const userData = { email, name: 'New User' }; // Mock user data, replace with real API
        login(userData);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">

                {/* Left Container (Form Section) */}
                <div className="w-full lg:w-1/2 p-8 bg-white">
                    <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Create Account</h2>

                    <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-96">
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-700">
                        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                    </p>
                </div>

                {/* Right Container (Image Section) */}
                <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random')" }}>
                </div>
            </div>
        </div>
    );
};

export default Signup;
