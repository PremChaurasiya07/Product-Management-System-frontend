
import React, { createContext, useState } from 'react';

export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, settoken] = useState('');
  const [user, setuser] = useState({});

  const login = (token, user) => {
    settoken(token);
    setuser(user)
  
    console.log(token)
    console.log(user)
    localStorage.setItem('token', token);
    localStorage.setItem('Id', user._id);
    localStorage.setItem('name', user.name);
  };

  const logout = () => {
   settoken('');
   setuser('')
    localStorage.removeItem('token');
    console.log('token removed')
  };

  return (
    <Authcontext.Provider value={{ token,user, login, logout }}>
      {children}
    </Authcontext.Provider>
  );
};
