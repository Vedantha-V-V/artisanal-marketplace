import './SideDrawer.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from '../redux/actions/userAction';
import { logout } from '../utils/localstorage';

const SideDrawer = ({ show, click }) => {
  const sideDrawerClass = ['sidedrawer'];
  const user = useSelector(state => state.user);
  const history = useHistory();

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  if (show) {
    sideDrawerClass.push('show');
  }
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

  return (
    <div className={sideDrawerClass.join(' ')}>
      <ul className="sidedrawer__links" onClick={click}>
        <li>
          <div className="cart__link" onClick={handleCartClick}>
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart{' '}
              <span className="sidedrawer__cartbadge">{getCartCount()}</span>
            </span>
          </div>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
        {!user.userInfo.isLogin ? (
          <li>
            <Link to="/signin">Login</Link>
          </li>
        ) : (
          <li>
            <p onClick={_handleLogout}>Logout</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideDrawer;
