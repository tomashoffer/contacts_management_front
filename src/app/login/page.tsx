'use client'
import { FormEvent } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Register from '@/app/components/Register';
import LogIn from '../components/Login';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setIsLoginPage } from '@/redux/features/authSlice';
import { useLoginUserMutation, useRegisterUserMutation } from '@/redux/services/authApi';
import { login } from '../../action'
import RegisterData from '@/interfaces/RegisterData';
import Swal from 'sweetalert2'

const LoginPage = () => {
  const isLoginPage: boolean = useAppSelector((state) => state.auth.isLoginPage);
  const dispatch = useAppDispatch();
  const [loginUserMutation] = useLoginUserMutation();
  const [registerUserMutation] = useRegisterUserMutation();


  async function handleSubmitLogIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
  
    try {
      const response = await loginUserMutation({ email, password });

      if (response.data) {
        const loginSessionData = {
          userId: response.data.userData.id,
          username: response.data.userData.username,
          email: response.data.userData.email,
          id: response.data.userData.id,
          token: response.data.token,
          isLoggedIn:true
        }
        localStorage.removeItem('token');
        localStorage.setItem('token', response.data.token);
        login(loginSessionData)
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid credentials!",
        });
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

async function handleSubmitRegister(data: RegisterData) {
  try {
    const newUser: RegisterData = {
      username: data.username,
      email: data.email,
      password: data.password
    };

    const response = await registerUserMutation(newUser);

    if (response && response.data) {
      dispatch(setIsLoginPage(true))
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
        title: "Usuario creado exitosamente"
      });
    } else {
      console.error('Unexpected response:', response);
    }
  } catch (error) {
    console.error('Error occurred during registration:', error);
  }
}

  
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold my-4">Welcome</h1>
      {isLoginPage ? (
        <LogIn handleSubmit={handleSubmitLogIn}/>
      ) : (
        <Register handleSubmitRegister={handleSubmitRegister}/>
      )}

      <div className="mt-4">
        <button onClick={() => dispatch(setIsLoginPage(!isLoginPage))}>
          {isLoginPage ? 'Go to Register' : 'Go to Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
