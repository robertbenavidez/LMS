import express from 'express';

const router = express.Router()

router.get('/register', (req, res) => {
    // test response
    res.send('Register user')
})

module.exports = router;