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
      <div className="navbar__logo">
        <img src="Art To Cart.png" alt="Website Logo" className="logo" />
        <Link to="/" className="navbar__token"><h2>Art To Cart</h2></Link>
      </div>
      <div>
        <ul className="navbar__links">
          <li>
            <Link to="/" className="navbar__token">Home</Link>
          </li>
          <li>
            <Link to="/about" className="navbar__token">About</Link>
          </li>
          <li>
            <Link to="/categories" className="navbar__token">Categories</Link> {/* Add this line */}
          </li>
          <li>
            <Link to="/contact" className="navbar__token">Contact</Link>
          </li>
        </ul>
      </div>
      <ul className="navbar__links">
        <li>
          <div className="profile__icon" onClick={toggleProfile}>
            <i className="fas fa-user-circle"></i>
          </div>
          {showProfile && (
            <div className="profile__dropdown">
              {user.userInfo.isLogin ? (
                <>
                  <p>{user.userInfo.details.fullName}</p>
                  <p>{user.userInfo.details.email}</p>
                  <p onClick={_handleLogout} className="logout__link">Logout</p>
                </>
              ) : (
                <>
                  <p>Guest</p>
                  <p></p>
                  <Link to="/signin" className="login__link">Login</Link>
                </>
              )}
            </div>
          )}
        </li>
        <li>
          <div className="cart__link" onClick={handleCartClick}>
            <i className="fas fa-shopping-cart"></i>
            <span>Cart</span>
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
