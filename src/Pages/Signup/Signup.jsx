import React from 'react'
import "./Signup.css"
import { Link } from 'react-router-dom';

function Signup() {
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
                        <a className="nav-link active" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                            aria-controls="pills-register" aria-selected="true">Register</a>
                    </li>
                </ul>


                <div className="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <form>
                        <div className="text-center mb-3">
                            <p>Sign up with:</p>
                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-facebook-f"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-google"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-twitter"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-github"></i>
                            </button>
                        </div>

                        <p className="text-center">or:</p>

                        <div className="form-outline mb-4">
                            <input type="text" id="registerName" className="form-control" />
                            <label className="form-label">Name</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" id="registerUsername" className="form-control" />
                            <label className="form-label" >Username</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="email" id="registerEmail" className="form-control" />
                            <label className="form-label" >Email</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" id="registerPassword" className="form-control" />
                            <label className="form-label" >Password</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" id="registerRepeatPassword" className="form-control" />
                            <label className="form-label" >Repeat password</label>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-4">
                            {/* <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked aria-describedby="registerCheckHelpText" /> */}
                            <label className="form-check-label">
                                I have read and agree to the terms
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-3">Sign in</button>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default Signup;