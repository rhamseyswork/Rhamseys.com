import Error404 from './404.jsx';
//const Error404 = <div>404 - Page Not Found</div>
import Home from './Home/Home.jsx';
import About from './About/About.jsx';
import Resume from './About/Resume.jsx'
import Portfolio from './About/Portfolio.jsx'
import Blog from './Blog/Blog.jsx'
import Contact from './Contact.jsx'
import PlaceOrder from './Payment/PlaceOrder.jsx'
import Order from './Payment/Order.jsx'
import Profile from './Profile.jsx'



//admin
import OrderList from './admin/OrderList.jsx';
import ProductList from './admin/ProductList.jsx';
import ProductEdit from './admin/ProductEdit.jsx';
import UserList from './admin/UserList.jsx';
import UserEdit from './admin/UserEdit.jsx';
const admin = {
    OrderList,
    ProductList,
    ProductEdit,
    UserList,
    UserEdit
}


const manifest = {
    Error404,  
    Home, 
    About,
    Resume,
    Portfolio,
    Blog,
    Contact,
    PlaceOrder,
    Order,
    Profile,
    admin
}


export default manifest;