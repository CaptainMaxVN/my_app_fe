import './App.css';
import React from 'react';
import LoginForm from './components/login.form';
import ProvideAuth from './components/ProvideAuth';
import RegisterForm from './components/register.form';
import Logout from './components/logout';
import Home from './components/home';
import Todo from './components/todoComponents/todo';
import NavBar from './components/navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
require('dotenv').config();

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ProvideAuth>
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
              <Route path="/todo">
                <Todo />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </ProvideAuth>
      </QueryClientProvider>
    </div>
  );
}

export default App;
