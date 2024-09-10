import React, { useState } from 'react';
import axios from 'axios'; 
import './style.css';
import { useNavigate } from 'react-router-dom';
const apiUrl = 'http://localhost:3001/api/signup';

export default function Bvrtgel(navigation) {
    // const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate=useNavigate()
    const saveSubmit = async () => {
        console.log('log', email,)
        // setName( );
        setEmail();
        setPassword();
        try {
            const resp = await axios.post(apiUrl, {  email, password });
            console.log('data',resp.data);
            alert('амжиллтай')
            navigate('/Newtreh')
        } catch (error) {
            console.error('Error:', error);
            alert('дахин оролдож үзнэ үү')
        }
        
    };

    return (
        <div id='newtreh'>
            <div id='img'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7zPcVRD5gfB2nb8D_t63dobuvm9Ow1TPK5w&s" alt="Login" />
            </div>
            <div id='new'>
                <h1 id='log'>Бүртгэл</h1>
                {/* <input onChange={(el) => setName(el.target.value)} type="text" placeholder='нэр' id='input1' /> */}
                <input onChange={(el) => setEmail(el.target.value)} type="text" placeholder='имэйл' id='input2' />
                <input onChange={(el) => setPassword(el.target.value)} type="password" placeholder='паспорт' id='input3' />
                <button onClick={saveSubmit} id='button'>Бүртгүүлэх</button>
                <a href="./Newtreh">Нэвтрэх</a>
            </div>
        </div>
    );
}
