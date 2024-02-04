import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Navbar from '../Components/Navbar'
import Login from '../Pages/Login/Login'

export default function Router() {
    const [isUser, setIsUser] = useState(false);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        isUser ? <Navbar><Home /></Navbar> :
                            <Navigate to={"/login"} />
                    } />
                    <Route path='/login' element={
                        isUser ? <Navigate to={"/"} /> :
                            <Login />
                    } />
                </Routes>
            </BrowserRouter>
        </div>
    )
}