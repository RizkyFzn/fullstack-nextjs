import React, { useState } from 'react';
import Router from 'next/router';
import { authPage } from '../../../middleware/authorizationPage';
import Nav from '../../../components/Nav';

export async function getServerSideProps(context) {
  const { token } = await authPage(context);

  const { id } = context.query;

  const postReq = await fetch('http://localhost:3000/api/post/detail/' + id, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  const res = await postReq.json();

  return {
    props: {
      token,
      post: res.data,
    },
  };
}

export default function EditPost(props) {
  const { post } = props;
  const [field, setField] = useState({
    title: post.title,
    content: post.content,
  });

  const [status, setStatus] = useState('normal');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const { token } = props;
    const update = await fetch('/api/post/update/' + post.id, {
      method: 'PUT',
      body: JSON.stringify(field),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    if (!update.ok) return setStatus('error');
    const res = await update.json();

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
      <h1>Edit Post</h1>
      <Nav />
      <p>Post ID : {post.id}</p>
      <form onSubmit={handleUpdate}>
        <input type="text" onChange={handleChange} defaultValue={post.title} placeholder="Title..." name="title" />
        <br />
        <textarea type="text" onChange={handleChange} defaultValue={post.content} placeholder="Content..." name="content" />
        <br />
        <button type="submit">Save Changes</button>
        <div>{status}</div>
      </form>
    </div>
  );
}
