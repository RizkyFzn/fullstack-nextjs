import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { unauthPage } from '../../middleware/authorizationPage';
import Link from 'next/link';

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function Login() {
  const [field, setField] = useState({
    email: '',
    password: '',
  });

  const [status, setStatus] = useState('normal');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const loginReq = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(field),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!loginReq.ok) return setStatus('error' + loginReq.status);

    const loginRes = await loginReq.json();

    setStatus('success');
    console.log(loginRes);
    Cookies.set('token', loginRes.token);
    Router.push('/posts');
  };
  const handleField = (e) => {
    const name = e.target.getAttribute('name');

    setField({
      ...field,
      [name]: e.target.value,
    });
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="text" onChange={handleField} placeholder="Email" />
        <br />
        <input name="password" type="password" onChange={handleField} placeholder="Password" />
        <br />
        <button type="submit">Login</button>
        <div>status: {status}</div>
        <Link href="/auth/Register">
          <a>Register</a>
        </Link>
      </form>
    </div>
  );
}
