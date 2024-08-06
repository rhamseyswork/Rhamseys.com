import React, { Suspense, useEffect} from 'react';
import { Route, Link } from 'react-router-dom';
import Components from './components/manifest.js';
import Pages from './Pages/mainifest.js';

const NavBarData = Components.NavBarData;
const NavBar = Components.NavBar;


const LazyLoadPage = React.memo(function LazyLoadPage({ tab }) {
  const PageComponent = React.lazy(() =>
    import(/* @vite-ignore */ `./Pages/${tab}`).catch(() => ({
      default: () => <Pages.Error404 />,
    })),
  )
  return (
    <Suspense fallback={<div>Ryan Mitch MP3 Loading...</div>}>
      <PageComponent className="w-full" />
    </Suspense>
  )
})

const tabs = NavBarData.tabs.map((tab) => {
  if (Array.isArray(tab)) {
    const dropdownItems = tab.slice(1)
    return dropdownItems.map((dropdownTab) => (
      <>
        <Route
          key={dropdownTab}
          path={dropdownTab}
          element={<LazyLoadPage tab={`${tab[0]}/${dropdownTab}`} />}
        />
      </>
    ))
  } else {
    return <Route key={tab} path={tab} element={<LazyLoadPage tab={tab} />} />
  }
})

export default function App() {
  return (
    <NavBar Tabs={NavBarData.tabs} setTabClassName={setTabClassName} tabs={tabs} >
        <Link to='/' className={tabClassName}>{NavBarData.title}</Link>
    </NavBar>
  )
}

const LogoutPage = ({ onLogout }) => {
  useEffect(() => {
    onLogout()
  }, [onLogout])

  return <div>Logging out...</div>
}

export { LogoutPage };
