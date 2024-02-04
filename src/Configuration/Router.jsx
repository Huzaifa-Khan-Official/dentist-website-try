import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '../Pages/Login/Login.css';
import Home from '../Pages/Home';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Signup/Signup';
import { auth, onAuthStateChanged, doc, onSnapshot, db } from './FirebaseConfig';
import LoaderGif from '../Assets/loaderGif.gif';

export default function Router() {
  const [isLoader, setisLoader] = useState(true);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUid = user.uid;
        const unsub = onSnapshot(doc(db, `users/${userUid}`), (doc) => {
          if (doc.exists() && doc.data().isAuthenticate) {
            setisLoader(false);
            setIsUser(true);
          } else {
            setisLoader(false);
            setIsUser(false);
          }
        });
      } else {
        setisLoader(false);
        setIsUser(false);
      }
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={isUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>

      <div className="loaderDiv" style={{ display: isLoader ? 'flex' : 'none' }}>
        <img src={LoaderGif} alt="" />
      </div>
    </div>
  );
}
