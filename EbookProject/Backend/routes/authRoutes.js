const express = require('express');
const authController = require('../controllers/authController'); 
const { registerValidation, Logvalidation, validation } = require('../middleware/validator');
const { isAuth } = require('../middleware/isAuth');
const multer = require('multer');

const authRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/sabri/Desktop/EbookProject/Frontend/public/avatars');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Route for user registration
authRouter.post('/register', registerValidation, validation, authController.registerauth);

// Route for user login
authRouter.post('/login', Logvalidation, validation, authController.loginuser);

// Route for fetching user account data
authRouter.get('/account', isAuth, authController.fetchUserData);

// Route for fetching all user accounts
authRouter.get('/allaccounts', authController.getallc);

// Route for deleting a user account
authRouter.delete('/deleteaccount/:id', authController.deleteAccount);

// Route for updating a user's data
authRouter.put('/updateuser/:id', authController.updateUser);

// Route for patching a user's data (partial update)
authRouter.patch('/patchuser/:id', authController.patchUser);

// Route for uploading a user's avatar
authRouter.post('/upload-avatar/:id', isAuth, upload.single('avatar'), authController.uploadAvatar);

// Route for user login by auth0
authRouter.post('/auth0login', authController.loginauth0user);

// Route for save user  auth0 registration
authRouter.post('/registerauth0', authController.registerauth0);


module.exports = authRouter;
