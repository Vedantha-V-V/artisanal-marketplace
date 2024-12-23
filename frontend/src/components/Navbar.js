import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useMemo} from 'react'
import {logout} from '../utils/localstorage'
import {setInitialState} from '../redux/actions/userAction'

const Navbar = ({click}) => {
  const cart = useSelector(state => state.cart)
  const history = useHistory()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  // console.log({user})

  const {cartItems} = cart

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }

  const _handleLogout = () => {
    // console.log('click')
    dispatch(setInitialState())
    logout()
    history.push('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="Art To Cart.png" alt="Website Logo" className="logo" />
        <h2>Art To Cart</h2>
      </div>
      <div>
        <ul className="navbar__links">
        <li>
          <Link to="/" className="navbar__token">Home</Link>
        </li>

        <li>
          <Link to="/about" className="navbar__token">
          About
          </Link>
        </li>

        <li>
          <Link to="/contact" className="navbar__token">
          Contact
          </Link>
        </li>
        </ul>
      </div>
      <ul className="navbar__links">
        {!user.userInfo.isLogin ? (
          <li>
            <Link to="/signin" className="navbar__token">Login</Link>
          </li>
        ) : (
          <li>
            <p onClick={_handleLogout}>Logout</p>
          </li>
        )}

        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  )
}

export default Navbar
