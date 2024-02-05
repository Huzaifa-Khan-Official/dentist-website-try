import React, { useState, useEffect } from 'react';
import LoaderGif from '../Assets/loaderGif.gif';
import { auth, onAuthStateChanged, doc, onSnapshot, db, updateDoc, signOut } from '../Configuration/FirebaseConfig';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { MDBBtn } from 'mdb-react-ui-kit';
import "./Home.css";
import Modal from '../Components/Modal/Modal';

export default function Home() {
  const [isLoader, setisLoader] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUid = user.uid;
        const unsub = onSnapshot(doc(db, `users/${userUid}`), (doc) => {
          if (doc.exists() && doc.data().isAuthenticate) {
            setisLoader(false);
          } else {
            setisLoader(false);
            return <Navigate to="/login" />;
          }
        });
      } else {
        return <Navigate to="/login" />;
      }
    });
  }, []);

  const logoutBtn = () => {
    setisLoader(true);
    const currUser = auth.currentUser;
    const userUid = currUser.uid;
    signOut(auth).then(async () => {
      const userRef = doc(db, `users/${userUid}`);

      await updateDoc(userRef, {
        isAuthenticate: false,
      });

      setisLoader(false);
    });
  };

  return (
    <div>
      <Navbar logoutBtn={logoutBtn} />
      <div className="contentDiv">
        <h1>Add Patient Details</h1>
        <div className="addPatientBtnDiv">
          <Modal />
        </div>
      </div>
      <div className="loaderDiv" style={{ display: isLoader ? 'flex' : 'none' }}>
        <img src={LoaderGif} alt="" />
      </div>
    </div>
  );
}
