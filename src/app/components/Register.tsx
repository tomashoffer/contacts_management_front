import React, { ChangeEvent, useState } from 'react';
import { uploadFile } from '@/firebase/config';
import RegisterData from '@/interfaces/RegisterData';
import { FaCheckCircle } from "react-icons/fa";

const Register = ({ handleSubmitRegister }: { handleSubmitRegister: (data: RegisterData) => void }) => {

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');



  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'username':
        setName(value);
        break;
        case 'email':
          setEmail(value);
          break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordRepeat':
        setPasswordRepeat(value);
        break;
      default:
        break;
    }
  };
  

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
        try {
          const url = await uploadFile(selectedFile);
          console.log(url);
          setPhoto(url)
        } catch (error) {
          console.error('Error:', error);
          alert('Error al subir la imagen');
        }
      } else {
        alert('Por favor selecciona un archivo');
      }

  };


  const handleSubmit = () => {
    if (!name || !email || !password) {
      alert('Please complete all the fields');
      return;
    }
    if(password !== passwordRepeat){
      alert('Password do not match');
      return;
    }
    let data = {
      username: name,
      email,
      address,
      phone,
      photo,
      profession: title,
      password
    }
    handleSubmitRegister(data)
  }



  return (
    <div className='centered-register'>
        <div className="edit-contact-form">
        <div className="form-column">
            <div className="input-group">
            <label className="contact-name" htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                id="username"
                value={name}
                onChange={handleInputChange}
                className="form-input"
            />
            </div>
            <div className="input-group">
              <label className="contact-name" htmlFor="password">Password</label>
              <input
                type="password" 
                name="password"
                id="password"
                value={password}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
        </div>
        <div className="form-column">
        <div className="input-group">
            <label className="contact-name" htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleInputChange}
                className="form-input"
            />
            </div>
            <div className="input-group">
              <label className="contact-name" htmlFor="passwordRepeat">Repeat Password</label>
              <input
                type="password" 
                name="passwordRepeat"
                id="passwordRepeat"
                value={passwordRepeat}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
         
        </div>
        </div>
        <div onClick={handleSubmit} className="button">
          REGISTER
        </div>
    </div>
  );
};

export default Register;
