const express = require('express');
const router = express.Router();
const userMobel = require('./users');
const postModel =require('./post');
const passport = require('passport');
const upload = require('./multar');
const fs = require('fs-extra');

const LocalStoreg = require('passport-local');
const user = require('./users');
const post =require('./post');
passport.use(new LocalStoreg(userMobel.authenticate()));

//get router
router.get('/', (req, res) => {
  res.render('registar');
});

router.get('/login', (req, res) => {
  res.render('login', { false: Error });
});

router.get('/feed', isLoggedIn, async (req, res) => {
  const post = await postModel.find().populate('user');
  res.render('feed', { post });
});

router.get('/data/:id', isLoggedIn, async (req, res) => {
  const post = await postModel.findById(req.params.id).populate("user");
  res.render('data', { post });
});

router.get('/profile', isLoggedIn, async (req, res) => {
  const user = await userMobel.findOne({ username: req.session.passport.user }).populate('post');

  if(user.dp_img === undefined || user.dp_img === ''){
    user.dp_img = 'Screenshot 2024-06-26 093855.png'
  }
  await user.save();

  res.render('profile', {user});
});

router.get('/upload/:choose', isLoggedIn, (req, res) => {
  if(req.params.choose === 'dp') return res.render('Dp_img');
  res.render('upload');
});

router.get('/delete/:id', async (req, res) => {
  let post = await postModel.findByIdAndDelete( req.params.id );
  await fs.remove(`public/images/${post.post_img}`);
   res.redirect('/profile');
});

router.get('/logout', (req, res) => {
  if(!req.logOut) next(err);
  res.redirect('/login');
});

//post router
router.post('/registar', (req, res) => {
  const { username, email } = req.body;
  const userData = new userMobel({ username, email });

  userMobel.register(userData,  req.body.password)
  .then(function(){
    passport.authenticate('local')(req, res, function(){
      res.redirect('/profile');
    })
  })
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",   
  failureRedirect: "/login",  
  failureFlash: true
}), (req, res) => {});

router.post('/comment/:id', async (req, res) => {
  const post = await postModel.findById(req.params.id);

  post.comment.push(req.body.comment);
  await post.save();

  res.redirect(`/data/${req.params.id}`);
}); 

router.post('/upload/post', isLoggedIn, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(404).send('not files were given');
  }
  const user = await userMobel.findOne({ username: req.session.passport.user });
  let post = await postModel.create({
    post_img: req.file.filename,
    post_title: req.body.title,
    post_data: req.body.data,
    user: user._id
  });

  user.post.push(post._id);
  await user.save();

  res.redirect('/feed');
});

router.post('/upload/:dp', isLoggedIn, upload.single('file'), async (req, res) => {
  const user = await userMobel.findOne({ username: req.session.passport.user });

  if(user.dp_img !== 'Screenshot 2024-06-26 093855.png'){
    await fs.remove(`public/images/${user.dp_img}`)
  } 

  if(req.params.dp === 'null'){
    user.dp_img = '';
  }else{
    user.dp_img = req.file.filename
  }
  await user.save();

  res.redirect('/profile');
});

//midel wear
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}


module.exports = router;


