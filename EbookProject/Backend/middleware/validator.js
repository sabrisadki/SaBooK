const { body, validationResult } = require('express-validator');


exports.registerValidation=[
    body('email','please enter a valid email').isEmail(),
    body('password','please the pwd must contain 8 car').isLength({min:8})
]

exports.Logvalidation=[
    body('email','please put a valid email').isEmail()
]


exports.validation=(req,res,next)=>{
    const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
next()
}