import React, { useState } from 'react';
import { authPage } from '../../middleware/authorizationPage';
import Router from 'next/router';
import Nav from '../../components/Nav';

export async function getServerSideProps(context) {
  const { token } = await authPage(context);
  return {
    props: {
      token,
    },
  };
}

export default function CreatePost(props) {
  const [field, setField] = useState({
    title: '',
    content: '',
  });

  const [status, setStatus] = useState('normal');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const { token } = props;
    const create = await fetch('/api/post/create', {
      method: 'POST',
      body: JSON.stringify(field),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    if (!create.ok) return setStatus('error');
    const res = await create.json();

    setStatus('success');
    Router.push('/posts');
  };

  const handleChange = (e) => {
    const name = e.target.getAttribute('name');
    setField({
      ...field,
      [name]: e.target.value,
    });
  };
  return (
    <div>
      <h1>Create Post</h1>
      <Nav />
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder="Title..." name="title" />
        <br />
        <textarea type="text" onChange={handleChange} placeholder="Content..." name="content" />
        <br />
        <button type="submit">Create Post</button>
        <div>{status}</div>
      </form>
    </div>
  );
}
