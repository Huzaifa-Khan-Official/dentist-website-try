import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { auth, signInWithEmailAndPassword, doc, db, updateDoc } from '../../Configuration/FirebaseConfig';
import LoaderGif from "../../Assets/loaderGif.gif";

const Login = () => {
    let [isLoader, setisLoader] = useState(false);
    let [emailValue, setemailValue] = useState("");
    let [passwordValue, setpasswordValue] = useState("");

    const signInBtn = () => {
        try {
            setisLoader(true);

            if (emailValue == "" || passwordValue == "") {
                throw "Please fill all fields!"
            } else {
                signInWithEmailAndPassword(auth, emailValue, passwordValue)
                    .then(async (userCredential) => {
                        const user = userCredential.user;
                        const userUid = user.uid;

                        const userRef = doc(db, `users/${userUid}`);

                        await updateDoc(userRef, {
                            isAuthenticate: true
                        });

                        setisLoader(false);

                        Swal.fire({
                            title: 'Success!',
                            icon: 'success',
                            text: "Login successfully!",
                        })

                        setemailValue("");
                        setpasswordValue("");
                    })
                    .catch((error) => {
                        setisLoader(false);
                        const errorMessage = error.message;
                        Swal.fire({
                            title: 'Error!',
                            icon: 'error',
                            text: errorMessage,
                            confirmButtonText: 'Cool'
                        })
                    });

            }

        } catch (error) {
            setisLoader(false);
            Swal.fire({
                title: 'Error!',
                icon: 'error',
                text: error,
                confirmButtonText: 'Cool'
            })
        }
    }
    return (
        <div className="d-flex justify-content-center pt-5 pb-5">
            <div className="LoginComponentDiv">
                <ul className="nav nav-pills nav-justified mb-3 " id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                            aria-controls="pills-login" aria-selected="true">Login</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link className="nav-link" id="tab-register" data-mdb-toggle="pill" role="tab"
                            aria-controls="pills-register" aria-selected="false" to={"/signup"}>
                            Register
                        </Link>
                    </li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                        <div className="text-center mb-3">
                            <p>Sign in with:</p>
                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-google"></i>
                            </button>
                        </div>

                        <p className="text-center">or:</p>

                        <div className="form-outline mb-4 mt-5">
                            <input type="email" id="loginName" className="form-control" value={emailValue} onChange={(e) => setemailValue(e.target.value)} />
                            <label className="form-label">Email or username</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" id="loginPassword" className="form-control" value={passwordValue} onChange={(e) => setpasswordValue(e.target.value)} />
                            <label className="form-label">Password</label>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6 d-flex justify-content-center">
                                <div className="form-check mb-3 mb-md-0 formCheckDiv">
                                    {/* <input className="form-check-input" type="checkbox" value="" id="loginCheck" checked /> */}
                                    <label className="form-check-label"> Remember me </label>
                                </div>
                            </div>

                            <div className="col-md-6 d-flex justify-content-center">
                                <a href="#!">Forgot password?</a>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4" onClick={signInBtn}>Sign in</button>

                        <div className="text-center">
                            <p>Not a member? <Link to={"/signup"} id="rigisterLink">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="loaderDiv" style={{ display: isLoader ? "flex" : "none" }}>
                <img src={LoaderGif} alt="" />
            </div>
        </div>
    )
}


export default Login;