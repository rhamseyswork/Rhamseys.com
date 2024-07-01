//By: Rhamseys Garcia
//Date: 2024-03-29
/* @vite-ignore */
import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './App.css';

//Navr Bar
import NavBarData from './components/Nav Bar/Nav Bar Tabs.js';
import Components from './components/manifest.js';
import Pages from './Pages/mainifest.js';
import Spinner from 'react-bootstrap/Spinner';

//Product Screen
import ProductScreen from './components/Products/ProductScreen.jsx';

import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './components/Private Route/PrivateRoute.jsx';
import AdminRoute from './components/Admin Route/AdminRoute.jsx'
import Meta from './components/Meta/Meta.jsx';

const routes = NavBarData.getTabsRoutes(); // Get routes from NavBarData instance

function App() {
  const location = useLocation();
  const [tabClassName, setTabClassName] = useState('');
  const [metaTagName, setMetaTagName] = useState('');

  useEffect(() => {
    setTabClassName(location.pathname === '/' ? 'navBar-tab-active' : 'navBar-tab');
    const foundTab = NavBarData.tabs.path.slice(1).find(tab => {
      if (Array.isArray(tab)) {
        return tab.some(item => item.toLowerCase() === location.pathname.slice(1).toLowerCase());
      } else {
        return tab.toLowerCase() === location.pathname.slice(1).toLowerCase();
      }
    });
    const metaTagName = foundTab ? location.pathname.substring(1) : '';
    setTabClassName(location.pathname === '/' ? 'navBar-tab-active' : 'navBar-tab');
    setMetaTagName(metaTagName);//option to add Home
  }, [location.pathname, location]);
  
  const LazyLoadPage = React.memo(function LazyLoadPage({ tab }) {
    console.log(tab);
    const PageComponent = React.lazy(() => import(/* @vite-ignore */`./Pages/${tab}`).catch(() => ({ default: () => <Pages.Error404 /> })));
    return (
      <Suspense fallback={<Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}>
        <PageComponent className="w-full" />
      </Suspense>
    );
  });
  
  const tabs = routes.map(({ path, tab }) => {
      return (
        <Route
          key={tab}  // Use `tab` as the unique key for each route
          path={`.${path}`}
          element={
            <LazyLoadPage tab={tab}/>
          }
        />
      );
    });
    console.log(setTabClassName)
  return (
    <>
      {metaTagName ? <Meta title={`Rhamseys Portfolio | ${metaTagName}`} /> : <Meta/>}
      <Suspense fallback={<div>Nav bar Loading...</div>}>
        <Components.NavBar Path={NavBarData.getTabsRoutes().map(tab => tab.path)} Tabs={NavBarData.getTabsRoutes().map(tab => tab.tab)} setTabClassName={setTabClassName} tabs={tabs}>
        <Routes index={true}>
          {NavBarData.getTabsRoutes().map(route => (
            <Route
              key={route.tab}
              path={route.path}
              element={() => <LazyLoadPage tab={route.tab.slice(1)} />}
            />
          ))}
        </Routes>
        </Components.NavBar>
      </Suspense>
      <Suspense fallback={<div>Website Loading...</div>}>
        <Routes index={true}>
          {tabs}
          {/*<Route path='' element={<PrivateRoute />}>
            <Route path='/Shipping' element={<Pages.Shipping />} />
            <Route path='/Payment' element={<Pages.Payment />} />
            <Route path='/PlaceOrder' element={<Pages.PlaceOrder />} />
            <Route path='/Order/:id' element={<Pages.Order />} />
            <Route path='/Profile' element={<Pages.Profile />} /> 
          </Route>
          <Route path='' element={<AdminRoute />}>
            <Route path='/admin/orderlist' element={<Pages.admin.OrderList />} />
            <Route path='/admin/productlist' element={<Pages.admin.ProductList />} />
            <Route path='/admin/productlist/:pageNumber' element={<Pages.admin.ProductList />} />
            <Route path='/admin/product/:id/edit' element={<Pages.admin.ProductEdit />} />
            <Route path='/admin/userlist' element={<Pages.admin.UserList />} />
            <Route path='/admin/user/:id/edit' element={<Pages.admin.UserEdit />} />
          </Route>
          <Route path='/search/:keyword' element={<Pages.Merch />} />
          <Route path='/Merch/page/:pageNumber' element={<Pages.Merch />} />
          <Route path='/search/:keyword/page/:pageNumber' element={<Pages.Merch />} />
          <Route path='/Cart' element={<Pages.Cart />} />
          <Route path='/Login' element={<Pages.Login />} />
          <Route path='/Register' element={<Pages.Register />} />
          <Route path="*" element={<Pages.Error404 />} />
          <Route path="/merch/:id" element={<ProductScreen/>} />*/}
    </Routes>
    </Suspense>
    <Suspense fallback={<div>Loading Footer ...</div>}>
      <Components.Footer />
    </Suspense>
    <ToastContainer />
    </>
  );
}




export default App;
