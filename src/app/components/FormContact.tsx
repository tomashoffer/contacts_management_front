import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { uploadFile } from '@/firebase/config';
import { setEditContact, setSelectedContact } from '@/redux/features/contactsSlice';
import { FaCheckCircle } from 'react-icons/fa';
import Contact from '@/interfaces/Contact';

type FormContactProps = {
  contactData: Contact;
  handleSave: (data: Partial<Contact>) => void;
};

const FormContact: React.FC<FormContactProps> = ({ contactData, handleSave }) => {
  const contactsSelected: any = useAppSelector((state) => state.contacts.selectedContact);
  const [name, setName] = useState(contactsSelected.name || '');
  const [profession, setProfession] = useState(contactsSelected.profession || '');
  const [address, setAddress] = useState(contactsSelected.address || '');
  const [phone, setPhone] = useState(contactsSelected.phone || '');
  const [email, setEmail] = useState(contactsSelected.email || '');
  const [photo, setPhoto] = useState(contactsSelected.photo || '');
  
  useEffect(() => {
    if(contactData && contactData.name){
      setName(contactData.name)
      setProfession(contactData.profession)
      setAddress(contactData.address)
      setPhone(contactData.phone)
      setEmail(contactData.email)
      setPhoto(contactData.photo)
      dispatch(setSelectedContact(contactData))
    }
  }, [contactData]);
  
  const dispatch = useAppDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'profession':
        setProfession(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
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

  const handleUploadClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSubmit = () => {
    const data = {
     name,
     profession,
     address,
     phone,
     email,
     photo,
    }
    handleSave(data)
  }

 
  
  const handleCancel = () => {
    dispatch(setEditContact(false))
  };

  return (
    <div className='centered'>
        <div className="edit-contact-form">
        <div className="form-column">
            <div className="input-group">
            <label className="contact-name" htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleInputChange}
                className="form-input"
            />
            </div>
            <div className="input-group">
            <label className="contact-name" htmlFor="profession">Title</label>
            <input
                type="text"
                name="profession"
                id="profession"
                value={profession}
                onChange={handleInputChange}
                className="form-input"
            />
            </div>
            <div className="input-group">
            <label className="contact-name" htmlFor="profilePicture">Profile Picture</label>
            <div className='form-input file-div'>
                <label htmlFor="file-input" className="upload-label">Upload File</label>
                <input
                    type="file"
                    name="profilePicture"
                    id="file-input"
                    placeholder={photo ? "Photo uploaded" : "Upload file"}
                    onChange={handleFileChange}
                    className="form-input"
                />
               {!photo ? 
                <img className='edit-button-download-file' src="/download.png" alt="No contacts" onClick={handleUploadClick} />
              : <FaCheckCircle style={{color: "green"}} className='edit-button-download-file' onClick={handleUploadClick}/>}
            </div>
            </div>

        </div>
        <div className="form-column">
            <div className="input-group">
            <label className="contact-name" htmlFor="address">Address</label>
            <input
                type="text"
                name="address"
                id="address"
                value={address}
                onChange={handleInputChange}
                className="form-input"
            />
            </div>
            <div className="input-group">
            <label className="contact-name" htmlFor="phone">Phone</label>
            <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={handleInputChange}
                className="form-input"
            />
            </div>
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
        </div>
        </div>
        <div className="button-group">
            <button className="save-button" onClick={handleSubmit}>Save</button>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
    </div>
  );
};

export default FormContact;
