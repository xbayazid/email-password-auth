import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Main.css';

const Main = () => {
    return (
        <div>
            <nav className='nav-link w-50 mx-auto mt-4'>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
            </nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;