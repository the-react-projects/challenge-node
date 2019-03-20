import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import SignOut from './Auth/SignOut';


const Navbar = ({session}) => (
  <nav>
    { session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth/> } 
  </nav>
);



const NavbarAuth = ({session}) => (
  <Fragment>
    <ul>
      <li><NavLink to='/' exact>Home</NavLink></li>
      <li><NavLink to='/kid/add'>Add Kid</NavLink></li>
      <li><NavLink to='/profile'>Profile</NavLink></li>
      <li><SignOut/></li>
    </ul>
    <h6>Welcome, <strong>{session.getCurrentUser.username}</strong>!</h6>
  </Fragment>
);

const NavbarUnAuth = () => (
  <ul>
    <li><NavLink to ="/" exact>Home</NavLink></li>
    <li><NavLink to = "/signin">SignIn</NavLink></li>
    <li><NavLink to = "/signup">SignUp</NavLink></li>
  </ul>
);

export default Navbar;