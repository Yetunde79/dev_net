const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport= require("passport");
const validateProfileInput = require("../../validation/profile")

const Profile = require("../../models/Profile");
const User = require("../../models/User");


router.get("/test", (res, req) => res.json({ msg: "Profile Works" }));

router.get('/', passport.authenticate('jwt', {session: false}), (res,res)=>{
    const errors = {};
    Profile.findOne({ user: req.user.id })//user is from the schema, it matches by the id
    .populate('user', 'avatar') //populates with avatar from user model
    .then(profile =>{
        if(!profile){
            errors.noprofile="There is no profile for this user";
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

router.get('/handle/:handle', (res,res)=>{
    const errors = {};
    Profile.findOne({ handle: req.params.handle }) //handle is from the route
    .populate('user', ['name','avatar']) //populates with name abd avatar from user model
    .then(profile =>{
        if(!profile){
            errors.noprofile="There is no profile for this user";
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

router.get('/user/:user_id', (res,res)=>{
    const errors = {};
    Profile.findOne({ id: req.params.user_id }) 
    .populate('user', ['name','avatar']) //populates with name abd avatar from user model
    .then(profile =>{
        if(!profile){
            errors.noprofile="There is no profile for this user";
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json({profile: "There is no profile for this user"}));
})

router.get('all', (res,res)=>{
    const errors = {};
    Profile.find() 
    .populate('user', ['name','avatar']) //populates with name abd avatar from user model
    .then(profiles =>{
        if(!profiles){
            errors.noprofile="There are no profiles";
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json({profile: "There are no profiles"}));
})


router.post('/', passport.authenticate('jwt', {session: false}), (res,res)=>{

    const {errors, isValid } = validateProfileInput(req.body);

    //check validation
    if(!isValid){
        //return any errors with 400 status
        res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.body.id;

    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //Skills
    if(typeof req.body.skills !=="") profileFields.skills = req.body.skills.split(",");

    //Social
    profileFields.social ={};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
    .then(profile=>{
        if(profile){
            //Update profile
            Profile.findOneAndUpdate(
            { user: req.user.id },
            {$set: profileFields},
            {new: true})
        }
        else{
            Profile.findOne({handle: profileFields.handle})
            .then(profile=>{
                if(profile){
                    errors.handle="That handle already exists";
                    res.status(400).json(errors);
                }
            })
            new Profile(profileFields).save().then(profile=> res.json(profile));
        }

    })
})

router.post('/experience', passport.authenticate('jwt', {session: false}), (res,res)=>{

    const {errors, isValid } = validateProfileInput(req.body);
    Profile.findOne({user: req.user.id})
    .then(profile=>{
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current
        }

        profile.experience.unshift(newExp);

        profile.save().then(profile=> res.json(profile));
    })

    //check validation
    if(!isValid){
        //return any errors with 400 status
        res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.body.id;

    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //Skills
    if(typeof req.body.skills !=="") profileFields.skills = req.body.skills.split(",");

    //Social
    profileFields.social ={};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
    .then(profile=>{
        if(profile){
            //Update profile
            Profile.findOneAndUpdate(
            { user: req.user.id },
            {$set: profileFields},
            {new: true})
        }
        else{
            Profile.findOne({handle: profileFields.handle})
            .then(profile=>{
                if(profile){
                    errors.handle="That handle already exists";
                    res.status(400).json(errors);
                }
            })
            new Profile(profileFields).save().then(profile=> res.json(profile));
        }

    })
})



module.exports = router;
