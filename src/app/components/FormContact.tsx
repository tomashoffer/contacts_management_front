import React, { useEffect, useState } from 'react';
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
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
  const [photo, setPhoto] = useState(contactsSelected.photo || '');
  const [address, setAddress] = useState(contactsSelected.address || '');
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [addressValue, setAddressValue] = useState('');

  useEffect(() => {
    if (contactData && contactData.name) {
      dispatch(setSelectedContact(contactData));
    }
  }, [contactData]);

  const dispatch = useAppDispatch();

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
    setAddress(newValue)
    setAddressValue(newValue);
  };

  const onBlurAddress = (event: React.FormEvent) => {
    setAddressValue((event.target as HTMLInputElement).value);
  };


  


  return (
    <Formik
      initialValues={{
        name: contactsSelected.name || '',
        profession: contactsSelected.profession || '',
        address: contactsSelected.address || '',
        phone: contactsSelected.phone || '',
        email: contactsSelected.email || '',
        photo: contactsSelected.photo || '', 
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Required name'),
        profession: Yup.string().required('Required profession'),
        address: Yup.string().required('Required address'),
        phone: Yup.string().required('Required phone'),
        email: Yup.string().email('Invalid email address').required('Required'),
        photo: Yup.string(), 
      })}
      onSubmit={(values, { setSubmitting }) => {
        handleSave({ ...values, photo, address });
        setSubmitting(false);
      }}
    >
      <Form className="centered">
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

              <ErrorMessage name="address" component="div" className="error-message" />
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
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={() => dispatch(setEditContact(false))}>Cancel</button>
        </div>
      </Form>
    </Formik>
  );
};

export default FormContact;
