// src/routes/routes.js
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Main from '../pages/Main/Main';

const Login = lazy(() => import('../pages/Login/Login'));
const Signup = lazy(() => import('../pages/Signup/Signup'));


const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} /> */}
                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

                    {/* private routes */}
                    <Route path="/dashboard" element={<PrivateRoute><Main /></PrivateRoute>} />

                </Routes>
            </BrowserRouter>
        </Suspense>

    );
};

export default AppRoutes;
