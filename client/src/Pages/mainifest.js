import Error404 from './404.jsx';
//const Error404 = <div>404 - Page Not Found</div>
import Home from './Home/Home.jsx';
import About from './About/About.jsx';
import Resume from './About/Resume.jsx'
import Portfolio from './About/Portfolio.jsx'
import Blog from './Blog/Blog.jsx'
import Contact from './Contact.jsx'
import Profile from './Profile.jsx'
import Login from './Login.jsx'
import Terms from './Terms.jsx'
import Privacy from './Privacy.jsx'



//admin
import Portal from './admin/dashboard.jsx';
import Metrics from './admin/metrics.jsx';
import LinkTreeAdmin from './admin/linktree.jsx';
const admin = {
    Portal,
    Metrics,
    LinkTreeAdmin,
}


const manifest = {
    Error404,  
    Home, 
    About,
    Resume,
    Portfolio,
    Blog,
    Contact,
    Profile,
    Login,
    Terms,
    Privacy,
    admin
}


export default manifest;