const express = require('express')
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  authenticateToken,
  updateUserOnboarding,
} = require('../controllers/UserController')

const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/users', createUser)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
router.post('/login', loginUser)

module.exports = router
