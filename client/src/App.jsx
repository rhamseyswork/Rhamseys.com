//By: Rhamseys Garcia
//Date: 2024-03-29
/* @vite-ignore */
import React, { Suspense, useEffect, useState } from 'react'
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './App.css'

//Navr Bar
import Components from './components/manifest.js'
import Pages from './Pages/mainifest.js'
import PrivateRoute from './components/Private Route/PrivateRoute.jsx'
import AdminRoute from './components/Admin Route/AdminRoute.jsx'
import { ToastContainer } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import Meta from './components/Meta/Meta.jsx'
import NavBar from './components/Nav Bar/Nav Bar.jsx'

function App() {
  const location = useLocation()
  const [metaTagName, setMetaTagName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const metaTagName = location.pathname.substring(1)
    setMetaTagName(metaTagName) //option to add Home
  }, [location.pathname])

  return (
    <>
      {metaTagName ? (
        <Meta title={`Rhamseys Portfolio| ${metaTagName}`} />
      ) : (
        <Meta />
      )}
      <NavBar />
      <Suspense fallback={<div> Loading Portfolio Site...</div>}>
        <Routes index={true}>
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="" element={<Pages.Home />} />
          <Route path="/Blog" element={<Pages.Blog />} />
          <Route path="/Contact" element={<Pages.Contact />} />
          <Route path="/" element={<Pages.Home />} />
          <Route path="/About" element={<Pages.About />} />
          <Route path="/Resume" element={<Pages.Resume />} />
          <Route path="/Portfolio" element={<Pages.Portfolio />} />
          <Route path="/Blog" element={<Pages.Blog />} />
          <Route path="/Contact" element={<Pages.Contact />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/profile" element={<Pages.Profile />} />
          </Route>
          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<Pages.admin.Portal />} />
            <Route path="/admin/metrics" element={<Pages.admin.Metrics />} />
            <Route
              path="/admin/linktree"
              element={<Pages.admin.LinkTreeAdmin />}
            />
          </Route>
          <Route path="/login" element={<Pages.Login />} />
          <Route
            path="/logout"
            element={<LogoutPage onLogout={logoutHandler} />}
          />
          <Route path="/terms" element={<Pages.Terms />} />
          <Route path="/privacy" element={<Pages.Privacy />} />
          <Route path="*" element={<Pages.Error404 />} />
        </Routes>
      </Suspense>
      <Suspense fallback={<div>Loading Footer ...</div>}>
        {<Components.Footer />}
      </Suspense>
      <ToastContainer />
    </>
  )
}

export default App
