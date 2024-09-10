import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
export default function Phone({classID, userid}) {
  const apiUrl='http://localhost:3001/api/Phone'
    const [name, setName]=useState('')
    const [number, setNumber]=useState('')
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleSave = async () => {
    try {
      console.log('userid:', classID);
      const resp = await axios.post(apiUrl, {
        Name: name,
        phoneNumber: number,
        userId:userid,
        classId: classID
      });
      console.log('name:', name);
      console.log('Response:', resp.data);
      setName('');
      setNumber('');
      handleClose();
    } catch (error) {
      console.error('Error during authentication or adding text:', error);
      alert('Failed to save the class. Please try again.');
    }
  };

  return (

    <div>
      <Button style={{marginLeft:'30px', marginTop:'15px'}} onClick={handleShow} variant="primary">
        утас бүртгэл нээх
      </Button>
       <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Анги бүртгэл</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input style={{width:'470px', height:'35px'}} onChange={(el)=>setName(el.target.value)} type="text" placeholder='нэр ' name="form-control mb-2" />
          <input style={{width:'470px', height:'35px', marginTop:'15px'}} onChange={(el)=>setNumber(el.target.value)} type="text" placeholder='утасны дугаар' name="form-control mb-2" />
          
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
