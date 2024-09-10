import React, { useState } from 'react';
import './style.css';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const apiUrl = 'http://localhost:3001/api/signin';

export default function Newtreh() {
    const [email1, setEmail] = useState('');
    const [password1, setPassword] = useState('');
    const navigate = useNavigate();

    const Submitsave = async () => {
        setPassword('');
        setEmail('');
    
        if (email1 === '' || password1 === '') {
            alert('Бүх талбарыг оруулах шаардлагатай');
            return;
        }
    
        try {
            const response = await axios.post(apiUrl, { email: email1, password: password1 });
    
            if (response.status === 200) {
                const { token, findUser } = response.data;
    
                if (findUser) {
                    const { _id, email, role } = findUser;
                    console.log('Successful login. Role:', role);
                    localStorage.setItem('token', token);
    
                    const redirectUrl = role === 'admin' ? `/admin/${_id}/${email}/${role}` : `/home/${_id}/${email}/${role}`;
                    console.log('Navigating to:', redirectUrl);
    
                    navigate(redirectUrl);
                } else {
                    console.log('User not found');
                    alert('User not found. Please check your credentials.');
                }
            } else if (response.status === 401) {
                console.log('Incorrect password');
                alert('Incorrect password. Please try again.');
            } else {
                console.error('Unexpected server response:', response.status, response.statusText);
                alert('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your network connection and try again.');
        }
    };
    

    return (
        <div id='newtreh'>
            <div id='img'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7zPcVRD5gfB2nb8D_t63dobuvm9Ow1TPK5w&s" alt="Login"/>
            </div>
            <div id='new'>
                <h1 id='log1'>Нэвтрэх</h1>
                <input 
                    onChange={(el) => setEmail(el.target.value)} 
                    type="text" 
                    placeholder='имэйл' 
                    id='input1' 
                />
                <input 
                    onChange={(el) => setPassword(el.target.value)} 
                    type="password" 
                    placeholder='паспорт' 
                    id='input2' 
                />
                <button 
                    onClick={Submitsave} 
                    id='button'
                >
                    Нэвтрэх
                </button>
                <a href="./Bvrtgel">Бүртгүүлэх</a>
            </div>
        </div>
    );
}
