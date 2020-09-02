import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// DATA
// import data from './data';

import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './Screens/RegisterScreen';

function App() {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
        <header className="header">

            <div className="brand">
                <button onClick={openMenu}>☰</button>
                <Link to="/">LOGO</Link>
            </div>

            <div className="header-links">
                <a href="cart.html">Cart</a>
                {
                  userInfo ? <Link to="/profile" >{userInfo.name}</Link> : <Link to="/signin">Sign in</Link>
                }  
            </div>

        </header>

        <aside className="sidebar">
            <h3 className="category-menu">Shopping Categories</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            <ul>
                <li className="product-category"><a href="index.html">Pants</a></li>
                <li className="product-category"><a href="index.html">Shirts</a></li>
            </ul>
        </aside>

        <main className="main">
            <div className="content">
                <Route path="/products" component={ProductScreen} />
                <Route path="/signin" component={SigninScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/" exact={true} component={HomeScreen} />
                
            </div>
        </main>

        <footer className="footer">All right reserved.</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
