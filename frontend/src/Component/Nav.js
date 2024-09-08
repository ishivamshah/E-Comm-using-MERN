import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.png'

const Nav = () => {
    const auth = localStorage.getItem("user")
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.clear()
        navigate('/signUp')
    }

    return (
        <div>
            <img src={logo} alt='logo' className='logo' />
            {auth ?
                <ul className='nav-link'>
                    <li><Link to="/">Product</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update">Update Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={logOut} to="/signUp">Logout ({JSON.parse(auth).name})</Link></li>
                </ul> :
                <ul className='nav-link nav-right'>
                    <li><Link to="/signUp">Sign Up</Link></li>
                    <li><Link to="/logIn">LogIn</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;