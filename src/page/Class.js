import React, {  useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
export default function Class({userid}) {
  const apiUrl='http://localhost:3001/api/createClass'
    const [className, setClassname]=useState('')
    const [teacherName, setTeachername]=useState('')
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleSave = async () => {
    try {
      console.log('userid:', userid);
      const resp = await axios.post(apiUrl, {
        className: className,
        teacherName: teacherName,
        userId: userid
      });
      console.log('className:', className);
      console.log('Response:', resp.data);
      setClassname('');
      setTeachername('');
      handleClose();
    } catch (error) {
      console.error('Error during authentication or adding text:', error);
      alert('Failed to save the class. Please try again.');
    }
  };

  return (

    <div>
      <Button onClick={handleShow} variant="primary">
        Анги бүртгэл нээх
      </Button>
       <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Анги бүртгэл</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input onChange={(el)=>setClassname(el.target.value)} type="text" placeholder='ангийн нэр ' className="form-control mb-2" />
          {/* <input onChange={(el)=>setTeachername(el.target.value)} type="text" placeholder='үүрэг' className="form-control mb-2" /> */}
          <select 
            onChange={(e) => setTeachername(e.target.value)} 
            value={teacherName} 
            className="form-control mb-2"
          >
            <option value="сурагч">сурагч</option>
            <option value="багш">багш</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Хаах
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Хадгалах
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
