const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const {username, email} = user;
  return jwt.sign({username, email},secret,{expiresIn})
}

exports.resolvers = {
  Query: {
    getAllKids: async (root, args,{Kid})=>{
      const allKids = await Kid.find().sort({registerDate:'desc'});
      return allKids;
    },

    getKid: async(root,{_id}, {Kid}) => {
      const kid = await Kid.findOne({_id})
      return kid;
    },

    getUserKids: async(root, {username},{Kid}) => {
      const userKids = await Kid.find({username}).sort({
        registerDate: 'desc'
      });
      return userKids;
    },

    getCurrentUser: async(root, args, {CurrentUser, User}) => {
      if (!CurrentUser){
        return null;
      }
      const user = await User.findOne({username: CurrentUser.username});
      return user;
    }
  },
  Mutation: {

    addKid: async(root,{firstName, lastName, age, registerDate, username},{Kid}) =>{
      const newKid = await new Kid({
        firstName,
        lastName,
        age,
        registerDate,
        username   
      });
      return newKid.save();
    },

    deleteUserKid: async(root,{_id},{Kid}) => {
      const kid = Kid.findOneAndRemove({ _id });
      return kid;
    },

    signinUser: async(root,{username, password},{User})=>{
      const userReady = await User.findOne({username});
      if (!userReady){
        throw new Error('User not found or invalid password');
      }
      const isValidPassword = bcrypt.compare(password, userReady.password);
      if (!isValidPassword){
        throw new Error('User not found or invalid password')
      }
      return {token: createToken(userReady, process.env.SECRET, "2hr")};
    },
    
    signupUser: async(root,{username, email, password},{User})=>{
      const userReady = await User.findOne({username});
      if (userReady){
        throw new Error('User already exists');
      }
      const newUser = await new User({
        username,
        email,
        password
      });
      newUser.save();
      return {token: createToken(newUser, process.env.SECRET, "2hr")};
    }
  }
};