import express from 'express'
import { user_login, user_register, user_update_profile } from '../Controller/UserController.js';
import isAuthenticated from '../Middleware/isAuthenticate.js';


const router = express.Router();


router.route("/register").post(user_register);
router.route("/login").post(user_login);
router.route("/profile/update").post(isAuthenticated, user_update_profile);

export default router;