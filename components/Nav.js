import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Nav() {
  const router = useRouter();
  const logoutHandler = (e) => {
    e.preventDefault();

    Cookies.remove('token');
    router.replace('/auth/Login');
  };
  return (
    <>
      <Link href="/posts">Post</Link>
      &nbsp; | &nbsp;
      <Link href="/posts/Create">Create Post</Link>
      &nbsp; | &nbsp;
      <a href="#" onClick={logoutHandler}>
        Logout
      </a>
    </>
  );
}

export default Nav;
