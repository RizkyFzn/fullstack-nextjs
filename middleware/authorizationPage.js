import cookies from 'next-cookies';

export function unauthPage(context) {
  return new Promise((resolve) => {
    const allCookie = cookies(context);
    if (allCookie.token)
      return context.res
        .writeHead(302, {
          Location: '/posts',
        })
        .end();

    return resolve('unauthorized');
  });
}

export function authPage(context) {
  return new Promise((resolve) => {
    const allCookie = cookies(context);
    if (!allCookie.token)
      return context.res
        .writeHead(302, {
          Location: '/auth/Login',
        })
        .end();

    return resolve({ token: allCookie.token });
  });
}
