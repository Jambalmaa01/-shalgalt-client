import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import './admin.css'
import axios from 'axios';
import { IoMdPerson } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Class from './Class';
import Phone from './Phone';
export default function Home() {
  const { Id, Email, role } = useParams(); 
  const apiUrl='http://localhost:3001/api/createClass'
  const apiUrl1='http://localhost:3001/api/Phone'
  
  const navigate = useNavigate();
  const [classData, setClassData]=useState([])
  const [canRegister, setCanRegister] = useState(true);
  const [classId, setClassId]=useState('')
  const [phoneData, setPhoneData]=useState([])
  const [canRegisterPhone, setCanRegisterPhone] = useState(true);
  const [classToDelete, setClassToDelete] = useState(null);
  const [editClassData, setEditClassData] = useState(null);
  const [editPhoneData, setEditPhoneData] = useState(null);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [className, setClassname]=useState('')
  const [teacherName, setTeachername]=useState('')
  const [name, setName]=useState('')
  const [number, setNumber]=useState('')
  const [view, setView] = useState(false);

 
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data.data;
        
        if (Array.isArray(data) && data.length > 0) {
          const userClasses = data.filter((item) => item.userId === Id);
          setClassData(userClasses);
          userClasses.map((el)=>(
            setClassId(el._id)
          ))

          if (userClasses.length > 0) {
            setCanRegister(false);
          }
        }
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };

    fetchClassData();
  }, [Id, apiUrl]);
  useEffect(() => {
    const fetchPhoneData = async () => {
      try {
        const response = await axios.get(apiUrl1);
        const data = response.data.data;
        
        if (Array.isArray(data) && data.length > 0) {
          const userPhone = data.filter((item) => item.classId === classId);
          setPhoneData(userPhone);
          
          if (userPhone.length > 0) {
            setCanRegisterPhone(false);
          }
        }
      } catch (error) {
        console.error("Error fetching phone data:", error);
      }
    };

    if (classId) { // Ensure classId is set before fetching data
      fetchPhoneData();
    }
  }, [classId, apiUrl1]);


  const editClass=(id)=>{
      setEditClassData(id)
      setShowClassModal(true)
  }

  const editPhone=(id)=>{
    setShowPhoneModal(true)
    setEditPhoneData(id)
  }

  const deleteClass = (id) => {
    axios
      .delete(`http://localhost:3001/api/createClass/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const updatedCategories = classData.filter((cat) => cat._id !== id);
          setClassData(updatedCategories);
        } else {
          console.error('Failed to delete category');
        }
      })
      .catch((error) => {
        console.error('Error while deleting category:', error);
      });
  };
  const deletePhone = (id) => {
    axios
      .delete(`http://localhost:3001/api/Phone/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const updatedCategories = phoneData.filter((cat) => cat._id !== id);
          setPhoneData(updatedCategories);
        } else {
          console.error('Failed to delete phone');
        }
      })
      .catch((error) => {
        console.error('Error while deleting phone:', error);
      });
  };



  const onEditClass= async()=>{
      if(className.trim()!==''){
        try{ 
          const resp= await axios.put(`${apiUrl}/${editClassData}`, {className:className, teacherName:teacherName, userId:Id})
          setShowClassModal(false)
          setEditClassData(null)
         
        }catch(error){
          console.error('Error:', error); 
          alert('not')
        }
      }
  }
  const onEditPhone= async()=>{
    if(name.trim()!==''){
      try{ 
        const resp= await axios.put(`${apiUrl1}/${editPhoneData}`, {Name:name, phoneNumber:number, userId:Id, classId:classId})
        setShowPhoneModal(false)
        setEditPhoneData(null)
       
      }catch(error){
        console.error('Error:', error); 
        alert('not')
      }
    }
}

const garah = () => {
  navigate('/One');
  setView(false);
};

const button = () => {
  setView(true);
};
  

  return (
    <div id='home'>
      <div style={{ width: '100%', height: '58px', backgroundColor: 'rgb(221, 216, 216)',  }}>
        <div onClick={button} id='profile1'>
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
      <div style={{marginTop:"30px", marginLeft:'30px'}}>
      {canRegister ? (
        <Class userid={Id} />
      ) : (
        <p>Та аль хэдийн ангид бүртгүүлсэн баorйна. Та өөр ангид бүртгүүлэх боломжгүй</p>
      )}
      </div>
      <div >
      {classData.map((e, index) => (
        <div key={index}>
          <div id="newclass">
          <div id='class1'>
          <p style={{width:'210px'}}><strong>ангийн нэр:</strong> {e.className}</p>
          <p  ><strong >үүрэг:</strong> {e.teacherName}</p>
          </div>
          <div id='class2'>
          <FiEdit onClick={()=>editClass(e._id)} style={{fontSize:'20px'}} />
          <RiDeleteBin5Line             onClick={() => deleteClass(e._id)}
          style={{fontSize:'20px', marginLeft:'20px'}} />
          </div>
          </div>
          <div>
               {canRegisterPhone ? (  <Phone  classID={classId} userid={Id} />  ) : (<p></p> )}
          </div>
        </div>
        
      ))}
    </div>
       
    <div>
      {
        phoneData.map((e, index)=>(
          <div key={index} id="newphone" className="mb-3 p-3 border rounded">
          <div id='phone'>
            <p style={{width:'210px'}}><strong>нэр:</strong>{e.Name}</p>
            <p style={{marginLeft:'20px'}} ><strong>утасны дугаар:</strong>{e.phoneNumber}</p>
          </div>
          <div>
          <FiEdit onClick={()=>editPhone(e._id)} style={{fontSize:'20px'}} />
          <RiDeleteBin5Line onClick={() => deletePhone(e._id)} style={{fontSize:'20px', marginLeft:'20px'}} />
          </div>
          </div>
        ))
      }
    </div>
     {editPhoneData &&
     <Modal show={showPhoneModal} onHide={() => setShowPhoneModal(false)}>
     <Modal.Header closeButton>
       <Modal.Title>Анги бүртгэл засах</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <input style={{width:'470px', height:'35px'}} onChange={(el)=>setName(el.target.value)} type="text" placeholder='нэр ' name="form-control mb-2" />
       <input style={{width:'470px', height:'35px', marginTop:'15px'}} onChange={(el)=>setNumber(el.target.value)} type="text" placeholder='утасны дугаар' name="form-control mb-2" />
       
     </Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={() => setShowPhoneModal(false)}>
         Хаах
       </Button>
       <Button variant="primary" onClick={onEditPhone}>
         Хадгалах
       </Button>
     </Modal.Footer>
   </Modal>

     } 


    {editClassData && (
        <Modal show={showClassModal} onHide={() => setShowClassModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Засах анги</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassname(e.target.value )}
              placeholder="Анги нэр"
              className="form-control mb-2"
            />
            <select 
            onChange={(e) => setTeachername( e.target.value )} 
            value={teacherName}
            className="form-control mb-2"
          >
            <option value="сурагч">сурагч</option>
            <option value="багш">багш</option>
          </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowClassModal(false)}>
              Хаах
            </Button>
            
            <Button variant="primary" onClick={onEditClass}>Хадгалах</Button>



          </Modal.Footer>
        </Modal>
      )}

      
    </div>

    
  );
}
