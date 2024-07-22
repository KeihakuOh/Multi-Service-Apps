import express from 'express'

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  res.send('Current user endpoint');
});

export { router as signoutRouter }