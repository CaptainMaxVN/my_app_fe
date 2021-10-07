import './App.css';
import React from 'react';
import LoginForm from './components/login.form';
import Home from './components/home';
import { UserContext, EmptyUser, CachedUser } from './context/UserContext';

function App() {
  const [user, setUser] = React.useState(CachedUser);

  const updateUser = object => {
    const { username, accessToken } = object;
    if (accessToken){
      localStorage.setItem('user', JSON.stringify({ username, accessToken }));
    }
    setUser(object);
  }

  const UserValue = { user, updateUser };

  return (
    <div className="App">
      <UserContext.Provider value={UserValue}>
        {
          user.accessToken ? <Home/> : <LoginForm />
        }
      </UserContext.Provider>
    </div>
  );
}

export default App;
