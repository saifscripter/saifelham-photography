import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import googleLogo from '../../images/google.svg';
import './Register.css';
const Register = () => {
  const inputName = useRef('');
  const inputEmail = useRef('');
  const inputPassword = useRef('');
  const inputConfirmPassword = useRef('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [user, loading, errorAuthState] = useAuthState(auth);
  const [
    createUserWithEmailAndPassword,
    userEmailandPassword,
    loadingEmailandPassword,
    errorCreateUser,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);
  user && navigate('/');
  console.log(errorCreateUser?.message);
  const handleCreateUser = (event) => {
    event.preventDefault();
    const name = inputName.current.value;
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const confirmPassword = inputConfirmPassword.current.value;
    if (password !== confirmPassword) {
      setError("Confirm Password didn't match!");
      return;
    }
    setError('');
    createUserWithEmailAndPassword(email, password);
  };
  return (
    <section className='register-login'>
      <h2 className='form-title'>Please Register</h2>
      <form className='form-container' onSubmit={handleCreateUser}>
        <input
          ref={inputName}
          type='text'
          name='name'
          placeholder='Name'
          required
        />
        <input
          ref={inputEmail}
          type='email'
          name='email'
          placeholder='Email'
          required
        />
        <input
          ref={inputPassword}
          type='password'
          name='password'
          placeholder='Password'
          required
        />
        <input
          ref={inputConfirmPassword}
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          required
        />
        <p className='error'>
          {error
            ? error
            : errorCreateUser?.message
            ? errorCreateUser.message.includes('auth/email-already-in-use')
              ? 'Email already in use!'
              : errorCreateUser.message.includes('auth/invalid-email')
              ? 'Invalid Email Address!'
              : errorCreateUser.message
            : ''}
        </p>
        <input type='submit' value='Register' className='btn-form' />
        <Link to={'/login'}>Already have an account?</Link>
      </form>
      <button className='btn btn-google' onClick={() => signInWithGoogle()}>
        <img src={googleLogo} alt='' />
        Sign in with Google
      </button>
    </section>
  );
};

export default Register;
