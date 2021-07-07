const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    firstName: String,
    lastName: String,
    profileImg: String,    //pictures 'cloudinary'
    address: {
      street: String,
      zipCode: Number,
      city: String,
      country: String,
      location: {
        type: {
          type: String,
        },
        coordinates: [Number],
      }
    },
    password: String,
    email: String,
    phoneNumber: Number,
    role: {
      type: String,
      default: 'USER',
      enum: ['USER', 'ADMIN']
    }
  },
  {
    timestamps: true
  }
)

userSchema.index({ location: '2dsphere' })
const User = mongoose.model('User', userSchema)
module.exports = User