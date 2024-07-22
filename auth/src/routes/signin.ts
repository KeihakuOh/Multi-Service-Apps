import express from 'express'

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
  res.send('Change user endpoint');
});

export { router as signinRouter }