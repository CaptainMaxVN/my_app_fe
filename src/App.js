import './App.css';
import React from 'react';
import LoginForm from './components/login.form';
import RegisterForm from './components/register.form';
import Logout from './components/logout';
import Home from './components/home';
import NavBar from './components/navbar';
import { UserContext, CachedUser } from './context/UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import axios from 'axios';


function App() {
  const [user, setUser] = React.useState(CachedUser());

  const updateUser = object => {
    const { username, accessToken } = object;
    if (accessToken) {
      localStorage.setItem('user', JSON.stringify({ username, accessToken }));
    }
    setUser(object);
  }

  const UserValue = { user, updateUser };

  axios.interceptors.request.use(req => {
    console.log(`${req.method} ${req.url}`);
    // You must return the request at the end
    return req;
  });

  return (
    <div className="App">
      <UserContext.Provider value={UserValue}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>

            <Route path="/register">
              <RegisterForm />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
