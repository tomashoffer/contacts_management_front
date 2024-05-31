import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import RegisterData from '@/interfaces/RegisterData';
import Button from './Button';
import styled from 'styled-components';

const Register = ({ handleSubmitRegister }: { handleSubmitRegister: (data: RegisterData) => void }) => {

  interface RegisterData {
    username: string;
    email: string;
    password: string;
    passwordRepeat?: string; 
  }

  const initialValues: RegisterData = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    passwordRepeat: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Password confirmation is required')
  });
  
  const handleSubmit = (values: RegisterData, { setSubmitting }: FormikHelpers<RegisterData>) => {
    const { username, email, password, passwordRepeat } = values; 
    
    if (!username || !email || !password) {
      alert('Please complete all the fields');
      return;
    }
    if (password !== passwordRepeat) {
      alert('Password do not match');
      return;
    }
    handleSubmitRegister({ username, email, password });
    setSubmitting(false);
  };
  
  
  return (
    <CenteredRegister>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="edit-contact-form">
            <div className="form-column">
              <div className="input-group">
                <label className="contact-name" htmlFor="username">Username</label>
                <Field type="text" name="username" className="form-input" />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>
              <div className="input-group">
                <label className="contact-name" htmlFor="password">Password</label>
                <Field type="password" name="password" className="form-input" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
            </div>
            <div className="form-column">
              <div className="input-group">
                <label className="contact-name" htmlFor="email">Email</label>
                <Field type="email" name="email" className="form-input" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="input-group">
                <label className="contact-name" htmlFor="passwordRepeat">Repeat Password</label>
                <Field type="password" name="passwordRepeat" className="form-input" />
                <ErrorMessage name="passwordRepeat" component="div" className="error-message" />
              </div>
            </div>
            </div>
            <Button type="submit" >
            {isSubmitting ? 'Registering...' : 'REGISTER'}
          </Button>
          </Form>
        )}
      </Formik>
    </CenteredRegister>
  );
};

const CenteredRegister = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;


export default Register;
