import React from 'react';
import './style.css';
import Newtreh from './Newtreh';
import Bvrtgel from './Bvrtgel';
import Home from './Home';
import Class from './Class';
import Phone from './Phone';
import Admin from './Admin';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function One() {
    return (
        <BrowserRouter>
            <div>
                <div id='div0'>
                    <div id='div02'>
                        {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcND2MmbNgVQP2d07d_mE6JPeVPxHilnMTlA&s" alt="" /> */}
                    </div>
                    <div id='dvi01'>
                        <Link to="/">Нүүр</Link>
                        <Link to="/Newtreh">Нэвтрэх</Link>
                        <Link to="/Bvrtgel">Бүртгэл</Link>

                    </div>
                </div>
                <div id='div1'></div>
                <Routes>
                    <Route path="/Newtreh" element={<Newtreh />} />
                    <Route path="/Bvrtgel" element={<Bvrtgel />} />
                    <Route path="/Class" element={<Class />} />
                    <Route path="/Phone" element={<Phone />} />
                    <Route path="/Home/:Id/:Email/:role" element={<Home />} />
                    <Route path="/Admin/:Id/:Email/:role" element={<Admin />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}
