import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            
        </div>
    );
};

export default MainLayout;