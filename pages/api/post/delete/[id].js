import db from '../../../../libs/db';
import authorization from '../../../../middleware/authorization';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end();

  const auth = await authorization(req, res);

  const { id } = req.query;

  const deletePost = await db('posts').where({ id }).del();

  res.status(200);
  res.json({
    message: 'Post dihapus',
  });
}
