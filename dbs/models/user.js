const mongoose = require('../config');
console.log(mongoose);
let userSchema = new mongoose.Schema({
  id: Number,
  username: String
});
export default mongoose.model('User', userSchema);
