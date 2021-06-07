const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth-controller');
const RoomController = require('../controllers/room-controller');
const registrationValidator = require('../validators/user-registration-validator')
const loginValidator = require('../validators/user-login-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const privateRoomValidator = require('../validators/room-private-validator');
const groupRoomValidator = require('../validators/room-group-validator');
const roomValidator = require('../validators/room-validator');
const roomAddMembersValidator = require('../validators/room-add-members-validator');

router.post('/registers',  registrationValidator, AuthController.register);
router.post('/sessions',  loginValidator, AuthController.login);

router.post('/rooms/private', authMiddleware, privateRoomValidator, RoomController.createPrivate);
router.post('/rooms/group', authMiddleware, groupRoomValidator, RoomController.createGroup);
router.put('/rooms/:id', authMiddleware, roomValidator, RoomController.update);
router.put('/rooms/:id/add-members', authMiddleware, roomAddMembersValidator, RoomController.addMembers);

module.exports = router;