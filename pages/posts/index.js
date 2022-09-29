import React, { useState } from 'react';
import { authPage } from '../../middleware/authorizationPage';
import Router from 'next/router';
import Nav from '../../components/Nav';

export async function getServerSideProps(context) {
  const { token } = await authPage(context);
  const postReq = await fetch('http://localhost:3000/api/post', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  const posts = await postReq.json();

  return {
    props: {
      token,
      posts: posts.data,
    },
  };
}

export default function PostIndex(props) {
  const [posts, setPosts] = useState(props.posts);

  const handleDelete = async (id, e) => {
    if (e) e.preventDefault();

    const { token } = props;
    console.log(token, id);
    const ask = confirm('hapus data?');

    if (ask) {
      const deletePost = await fetch('/api/post/delete/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const res = await deletePost.json();
      const postsFiltered = posts.filter((post) => {
        return post.id !== id && post;
      });

      setPosts(postsFiltered);
    }
  };

  const handleEdit = (id) => {
    Router.push('/posts/edit/' + id);
  };
  return (
    <div>
      <h1>Posts</h1>
      <Nav />
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h3>{post.title}</h3>

            <p>{post.content}</p>
            <button onClick={() => handleEdit(post.id)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
