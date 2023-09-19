const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');


exports.registerauth=async(req,res)=>{
try{
    const {name,email,phone,password,role} = req.body 

    const founduser = await User.findOne({email})
    if(founduser){return res.status(404).json({msg:'vous avez deja un compte voir le login'})}

    const newuser = await new User(req.body)
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    newuser.password = hash

    await newuser.save();

    res.status(200).json({msg:'you did a good job welcome to the platform',newuser})

}catch(err){
console.log(err)
res.status(400).jsonc({msg:'there is something wrong'})
}
};

exports.loginuser=async(req,res)=>{
    try{

    const {email,password} = req.body 
    const founduser = await User.findOne({email})
    if(!founduser){return res.status(404).json({msg:'pas de compte voir le register'})}

    const match = await bcrypt.compare(password, founduser.password)
    if(!match){return res.status(404).json({msg:'error partie mdp'})}

    // creation mt3 el token 

    const payload = { id : founduser._id}
    var token = jwt.sign(payload,secretKey )

    res.status(200).send({msg:'ur welcome',token , founduser})

    }catch(err){
    console.log(err)
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = { ...req.body };
        
        // Check if a new password is provided in the request
        if (userData.password) {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(userData.password, salt);
            userData.password = hash;
        }

        const updatedUser = await User.findByIdAndUpdate(id, { $set: userData }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'User updated successfully', updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

exports.patchUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = { ...req.body };
        
        if (userData.password) {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(userData.password, salt);
            userData.password = hash;
        }

        const patchedUser = await User.findByIdAndUpdate(id, { $set: userData }, { new: true });
        if (!patchedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'User patched successfully', patchedUser });
    } catch (err) {
        console.error('Error patching user:', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
};


exports.fetchUserData = async (req, res) => {
try {
    const token = req.header('Authorization');

    if (!token) {
    return res.status(401).json({ msg: 'Unauthorized: Token missing' });
    }

    const decoded = jwt.verify(token, secretKey);

    if (!decoded) {
    return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
    return res.status(404).json({ msg: 'User not found' });
    }

    return res.status(200).json(user);
} catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
}
};
exports.getallc=async(req,res)=>{
    try{
    const getall = await User.find()
    res.send(getall)
    }
    catch(err){   console.log(err)     }
    };

exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const delAcc = await User.findByIdAndDelete(id);
        res.status(200).json({ msg: 'you deleted that Account' });
    } catch (err) {
        console.log(err);
    }
    };


exports.uploadAvatar = async (req, res) => {
    try {
    const { id } = req.params;

    const avatarUrl = `/avatars/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(    id,    { avatarUrl },    { new: true }     );

    if (!updatedUser) {    return res.status(404).json({ error: 'User not found' }); }

    res.status(200).json({ message: 'Avatar uploaded successfully', user: updatedUser });
    } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({ error: 'Avatar upload failed' });
    }
};



exports.loginauth0user=async(req,res)=>{
    try{

    const {name,email} = req.body 

    // creation mt3 el token 
    const founduser = await User.findOne({email})

    const payload = { useremail : email}
    var token = jwt.sign(payload,secretKey )

    res.status(200).send({msg:'ur welcome',token})

    }catch(err){
    console.log(err)
    }
};

exports.registerauth0=async(req,res)=>{
    try{
        const {name,email} = req.body 
        
        const founduser = await User.findOne({email});
        if(founduser){return res.status(404).json({msg:'vous avez deja un compte voir le login'})}
    
        const newuser = await new User(req.body)
        newuser.save()
    
        res.status(200).json({msg:'you did a good job welcome to the platform',newuser})
    
    }catch(err){
    console.log(err)
    res.status(400).jsonc({msg:'there is something wrong'})
    }
    };
