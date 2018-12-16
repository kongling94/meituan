const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
  menu: {
    type: Array,
    require: true
  }
});
export default mongoose.model('Menu', menuSchema);
