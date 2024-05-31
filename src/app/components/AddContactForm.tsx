'use client'
import React, { useEffect, useState } from 'react';
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { uploadFile } from '@/firebase/config';
import { FaCheckCircle } from 'react-icons/fa';
import CreateContact from '@/interfaces/CreateContact';
import { useCreateContactMutation } from '@/redux/services/contactsApi';
import Swal from 'sweetalert2';
import useVerifyTokenAndRedirect from '../hook/verifyToken';
import Button from './Button'; // Importar el componente Button

const AddContactForm = () => {
  const [photo, setPhoto] = useState('');
  const [address, setAddress] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [errorAddress, setErrorAddress] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);

  useVerifyTokenAndRedirect();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      try {
        const url = await uploadFile(selectedFile);
        console.log(url);
        setPhoto(url);
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

  const getAddressSuggestions = async (value: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.map((result: any) => result.display_name);
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      return [];
    }
  };

  const onSuggestionsFetchRequested = async ({ value }: { value: string }) => {
    const suggestions = await getAddressSuggestions(value);
    setAddressSuggestions(suggestions);
  };
  
  const renderSuggestion = (suggestion: string) => {
    const truncatedSuggestion = suggestion.length > 50 ? `${suggestion.slice(0, 50)}...` : suggestion;
    return (
      <div style={{ padding: '10px', background: '#FBEEFF', borderBottom: '1px solid #7a7a7a', cursor: 'pointer', maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {truncatedSuggestion}
      </div>
    );
  };

  const autosuggestProps = {
    suggestions: addressSuggestions,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested: () => setAddressSuggestions([]),
    getSuggestionValue: (suggestion: string) => suggestion,
    renderSuggestion, 
  };

  const onChangeAddress = (event: React.FormEvent, { newValue }: Autosuggest.ChangeEvent) => {
    setAddress(newValue);
    setErrorAddress(false);
    setAddressValue(newValue);
  };

  const onBlurAddress = (event: React.FormEvent) => {
    setAddressValue((event.target as HTMLInputElement).value);
  };

  const [createContactMutation] = useCreateContactMutation();

  const handleSubmitAdd = async (data: CreateContact) => {
    try {
      const response = await createContactMutation(data);
      if (response.data) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Contacto creado exitosamente"
        });
      } else {
        console.error('Failed to create contact:', response.error);
      }
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        profession: '',
        address: '',
        phone: '',
        email: '',
        photo: '', 
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Required name'),
        profession: Yup.string().required('Required profession'),
        phone: Yup.string().required('Required phone'),
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const newContact: CreateContact = {
          name: values.name,
          email: values.email,
          address: address,
          phone: values.phone,
          photo: photo || '',
          profession: values.profession || '',
        };
        if (!address.trim()) {
          setErrorAddress(true);
          return;
        }
        handleSubmitAdd(newContact);
        setSubmitting(false);
      }}
    >
      <Form className="centered" style={{marginBottom: '1rem'}}>
        <div className="edit-contact-form">
          <div className="form-column">
            <div className="input-group">
              <label className="contact-name" htmlFor="name">Name</label>
              <Field
                type="text"
                name="name"
                id="name"
                className="form-input"
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
            <div className="input-group">
              <label className="contact-name" htmlFor="profession">Title</label>
              <Field
                type="text"
                name="profession"
                id="profession"
                className="form-input"
              />
              <ErrorMessage name="profession" component="div" className="error-message" />
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
                  <img className='edit-button-download-file' src="/download.png" alt="No contacts"
                       onClick={handleUploadClick}/>
                  : <FaCheckCircle style={{color: "green"}} className='edit-button-download-file'
                                   onClick={handleUploadClick}/>}
              </div>
            </div>
          </div>
          <div className="form-column">
            <div className="input-group">
              <label className="contact-name" htmlFor="address">Address</label>
              <Autosuggest
                inputProps={{
                  id: 'address',
                  name: 'address',
                  value: address,
                  onChange: onChangeAddress,
                  onBlur: onBlurAddress,
                  className: 'form-input',
                }}
                {...autosuggestProps}
              />
              {errorAddress && 
                <p className="error-message">Required Address</p>}
            </div>
            <div className="input-group">
              <label className="contact-name" htmlFor="phone">Phone</label>
              <Field
                type="text"
                name="phone"
                id="phone"
                className="form-input"
              />
              <ErrorMessage name="phone" component="div" className="error-message" />
            </div>
            <div className="input-group">
              <label className="contact-name" htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                className="form-input"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
          </div>
        </div>
        <div className="button-group">
          <Button type="submit" >
            ADD CONTACT
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default AddContactForm;
