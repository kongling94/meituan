const mongoose = require('../config');
console.log(mongoose);
const userSchema = new mongoose.Schema({
  id: Number,
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: String
  },
  email: {
    type: String,
    require: true
  }
});
export default mongoose.model('User', userSchema);
