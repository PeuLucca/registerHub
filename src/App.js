// Core
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Screens
import Login from './screens/Login';
import Register from './screens/Register';
import SignUp from './screens/SignUp';
import List from './screens/List';

// Components
import TopBar from './components/TopBar';

// Style
import 'bootstrap/dist/css/bootstrap.min.css';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./firebase";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
        localStorage.setItem("userId", user.uid);
      } else {
        setIsLogged(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              isLogged
              ? (
                <>
                  <TopBar />
                  <Register />
                </>
              )
              : <Login />
            }
          />
          <Route path="/novo-usuario" element={<SignUp />} />
          <Route
            path="/cadastro"
            element={
              isLogged
              ? (
                <>
                  <TopBar />
                  <Register />
                </>
              ) : <Login />
            }
          />
          <Route
            path="/lista"
            element={
              isLogged
              ? (
                <>
                  <TopBar />
                  <List />
                </>
              ) : <Login />
            }
          />
          <Route
            path="*"
            element={
              <h3
                style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}
              >
                Página não encontrada!
              </h3>
            }
          />
        </Routes>
    </Router>
  );
};

export default App;
