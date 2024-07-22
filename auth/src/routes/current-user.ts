import express from 'express'

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('Cu user endpoint');
});

export { router as currentUserRouter }