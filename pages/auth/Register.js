import React, { useState } from 'react';
import { unauthPage } from '../../middleware/authorizationPage';
import Link from 'next/link';

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

function Register() {
  const [field, setField] = useState({
    email: '',
    password: '',
  });
  const [status, setStatus] = useState('normal');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const registerReq = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(field),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!registerReq.ok) return setStatus('error' + registerReq.status);

    const registerRes = await registerReq.json();
    setStatus('success');
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
      <h1>register</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="text" onChange={handleField} placeholder="Email" />
        <br />
        <input name="password" type="password" onChange={handleField} placeholder="Password" />
        <br />
        <button type="submit">Register</button>
        <div>status: {status}</div>
        <Link href="/auth/Login">
          <a>Login</a>
        </Link>
      </form>
    </div>
  );
}

export default Register;
