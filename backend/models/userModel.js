const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: 'string',
      required: [true, 'Name cannot be empty'],
    },
    email: {
      type: 'string',
      required: [true, 'Email cannot be empty'],
      unique: true,
    },
    password: {
      type: 'string',
      required: [true, 'Password cannot be empty'],
    },
    conform: {
      type: 'boolean',
      default: false,
    },
    devices: {
      type: 'array',
    },
    rewards: [
      {
        fromId: mongoose.Schema.Types.ObjectId,
        time: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
