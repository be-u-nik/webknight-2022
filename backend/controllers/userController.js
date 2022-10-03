const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../models/userModel');

const removeUser = asyncHandler(async (email) => {
  await User.deleteOne({ email: email });
});

// registering/creating user
// @path  - PUBLIC - POST - /api/users/register
// @param -name -> Name of user
// @param -email -> Email of user
// @param -password -> Password of user
// @param -passwordCheck -> Same password 2nd time
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    res.status(400);
    throw new Error('Fill all fields');
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error('Passwords not same');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hash,
  });

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
  });

  const emailToken = generateToken(user._id);
  const url = `${process.env.FRONTEND_URL}/confirmation/${emailToken}`;

  let mailOptions = {
    from: '"refer-and-earn 💸💸💸"', // sender address
    to: email, // list of receivers
    subject: 'Account confirmation for refer and earn app', // Subject line
    html: `Please click the link to confirm your email: <a href="${url}">${url}</a>`, // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      res.status(500);
      throw new Error('Error in sending email');
    }
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: emailToken,
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

// email validation
// @path  - PUBLIC - GET - /api/users/confirmation/:token
// @param -token -> Email token of user
const checkEmail = asyncHandler(async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET_KEY);
    const user = await User.findByIdAndUpdate(decoded.id, { conform: true });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: req.params.token,
    });
  } catch (err) {
    res.status(401);
    throw new Error('Email token is tampered or expired');
  }
});

// logging in user
// @path  - PUBLIC - POST - /api/users/login
// @param -email -> Email of user
// @param -password -> Password of user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Fill both fields');
  }

  const user = await User.findOne({ email });

  if (user && !user.conform) {
    res.status(401);
    throw new Error('Please verify your email');
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL, // generated ethereal user
        pass: process.env.GMAIL_PASSWORD, // generated ethereal password
      },
    });

    const emailOtp = (Math.floor(Math.random() * 1000000) + 1000000)
      .toString()
      .substring(1);
    const val = user._id.toString() + emailOtp; // contains [uid][otp]
    const token = generateTokenOtp(val);

    let mailOptions = {
      from: '"refer-and-earn 💸💸💸"', // sender address
      to: email, // list of receivers
      subject: 'OTP for refer and earn app', // Subject line
      html: `Your OTP for login: <strong>${emailOtp}</strong>`, // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        res.status(500);
        throw new Error('Error in sending email');
      }
    });
    res.status(200).json({
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// getting all users
// @path  - PUBLIC - GET - /api/users/
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select(
    '-password -createdAt -updatedAt -__v'
  );
  res.status(200).json({
    users,
  });
});

// get current user
// @path  - PRIVATE - GET - /api/users/me
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
});

// get current user
// @path  - PRIVATE - GET - /api/users/:id
const getUser = asyncHandler(async (req, res) => {
  const userExists = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const user = {
    id: userExists._id,
    email: userExists.email,
    name: userExists.name,
  };
  res.status(200).json(user);
});

//
const updateUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  let updatedUser;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (name) {
      updatedUser = await User.findByIdAndUpdate(req.user._id, {
        password: hashedPassword,
        name,
      }).select('-password');
    } else {
      updatedUser = await User.findByIdAndUpdate(req.user._id, {
        password: hashedPassword,
      }).select('-password');
    }
  } else {
    updatedUser = await User.findByIdAndUpdate(req.user._id, { name }).select(
      '-password'
    );
  }
  res.status(200).json(updatedUser);
});

// check otp
// @path  - PUBLIC  - POST - /api/user/otp/:token
// @param  - deviceType -> DeviceType of user
// @param  - otp -> otp typed by user
// @param  - referalFrom -> Reference of user
const confirmOtp = asyncHandler(async (req, res) => {
  const { deviceType, otp, referalFrom } = req.body;
  const decoded = jwt.verify(req.params.token, process.env.OTP_SECRET_KEY);
  const val = decoded.id;
  let user;
  if (otp == val.slice(-6) && (user = await User.findById(val.slice(0, -6)))) {
    if (!user.devices.includes(deviceType)) {
      user = await User.findByIdAndUpdate(user._id, {
        $push: { devices: deviceType, rewards: { fromId: referalFrom } },
      });
      await User.findByIdAndUpdate(referalFrom, {
        $push: { rewards: { fromId: user._id } },
      });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('OTP Invalid');
  }
});

// creating jwt token
// @param id -> userID
// @return -> jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};

// creating jwt token
// @param id -> userID
// @return -> jwt token
const generateTokenOtp = (id) => {
  return jwt.sign({ id }, process.env.OTP_SECRET_KEY, { expiresIn: '1m' });
};

module.exports = {
  removeUser,
  registerUser,
  checkEmail,
  loginUser,
  getUsers,
  getMe,
  getUser,
  confirmOtp,
  updateUser,
};
