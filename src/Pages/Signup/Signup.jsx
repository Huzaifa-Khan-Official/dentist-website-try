import React, { useState, useEffect } from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth, createUserWithEmailAndPassword, doc, setDoc, db, onAuthStateChanged, onSnapshot } from '../../Configuration/FirebaseConfig';
import LoaderGif from "../../Assets/loaderGif.gif";

function Signup() {
    let [userName, setuserName] = useState("");
    let [emailValue, setemailValue] = useState("");
    let [passwordValue, setpasswordValue] = useState("");
    let [repeatPasswordValue, setrepeatPasswordValue] = useState("");
    let [isLoader, setisLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userUid = user.uid;
                const unsub = onSnapshot(doc(db, `users/${userUid}`), (doc) => {
                    if (doc.exists() && doc.data().isAuthenticate) {
                        setisLoader(false);
                        navigate("/")
                    } else {
                        setisLoader(false)
                    }
                });
            } else {
            }
        });
    }, [])

    const signupBtn = () => {
        try {
            setisLoader(true);

            if (userName == "" || emailValue == "" || passwordValue == "" || repeatPasswordValue == "") {
                throw "Please fill all fields!"
            } else if (passwordValue !== repeatPasswordValue) {
                throw "Passwords don't match!"
            } else {

                const userData = {
                    name: userName,
                    email: emailValue,
                    password: passwordValue
                }

                createUserWithEmailAndPassword(auth, userData.email, userData.password)
                    .then(async (userCredential) => {
                        const user = userCredential.user;
                        const userUid = user.uid;


                        await setDoc(doc(db, `users/${userUid}`), {
                            ...userData,
                            uid: userUid
                        });

                        setisLoader(false);
                        Swal.fire({
                            title: 'Congratulations!',
                            icon: 'success',
                            text: "Account created successfully!",
                        })

                        setuserName("");
                        setemailValue("");
                        setpasswordValue("");
                        setrepeatPasswordValue("");

                    })
                    .catch((error) => {
                        setisLoader(false);
                        const errorMessage = error.message;
                        Swal.fire({
                            title: 'Error!',
                            icon: 'error',
                            text: errorMessage,
                        })
                    });

            }

        } catch (error) {
            setisLoader(false);
            Swal.fire({
                title: 'Error!',
                icon: 'error',
                text: error,
            })
        }
    }

    return (
        <div className="d-flex justify-content-center pt-5 pb-5">
            <div className="SignUpComponentDiv">
                <ul className="nav nav-pills nav-justified mb-3 " id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <Link className="nav-link" id="tab-register" data-mdb-toggle="pill" role="tab"
                            aria-controls="pills-register" aria-selected="false" to={"/login"}>
                            Login
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="tab-register" data-mdb-toggle="pill" role="tab"
                            aria-controls="pills-register" aria-selected="true">Register</a>
                    </li>
                </ul>


                <div className="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <div className="text-center mb-3">
                        <p>Sign up with:</p>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-google"></i>
                        </button>
                    </div>

                    <p className="text-center">or:</p>

                    <div className="form-outline mt-4 mb-4">
                        <input type="text" id="registerName" className="form-control" value={userName} onChange={(e) => setuserName(e.target.value)} />
                        <label className="form-label" >Username</label>
                    </div>

                    <div className="form-outline mt-4 mb-4">
                        <input type="email" id="registerEmail" className="form-control" onChange={(e) => setemailValue(e.target.value)} value={emailValue} />
                        <label className="form-label" >Email</label>
                    </div>

                    <div className="form-outline mt-4 mb-4">
                        <input type="password" id="registerPassword" className="form-control" value={passwordValue} onChange={(e) => setpasswordValue(e.target.value)} />
                        <label className="form-label" >Password</label>
                    </div>

                    <div className="form-outline mt-4 mb-4">
                        <input type="password" id="registerRepeatPassword" className="form-control" value={repeatPasswordValue} onChange={(e) => setrepeatPasswordValue(e.target.value)} />
                        <label className="form-label" >Repeat password</label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-4">
                        {/* <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked aria-describedby="registerCheckHelpText" /> */}
                        <label className="form-check-label">
                            I have read and agree to the terms
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-3" onClick={signupBtn}>Sign in</button>
                </div>
            </div >

            <div className="loaderDiv" style={{ display: isLoader ? "flex" : "none" }}>
                <img src={LoaderGif} alt="" />
            </div>
        </div >
    )
}

export default Signup;