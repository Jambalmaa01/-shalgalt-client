import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import { IoMdPerson } from "react-icons/io";
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";

export default function CombinedInfo() {
  const [combinedData, setCombinedData] = useState([]);
  const { Id, Email, role } = useParams();
  const [view, setView] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classResponse = await axios.get('http://localhost:3001/api/createClass');
        const classes = classResponse.data.data;

        const phoneResponse = await axios.get('http://localhost:3001/api/Phone');
        const phones = phoneResponse.data.data;

        const combined = classes.map(cls => {
          const phonesForClass = phones.filter(phone => phone.classId === cls._id);
          return {
            ...cls,
            phones: phonesForClass
          };
        });

        setCombinedData(combined);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
        
      await axios.delete(`http://localhost:3001/api/createClass/${id}`);

      await axios.delete(`http://localhost:3001/api/Phone/${id}`);
      setCombinedData(combinedData.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = combinedData.filter(item =>
    item.phones.some(phone =>
      (phone.Name && phone.Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (phone.phoneNumber && phone.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );
  
  
  
  

  const garah = () => {
    navigate('/One');
    setView(false);
  };

  const button = () => {
    setView(true);
  };

  return (
    <div id='admin'>
      <div style={{ width: '100%', height: '58px', backgroundColor: 'rgb(221, 216, 216)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <div id='searchinput'>
          <input 
            style={{ width: '300px', height: '35px' }} 
            type="search" 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div onClick={button} id='profile'>
          <IoMdPerson style={{ fontSize: '30px', color: 'gray', marginTop: '20px' }} />
          <p style={{ color: 'gray', fontSize: 18, marginLeft: '15px', marginTop: '25px', marginRight: '10px' }}>{Email}</p>
        </div>
      </div>
      {view && (
        <p 
          style={{ 
            color: 'black', 
            fontSize: 18, 
            marginLeft: '1200px', 
            marginTop: '5px', 
            backgroundColor: 'white', 
            border: '1px solid black',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            borderRadius: '3px', 
            width: '100px' 
          }} 
          onClick={garah}
        >
          гарах
        </p>
      )}
      <div id="combined-info">
        {filteredData.map((item) => (
          <div className="class-item" key={item._id}>
            <div>
              <h5>ангийн нэр: {item.className}</h5>
              <h5>үүрэг: {item.teacherName}</h5>
              <div className="phone-list">
                <ul>
                  {item.phones.map(phone => (
                    <li key={phone._id}>
                      {phone.Name}: {phone.phoneNumber}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <RiDeleteBin5Line
                onClick={() => deleteItem(item._id)}
                style={{ fontSize: '30px', marginLeft: '20px' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
