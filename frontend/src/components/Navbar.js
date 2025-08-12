import './Navbar.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../utils/localstorage';
import { setInitialState } from '../redux/actions/userAction';
import { useState } from 'react';

const Navbar = ({ click }) => {
  const cart = useSelector(state => state.cart);
  const history = useHistory();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);

  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const _handleLogout = () => {
    dispatch(setInitialState());
    logout();
    history.push('/');
  };

  const handleCartClick = () => {
    if (!user.userInfo.isLogin) {
      alert("You need to login first to access the cart.");
      history.push("/signin");
    } else {
      history.push("/cart");
    }
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <nav className="navbar">
      <div className="navbar_logo">
        {/* <img src="Art To Cart.png" alt="Website Logo" className="logo" /> */}
        <Link to="/" className="navbar_token"><h2>Art To Cart</h2></Link>
      </div>
      <div>
        <ul className="navbar_links">
          <li>
            <Link to="/" className="navbar_token">Home</Link>
          </li>
          <li>
            <Link to="/about" className="navbar_token">About</Link>
          </li>
          <li>
            <Link to="/categories" className="navbar_token">Categories</Link>
          </li>
          <li>
            <Link to="/contact" className="navbar_token">Contact</Link>
          </li>
        </ul>
      </div>
      <ul className="navbar_links">
        <li>
          <div className="profile_icon" onClick={toggleProfile}>
            <img src="./profile.png" alt="profile" height="30px" width="30px"/>
          </div>
          {showProfile && (
            <div className="profile_dropdown">
              {user.userInfo.isLogin ? (
                <>
                  <p>{user.userInfo.details.fullName}</p>
                  <p>{user.userInfo.details.email}</p>
                  <p onClick={_handleLogout} className="logout_link">Logout</p>
                </>
              ) : (
                <button className="login_btn">
                  <p></p>
                  <Link to="/signin" className="login_link">Login</Link>
                </button>
              )}
            </div>
          )}
        </li>
        <li>
          <div className="cart_link" onClick={handleCartClick}>
            <i className="fas fa-shopping-cart"></i>
            {/* <span>Cart</span> */}
            <span className="cartlogo__badge">{getCartCount()}</span>
          </div>
        </li>
      </ul>
      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
