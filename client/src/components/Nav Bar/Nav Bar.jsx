import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import "./Nav Bar.css";
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import SearchBox from '../Search Box/SearchBox';
import PropTypes from 'prop-types';
import { resetCart } from '../../slices/cartSlice';
import Links from '../Links/Links';
import DealBanner from '../Deal Banner/DealBanner';

//npm install react-bootstrap-dropdown-menu
//npm install react-bootstrap-form
//npm install react-bootstrap-button

const NavBar = ({ Path, Tabs, children, setTabClassName }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (Tabs) {
      // Find the active tab based on the current location
      const foundTab = Tabs.tab.find(tab => {
        if (tab.includes('/')) {
          return tab.slice(1).includes(location.pathname.slice(1));
        } else {
          return tab.toLowerCase() === location.pathname.slice(1).toLowerCase();
        }
      });
      setActiveTab(foundTab);
    }
  }, [Tabs, location.pathname, setTabClassName]);

  const renderTabs = () => {
    return Tabs.map((tab, index) => {
      if (Path[index].slice(1).split('/').length > 1) {
        const dropdownTitle = Path[index].slice(1).split('/')[0];
        const dropdownItems = Path[index].slice(1).split('/')[1];
        return (
          <NavDropdown key={dropdownTitle} title={dropdownTitle} id={dropdownTitle}>
              <NavDropdown.Item 
              className={activeTab === tab ? 'navBar-tab-active' : ''}
              eventKey={dropdownTitle} key={dropdownTitle} as={Link} to={dropdownItems}>
                {dropdownItems}
              </NavDropdown.Item>
          </NavDropdown>
        );
      } else {
        return (
          <Nav.Link key={tab} as={Link} to={Path[index]} className={activeTab === tab ? 'navBar-tab-active' : 'navBar-tab'}>
            {tab}
          </Nav.Link>
        );
      }
    });
  };
  
  return (
    <header className='navBarSudo'>
      {(location.pathname == "/" || location.pathname == "/Merch") && <DealBanner />}
      <Navbar className='navBar' bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container className="navBar-1">
          <Navbar.Brand to="/">
            {children}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {renderTabs()}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Container className='navBar-2'>
          <Nav className='navBar-2i'>
            <SearchBox className="d-flex"/>
            <Link to="/cart" className="nav-link">
              <FaShoppingCart /> Cart
              {cartItems.length > 0 && (
              <Badge pill bg='success' style={{ marginLeft: '5px' }}>{cartItems.reduce((a, c) => a + c.qty, 0)}</Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <NavDropdown.Item as={Link} to='/profile' className="text-black">
                  Profile
                  </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login"><FaUser /> Sign In</Nav.Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <NavDropdown.Item as={Link} to='/admin/productlist'>Products</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to='/admin/userlist'>Users</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to='/admin/orderlist'>Orders</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
        <Container className='navBar-3 mt-2'>
          <Navbar.Collapse>
          {userInfo ? <Navbar.Text>Signed in as: <span style={{ color: 'orange' }}>{userInfo.name}</span></Navbar.Text> : <Navbar.Text><Link to="/login">Login</Link></Navbar.Text>}{/* Dev: add toggle login mutator */}
          </Navbar.Collapse>
        </Container>
        <Navbar.Collapse className='links-container'>
          <Links />
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};


NavBar.propTypes = {
  Tabs: PropTypes.array.isRequired,
  gap: PropTypes.string,
  display: PropTypes.string,
  flexDirection: PropTypes.string,
  listStyleType: PropTypes.string,
  textDecoration: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.string,
  hover: PropTypes.string,
  children: PropTypes.node.isRequired,
  setTabClassName: PropTypes.func.isRequired
};

export default NavBar;
