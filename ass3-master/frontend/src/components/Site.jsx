import React from 'react';
import Register from '../pages/Register';
import Login from '../pages/Login';
import HostingListing from '../pages/HostingListing';
import BigButton from './BigButton';
import ListingEdit from '../pages/ListingEdit'
import Dashboard from '../pages/Dashboard'
import ViewListing from '../pages/ViewListing'
import ViewBookings from '../pages/ViewBookings'
import PropTypes from 'prop-types';

import {
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';

function Site (props) {
  const [token, setToken] = React.useState(null);
  const history = useHistory();
  const { pathname } = useLocation();
  // chuck in another file, put set func in dashboard and variable inside view
  React.useEffect(() => {
    const lsToken = localStorage.getItem('token');
    if (lsToken) {
      setToken(lsToken);
    }
  }, []);

  React.useEffect(() => {
    if (token !== null) {
      if (pathname === '/login' || pathname === '/register') {
        history.push('/dashboard');
      }
    }
  }, [token]);
  const logout = async () => {
    const response = await fetch('http://localhost:5005/user/auth/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await response.json();
    localStorage.removeItem('token');
    localStorage.removeItem('ownerEmail');
    setToken(null);
    window.location = '/dashboard'
  }

  return (
    <div>
      <nav>
        <ul>
          {!token && (
            <>
            <li>
                <Link to="/dashboard" id="LandingPageTestingNonToken">
                  <BigButton>Landing Page</BigButton>
                </Link><br /><br />
              </li>
              <li>
                <Link to="/login" id="loginTesting">
                <BigButton>Login</BigButton>
                </Link><br /><br />
              </li>
              <li>
                <Link to="/register" id="registerTesting">
                <BigButton>Register</BigButton>
                </Link><br />
              </li>
            </>
          )}
          {token && (
            <>
              <li>
                <Link to="/dashboard" id="LandingPageTestingToken">
                  <BigButton>Landing Page</BigButton>
                </Link><br /><br />
              </li>
              <li>
                <Link to="/listing/hostinglisting" id="HostedListingTesting">
                  <BigButton>Hosting Listings</BigButton>
                </Link><br />
              </li>
            </>
          )}
        </ul>
        <br />
        <BigButton id="darkModeMovieTime" onClick={ () => props.setDarkMode(!props.darkMode)}>Dark Mode</BigButton>
        <br />
        <br />
        {token && (
          <>
            <BigButton id="logoutBtnTest" onClick={logout}>Logout</BigButton>
          </>

        )}
      </nav>

      <Switch>
        <Route path="/dashboard">
          <Dashboard token={token}></Dashboard>
        </Route>
        <Route path="/login">
          <Login setTokenFn={setToken} />
        </Route>
        <Route path="/register">
          <Register setTokenFn={setToken} />
        </Route>
        <Route path="/listing/hostinglisting">
          <HostingListing token={token} />
        </Route>
        <Route path="/listing/edit/:id">
          <ListingEdit token={token} />
        </Route>
        <Route path="/listing/viewlisting/:id">
          <ViewListing token={token} />
        </Route>
        <Route path="/listing/viewbookings/:id">
          <ViewBookings token={token} />
        </Route>
        <Route path="/">
          <b>Welcome</b>
        </Route>
      </Switch>
      <Redirect to="/dashboard"/>
    </div>
  );
}

export default Site;

Site.propTypes = {
  setDarkMode: PropTypes.func,
  darkMode: PropTypes.bool
};
