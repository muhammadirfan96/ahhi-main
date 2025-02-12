import express from "express";
import {
  showUser,
  findUsers,
  deleteUser,
  register,
  activationUser,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/UsersController.js";
import {
  showUserValidation,
  findUsersValidation,
  deleteUserValidation,
  registerValidation,
  activationUserValidation,
  loginValidation,
  refreshTokenValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  logoutValidation,
} from "../validations/UsersValidation.js";
import verifyToken from "../middlewares/verifyToken.js";
const UsersRouter = express.Router();

UsersRouter.get("/user/:id", verifyToken, showUserValidation, showUser); // ok
UsersRouter.get("/users", verifyToken, findUsersValidation, findUsers); // ok
UsersRouter.delete("/user/:id", verifyToken, deleteUserValidation, deleteUser); // ok
UsersRouter.post("/register", registerValidation, register); // ok
UsersRouter.patch(
  "/activation-user/:email",
  activationUserValidation,
  activationUser
); // ok
UsersRouter.post("/login", loginValidation, login); // ok
UsersRouter.get("/refresh-token", refreshTokenValidation, refreshToken); // ok
UsersRouter.post("/forgot-password", forgotPasswordValidation, forgotPassword); // ok
UsersRouter.patch(
  "/reset-password/:email",
  resetPasswordValidation,
  resetPassword
); // ok
UsersRouter.delete("/logout", logoutValidation, logout);

export default UsersRouter;
